/* eslint-disable max-lines-per-function */
import randomize from 'randomatic';
import config from '@/config';
import { HandledError } from '@/exceptions/HandledError';
import crypto from 'crypto';
import mongoose from 'mongoose';
import nodeFetch from 'node-fetch';
const request = require('request').defaults({ encoding: null });
import { NextFunction, Request, Response } from 'express';
import { isNil } from 'ramda';
import { IReqUser, IUser } from '@/typings/common';
import sarthi from './sarthi.util';
import { ROLES, catalogueUploadTypeEnum } from '@/constants/enums';
// const pawan = require('pawan');
import pawan from './pawan.util';
import { IBulkCatalogueHeaderConfig, IBulkCsvData } from '@/typings/catalogue';

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


//SellerCustomTypeid
export const mongoId = (id: string) => {
  return new mongoose.Types.ObjectId(id);
};


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
 * returns file name from media url to cache in android storage
 * @param {string} mediaUrl
 */
export const getFileNameForMediaUrl = (mediaUrl: string) =>
  mediaUrl
    .split('/')
    .filter(str => str && !str.match('http'))
    .join('-');
