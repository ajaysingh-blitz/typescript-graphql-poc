interface IPawanFunctions {
  getKey: (key: string) => Promise<string>;
  setKey: (key: string, data: string, time: number) => Promise<string>;
  removeKey: (key: string) => Promise<string>;
  cacheFn: <T>(fn: Function, keyGenerator: Function, ttl: number) => (...args: unknown[]) => T;
  removeKeysByPattern: (pattern: string) => Promise<number>;
}

type IPawan = (host: string, port: number, serviceName: string, password: string, options: object) => IPawanFunctions;

const pawan = require('pawan') as IPawan;

export default pawan;
