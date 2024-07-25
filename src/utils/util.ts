/* eslint-disable max-lines-per-function */
import randomize from 'randomatic';
import S3Internal from '@/http/s3.http';
import config from '@/config';
import { Parser } from 'json2csv';
import { HandledError } from '@/exceptions/HandledError';
import crypto from 'crypto';
import multer from 'multer';
import csv2json from 'csvtojson';
import mongoose from 'mongoose';
import nodeFetch from 'node-fetch';
import formidable from 'formidable';
import _ from 'lodash';
const request = require('request').defaults({ encoding: null });
const s3Internal = new S3Internal();
import { ISellerCollection } from '@/interfaces/sellerCollection.interface';
import { NextFunction, Request, Response } from 'express';
import { isNil } from 'ramda';
import { IReqUser, IUser } from '@/typings/common';
import sarthi from './sarthi.util';
import { ROLES, catalogueUploadTypeEnum } from '@/constants/enums';
import { BULK_UPLOAD_TIME } from '@/constants/catalogue.constants';
export const { QueueService } = sarthi.common.services.queue;
// const pawan = require('pawan');
import pawan from './pawan.util';
import { IBulkCatalogueHeaderConfig, IBulkCsvData } from '@/typings/catalogue';
const port = config.redis.port,
  serviceName = config.service_name,
  globalServiceName = config.redis_prefix_service_name,
  password = config.redis.password,
  host = config.redis.host;
export const { getKey, setKey, isCached, generateKey, removeKey, setKeyTTL, cacheFn, removeKeysByPattern } = pawan(
  host,
  port,
  serviceName,
  password,
  {},
);
export const {
  getKey: getKeyGlobal,
  setKey: setKeyGlobal,
  cacheFn: cacheFnGlobal,
  removeKey: removeKeyGlobal,
} = pawan(host, port, globalServiceName, password, {});

export const getEvent = (type: string, data: unknown) => ({ type, data });
const { assertNonEmpty, toFloat } = sarthi.common.helpers.utils;

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

/**
 * Check the validity of a file for required file types
 *@method isValidFileType
 * @param {string} filename
 * @param {Array} extensions extensions of files to check
 * @returns {boolean} true or false based on the extensions match
 */
export const isValidFileType = (filename: string, extensions: string[]) => {
  const ext: string = filename.split('.').pop().toLowerCase();
  let isValid: boolean;
  extensions.length && extensions.includes(ext) ? (isValid = true) : (isValid = false);
  return isValid;
};

/**
 * Validates file type for media files
 * @param {*} files
 */
export const validateMediaFileType = (images: any, videos: any) => {
  if (images) {
    images.forEach(file => {
      if (!isValidFileType(file.originalname, ['jpg', 'jpeg', 'png', 'mp4'])) {
        throw new HandledError('Invalid Image File.');
      }
    });
  }
  if (videos) {
    videos.forEach(file => {
      if (!isValidFileType(file.originalname, ['mp4'])) {
        throw new HandledError('Invalid Video File.');
      }
    });
  }
};
/**
 * parse csv files
 * @param getJSON - returns csv data as json in req.__csvData
 * @param useMulter - if true, multer is used and an array of middlewares is returned
 */
export const parseCSV = (getJSON = false, useMulter = false) => {
  if (useMulter) {
    return [
      multer({ dest: '/tmp/' }).single('csv'),
      async (req: Request, res: Response, next: NextFunction) => {
        req.__csvData = await csv2json().fromFile(req.file?.path);
        next();
      },
    ];
  }

  return async (req: Request, res: Response, next: NextFunction) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err || Object.keys(files).length == 0) {
        return res.status(400).json({
          code: 400,
          result: 'Bad Request / No file to upload',
        });
      }
      req.files = files;
      if (getJSON) {
        req.__csvData = await csv2json().fromFile(req.files.csv.path);
      }
      next();
    });
  };
};

/**
 * returns if given url points to a valid media url
 * @param url
 * @returns {Promise<boolean>}
 */
export const mediaUrlExists = cacheFn(
  async url => {
    const data = await nodeFetch(url, { method: 'HEAD' }).catch(e => null);
    if (!data) {
      return false;
    }

    const contentType = data.headers.get('content-type');
    const contentLength = data.headers.get('content-length');

    return contentType && !!contentType.match(/image|video|octet-stream/) && contentLength > 0;
  },
  url => `MEDIA_URL:${url}`,
);

