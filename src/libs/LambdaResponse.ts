import { ServiceResponse } from '@interfaces/ServiceResponse';

import InternalResponse from './InternalResponse';

export default class LambdaResponse {
  public statusCode: number;
  public body: unknown;
  public headers: unknown;

  constructor(payload: InternalResponse) {
    this.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': true,
    };

    if (payload.isError) {
      const response: ServiceResponse = {
        code: payload.statusCode,
        message: `${payload.clientMessage} ( ${payload.statusCode} )`,
        payload: {},
      };
      this.statusCode = payload.statusCode;
      this.body = JSON.stringify(response);
    } else {
      const response: ServiceResponse = {
        code: 200,
        message: 'Success',
        payload: payload.payload,
      };
      this.statusCode = 200;
      this.body = JSON.stringify(response);
    }
  }
}
