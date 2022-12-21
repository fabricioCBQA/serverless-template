import { StatusCodes } from '@entities/enums';
import { CustomException } from '@utils/Exceptions';

export default class InternalResponse {
  public isError: boolean;
  public payload: any;
  public errorCode: any;
  public statusCode: number;
  public clientMessage: string;
  public technicalMessage: string;

  constructor() {
    this.isError = false;
    this.payload = {};
    this.statusCode = StatusCodes.OK;
    this.clientMessage = 'An error has ocurred at processing the petition.';
    this.technicalMessage = '';
  }

  static buildErrorResponse(error: any): InternalResponse {
    const instance = new InternalResponse();
    instance.isError = true;

    if (!(error instanceof CustomException)) {
      instance.errorCode = error.errorCode;
      instance.statusCode = error.httpStatus;
      instance.technicalMessage = '' + error.originalError;
      instance.clientMessage = error.clientMessage;
    } else {
      instance.technicalMessage = (error as Error).message;
    }
    return instance;
  }
}