/**
 * validates csv
 * @param csvData
 * @param headerWiseConf [{
 *  header, => header
 *  required, => (optional) true/false, defaults to true
 *  allowedValues, => (optional) array of allowed values/enums
 *  allowedFormat, => (optional) regex pattern to match value
 *  toLowerCase, => lower case before comparing [true/false]
 *  allowedRange, => (optional) allowed range of numeric values. Pass an array with 2 elems e.g. ([0, 100])
 *  validateMediaUrl, => (optional) validate if the val is a valid media url. Check if the url actually exists
 *  length, => (optional) expected exact length of field
 *  minLength, => (optional) expected min length of field
 *  maxLength, => (optional)  expected max length of field
 * }]
 */
export const validateCSV = async ({
  csvData,
  headerWiseConf,
  allReturnConditions,
  forBulkUpload = false,
}: {
  csvData: IBulkCsvData[];
  headerWiseConf: IBulkCatalogueHeaderConfig[];
  allReturnConditions?: string[];
  forBulkUpload?: boolean;
}) => {
  let isValidationError = false;
  assertNonEmpty({ csvData, headerWiseConf });

  const errorEnrichedCsvData = [];
  // Check for empty csv
  if (!csvData?.length) {
    throw new HandledError('Found Empty Csv.');
  }
  const exists = (val: number) => !!val || val === 0; // letting 0 to be a valid value
  let rowIndex = 0;

  const pushError = (message = '', errorDetails: string[] = []) => {
    if (forBulkUpload) {
      errorDetails.push(message);
      isValidationError = true;
    } else {
      throw new HandledError(`CSV validation failed: ${message} (at row:${rowIndex + 2})`);
    }
  };

  for (const row of csvData) {
    const errorDetails: string[] = [];
    //to check if same Image 1 link is present for another product code
    const imageOneExcludingCurrentRow = csvData.filter(rec => rec['Product Code'] !== row['Product Code']).map(rec => rec['Image 1']);
    for (const headerConf of headerWiseConf) {
      // add more options as and when needed

      const {
        header,
        required = true,
        allowedValues = null,
        allowedFormat = null,
        allowedRange = null,
        validateMediaUrl = null,
        length = null, // length on the value
        minLength = null,
        maxLength = null,
        toLowerCase = false,
        validator = null,
      } = headerConf;
      assertNonEmpty({ header });

      const val = row[header];
      const rowIdentifier = `${header}::${val}`;

      if (header === 'Return/Exchange Condition') {
        if (val && !allReturnConditions.includes(val)) {
          pushError(`${rowIdentifier} is a invalid value`, errorDetails);
        }
      }
      if (header === 'Image 1') {
        //if image 1 is already present in csv then throw error
        if (imageOneExcludingCurrentRow.includes(val) && val && val.trim()) {
          pushError(`${rowIdentifier} is a duplicate value for Image 1`, errorDetails);
        }
      }
      // falsy val is present and that falsy value is also absent in allowedValues
      const valIsAbsent = !val && !allowedValues?.includes(val);
      if (required) {
        // required but absent, throw error
        if (valIsAbsent) {
          pushError(`${rowIdentifier} is required`, errorDetails);
          continue;
        }
      } else {
        // not required and absent, skip other checks
        if (valIsAbsent) {
          continue;
        }
      }
      // checking allowed values
      if (allowedValues && !allowedValues.includes(toLowerCase ? (val || '').toLowerCase() : val)) {
        if (allowedValues.join().length > 50) {
          pushError(`${rowIdentifier} is a invalid value`, errorDetails);
        } else {
          pushError(`${rowIdentifier} must be one of ${allowedValues.join(',')}`, errorDetails);
        }
      }

      // check if value matches regex format
      if (allowedFormat && !allowedFormat.test(val)) {
        pushError(`${rowIdentifier} is a invalid value`, errorDetails);
      }

      // checking allowed numeric range
      if (allowedRange) {
        const numVal = toFloat(val);
        const [minVal, maxVal] = allowedRange;

        if (exists(minVal) && minVal > numVal) {
          pushError(`${rowIdentifier} must greater than ${minVal}`, errorDetails);
        }

        if (exists(maxVal) && maxVal < numVal) {
          pushError(`${rowIdentifier} must less than ${maxVal}`, errorDetails);
        }
      }
      // checking if val is a valid media url
      if (validateMediaUrl && !(await mediaUrlExists(val))) {
        pushError(`${rowIdentifier} is not a valid media url`, errorDetails);
      }

      // checking exact length of the field
      if (exists(length) && val.length !== length) {
        pushError(`length of ${rowIdentifier} should be ${length}`, errorDetails);
      }

      // checking min length of the field
      if (exists(minLength) && val.length < minLength) {
        pushError(`length of ${rowIdentifier} should be greater than ${minLength}`, errorDetails);
      }

      // checking max length of the field
      if (exists(maxLength) && val.length > maxLength) {
        pushError(`length of ${rowIdentifier} should be less than ${maxLength}`, errorDetails);
      }

      //validator method call if any
      if (validator) {
        const inValidMessage = await validator({ val, sku: row });
        if (inValidMessage) {
          pushError(`${inValidMessage} of ${rowIdentifier}`, errorDetails);
        }
      }
    }
    errorEnrichedCsvData.push({ ...row, row_number: rowIndex, errors: errorDetails });
    rowIndex++;
  }
  return { errorEnrichedCsvData, isValidationError };
};

