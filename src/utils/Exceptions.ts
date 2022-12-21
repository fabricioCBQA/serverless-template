import { StatusCodes } from '../entities/enums';

export class CustomException extends Error {
  public originalError: unknown;
  public errorCode: number;
  public httpStatus: StatusCodes;
  public clientMessage: string;
  public technicalMessage: string;

  constructor(msg = '', originalError: Error = new Error()) {
    super(msg);
    this.originalError = originalError;
    this.errorCode = 500;
    this.httpStatus = StatusCodes.SERVER_ERROR;
    this.clientMessage = 'Somenthing went wrong! :(';
    this.technicalMessage = msg;
  }
}

export class BadRequestException extends CustomException {
  constructor(
    msg = '',
    clientMessage = 'Bad Request! :(',
    originalError: Error = new Error()
  ) {
    super(msg, originalError);
    this.errorCode = 400;
    this.httpStatus = StatusCodes.BAD_REQUEST;
    this.clientMessage = clientMessage;
    this.technicalMessage = msg;
  }
}
