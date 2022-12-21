import LambdaResponse from '@libs/LambdaResponse';
import { CustomException, BadRequestException } from '@utils/Exceptions';

import InternalResponse from './InternalResponse';

const ApiGatewayResponse = () => {
  return {
    onError: (request: any) => {
      if (request.error.isError) {
        request.response = new LambdaResponse(request.error);
      } else {
        if (request.error.name === 'BadRequestError') {
          request.response = new LambdaResponse(
            InternalResponse.buildErrorResponse(new BadRequestException())
          );
        } else {
          request.response = new LambdaResponse(
            InternalResponse.buildErrorResponse(
              new CustomException('Unknown Error', request.error)
            )
          );
        }
      }
    },
    after: (request: any) => {
      request.response = new LambdaResponse(request.response);
    },
  };
};

export default ApiGatewayResponse;