export const validCatalogueLength = (len: number) => {
  return len > 1 && len < 51;
};

//SellerCustomTypeid
export const mongoId = (id: string) => {
  return new mongoose.Types.ObjectId(id);
};

// group urls on basis of dropbox, gdrive.
export const groupUrls = urls => {
  return urls.map(url => {
    if (url.includes('www.dropbox.com')) {
      return url.lastIndexOf('?') > -1 ? `${url.trim().slice(0, url.lastIndexOf('?'))}?dl=1` : `${url.trim()}?dl=1`;
    } else if (url.includes('drive.google.com/open?id=')) {
      return `https://drive.google.com/uc?id=${url.trim().split('?id=').pop()}&export=download`;
    } else if (url.includes('drive.google.com/file/')) {
      const id = url.trim().split('/d/').pop().split('/').splice(0, 1);
      return `https://drive.google.com/uc?export=download&id=${id}`;
    } else {
      return url.trim();
    }
  });
};

/*
 * Return file against url
 * @param {string} url valid url
 */
export const getFile = url => {
  return new Promise(resolve => {
    request.get(url, function (err, res, body) {
      if (err || res.statusCode !== 200) {
        return resolve(null);
      }
      return resolve(body);
    });
  });
};

export const getMediaType = url => {
  const completeExtension = url.split('.').pop();
  const ext = completeExtension.split('?');
  if (ext.length > 1) {
    ext.pop();
  }
  return ext[0] === 'mp4' ? 'video' : 'image';
};

export const generateCSV = data => {
  const parser = new Parser();
  return parser.parse(data);
};

export const generateFilename = (originalFilename, id, type = 'image') => {
  const epochtime = String(new Date().getTime());
  const ext = originalFilename.split('.').pop();
  switch (type) {
    case 'image': {
      const filename = randomize('a0', 15);
      return `${id}_${epochtime}_${filename}.${ext}`;
    }
    case 'video': {
      const filename = randomize('a0', 15);
      return `${id}_${epochtime}_${filename}.${ext}`;
    }
    case 'csv': {
      const indexOfExtension = originalFilename.lastIndexOf('.');
      const filename = originalFilename.slice(0, indexOfExtension);
      return `${id}_${epochtime}_${filename}.${ext}`;
    }
  }
  return `${id}_${epochtime}_${originalFilename}`;
};

/**
 * Upload Stream to s3
 * @param {stream} data
 * @param {string} bucketName
 * @param {string} fileName
 */
export const uploadStreamtoS3 = (data, bucketName, fileName) => {
  return s3Internal.uploadFile({
    filename: `${fileName}`,
    buffer: data,
    bucket: bucketName,
  });
};

/**
 * returns a hash to use as key in cache in case actual string is long
 * @param str
 */
export const getHashForCache = str => crypto.createHash('sha256').update(str).digest('hex');

const defaultSortKeyAccessor = entry => String(entry._id);
export const sortListByOrdering = (list, ordering, getKey = defaultSortKeyAccessor) => {
  return _.sortBy(list, (item: any) => ordering.indexOf(getKey(item)));
};

/**
 * Checking is Null or undefined
 * @param val
 * @returns
 */
export const isNullOrUndefined = (val: string | ISellerCollection | IReqUser) => val === null || val === undefined || val === '';

