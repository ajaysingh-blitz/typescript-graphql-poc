//Internal APIs
const { CUSTOM_ERROR_CODES } = require('sarthi').common.helpers.constants;
const { zipkinFetch: fetch } = require('sarthi').common.helpers.utils;

//Config
import config from '@/config';

//Constants
import { ROLES } from '@/utils/costants';
import { NextFunction, Request, Response } from 'express';


export default class Authorization {
  private userService = config.services.aadhar;

  public checkRoles = (apiRoles: string[], allowSuperAdminOnly = false) => {
    return async (req: any, res: any, next: NextFunction): Promise<any> => {
      const userRoles: string[] = req.user.role || [];
      // If user has admin or super-admin role, pass the user through.
      if ((!allowSuperAdminOnly && userRoles.indexOf(ROLES.ADMIN) > -1) || userRoles.indexOf(ROLES.SUPER_ADMIN) > -1) {
        return next();
      }

      // If user has any one of the required API roles, pass the request through.
      if (userRoles.some(role => apiRoles.indexOf(role) > -1)) {
        return next();
      }

      return res.sendformat({ message: 'Permission denied.' }, 403);
    };
  };

  public unicommerceAuthorized = async (req: any, res: any, next: NextFunction) => {
    const apikey: string = req.headers.apikey;
    return fetch(`${this.userService}/auth/unicommerce-seller`, {
      method: 'GET',
      headers: { apikey },
    })
      .then(({ seller }) => {
        req.seller = seller;
        next();
      })
      .catch(() => res.status(401).json({ reason: 'authToken expired/Invalid authToken', description: 'authToken expired/Invalid authToken' }));
  };

  /**
   * get authentication user for all [dashboard, android, web] customers
   */
  public webAuthorized = async (req: any, res: any, next: NextFunction) => {
    return fetch(`${this.userService}/auth/platform-user`, {
      method: 'GET',
      headers: {
        cookie: req.headers.cookie,
        authorization: req.headers.token || '',
        wm_platform: req.headers.wm_platform,
        wm_lang: req.headers.wm_lang,
        wm_web_version: req.headers.wm_web_version,
        wm_viewas: req.headers.wm_viewas || '',
      },
    })
      .then(({ user, admin, actor }) => {
        req.user = user;
        req.admin = admin;
        req.actor = actor;
        next();
      })
      .catch(err => {
        req.session = null;
        const errorMessage = CUSTOM_ERROR_CODES[err.status];
        if (errorMessage) {
          return res.status(err.status).json({ message: errorMessage });
        }
        return res.status(401).json({ message: 'invalid user' });
      });
  };

  public setUserInReq = async (req: any, res: any, next: NextFunction): Promise<any> => {
    return fetch(`${this.userService}/auth/platform-user`, {
      method: 'GET',
      headers: {
        cookie: req.headers.cookie,
        authorization: req.headers.token || '',
        wm_platform: req.headers.wm_platform,
        wm_lang: req.headers.wm_lang,
        wm_web_version: req.headers.wm_web_version,
      },
    })
      .then(({ user }) => {
        req.user = user;
        next();
      })
      .catch(() => {
        next();
      });
  };

  // Allow API access to only specified roles
  public allowOnlyRoles = (apiRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const userRoles = req.user?.role || [];

      // If user has any one of the required API roles, pass the request through.
      if (userRoles.some(role => apiRoles.indexOf(role) > -1)) {
        return next();
      }

      return res.sendformat({ message: `Permission denied. Please make sure you have any of the mentioned roles: ${apiRoles}` }, 403);
    };
  };
}
