//Modules
import { Router } from 'express';

import {Routes} from '@interfaces/route.interface'

import ValidatorMiddleware from '@/middlewares/validator.middleware';

import {
    getProductsByProductShortIdsReqBody
} from '@/controllers/validators/customerProduct.controller.validator';


export default class InternalRoute implements Routes {
    public path = '/api/v1/internal';
    public routes = Router();

    private validatorMiddleware = new ValidatorMiddleware();

}