/** Given an array of characters charsToReplace and a character to replace with charToReplaceWith
 * Replace all occurrences of charsToReplace with charToReplaceWith
 * @param {[String]} charsToReplace
 * @param {String} charToReplaceWith
 * @param {String} str
 * @returns
 */
export const replaceCharacters = (charsToReplace: string[], charToReplaceWith: string, str: any) => {
  const charToReplace = charsToReplace || [];
  return charToReplace.reduce((acc: any, char: any) => {
    let replaced = acc;
    while (replaced.indexOf(char) > -1) {
      replaced = replaced.replace(char, charToReplaceWith);
    }
    return replaced;
  }, str || '');
};

/**
 * Generate an url safe string by replacing the special symbols with underscores/characterToReplaceWith
 * @param {*} str
 * @returns
 */
export const generateURLSafeString = (str: string, charToReplaceWith = '_'): string => {
  // const updatedStr = replaceCharacters(
  //   ['+', '/', '\\', '&', '?', '#', '>', '<', '%', ')', '(', ',', '[', ']', '{', '}', ' '],
  //   charToReplaceWith,
  //   str,
  // );
  // return replaceCharacters(["'"], '', updatedStr);
  const pattern = /[^a-zA-Z0-9]/gi;
  return str.replace(pattern, charToReplaceWith);
};

/**
 * Unicommerce expects errors in the following format:
 * {
  "errors": [
    {
      "code": "string",
      "message": "string",
      "params": {}
    }
  ]
}
 */
export const asyncUnicommerceErrorHandler = (fn: Function) => {
  return (req: any, res: any, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(error => {
      return res.status(400).json({
        errors: [
          {
            code: 400,
            message: error.message,
          },
        ],
      });
    });
  };
};

export const isValidQueryParam = (value: any) => {
  if (isNil(value) || value == 'undefined') {
    return false;
  }
  return true;
};

/**
 * Create a mapping of special characters in the message string and replace it with mapped value
 * @param {String} message
 * @param {Object} payload
 */
export const replaceSpecialCharacters = (message, payload: any = {}) => {
  const website = payload.website;

  const specialChars = [
    {
      character: new RegExp(`<website_name>`, 'g'),
      replaceWith: website,
    },
  ];

  specialChars.forEach(specialChar => {
    message = message.replace(specialChar.character, specialChar.replaceWith);
  });
  return message;
};

export const getNeedSellerIdInCSVFlag = (user: IReqUser) => {
  const { role, _id } = user;
  let needSellerIdInCSV = true,
    sellerId: string | null = null;
  // letting seller only seeing their own catalogues
  if (role?.includes(ROLES.SELLER)) {
    needSellerIdInCSV = false;
    sellerId = _id;
  }

  return { sellerId, needSellerIdInCSV };
};

/**
 * Get wait time based on row count and type of upload
 * @param rowCount
 * @param type
 * @returns
 */
export const getWaitTimeForCatalogueBulkUpload = (rowCount: number, type: string) => {
  if (type === catalogueUploadTypeEnum.CREATE) {
    if (rowCount <= 500) {
      return BULK_UPLOAD_TIME.NO_WAIT;
    } else if (rowCount > 500 && rowCount <= 2000) {
      return BULK_UPLOAD_TIME.MEDIUM_WAIT;
    } else {
      return BULK_UPLOAD_TIME.LONG_WAIT;
    }
  } else {
    return BULK_UPLOAD_TIME.MEDIUM_WAIT;
  }
};
export const getWhatsappUrl = text => `https://wa.me/+91${config.whatsAppBusinessNumber}?text=${encodeURIComponent(text)}`;
/**
 * returns referrals inbound for share and earn.
 * please sync with vartalap
 * @param cpsi
 * @param cssi
 * @param contactNumber
 * @param productName
 * @return {string}
 */
export const getShareAndEarnInbound = ({ cpsi, cssi, contactNumberOrReferralCode, productName, campaignId = '' }) =>
  `Mujhe meri friend (${contactNumberOrReferralCode}) ne wmall factory deals ke baare mai bataya. Mujhe ${productName} ${campaignId} (${cpsi}/${cssi}) khareedna hai`;

/**
 * returns file name from media url to cache in android storage
 * @param {string} mediaUrl
 */
export const getFileNameForMediaUrl = (mediaUrl: string) =>
  mediaUrl
    .split('/')
    .filter(str => str && !str.match('http'))
    .join('-');
