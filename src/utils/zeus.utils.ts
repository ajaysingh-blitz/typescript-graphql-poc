import { Application } from 'express';
import { Logger } from 'winston';

type IZeus = (app: Application, serviceName: string) => Logger;

const zeus = require('zeus') as IZeus;

export default zeus;
