import { Lambda } from 'aws-sdk';
import { InvocationRequest } from 'aws-sdk/clients/lambda';
import * as log from 'lambda-log';

import { isNullOrWhitespace } from './Utils';

const lambda = new Lambda({ apiVersion: '2015-03-31' });

export const invokeLambda = async (
  functionPartialName: string | null,
  functionFullName?: string,
  payload?: string
): Promise<string> => {
  try {
    let functionName = functionFullName;

    if (!isNullOrWhitespace(functionPartialName)) {
      functionName = `nft-backend-serverless-dev-${functionPartialName}`;
    }

    const lambdaParams: InvocationRequest = {
      FunctionName: functionName,
      InvocationType: 'Event',
    };

    if (!isNullOrWhitespace(payload)) {
      lambdaParams.Payload = payload;
    }

    const lambdaResult = await lambda.invoke(lambdaParams).promise();
    if (lambdaResult.FunctionError) {
      throw new Error(lambdaResult.Payload.toString());
    }

    return lambdaResult.Payload.toString();
  } catch (error) {
    log.error(error);
    throw new Error('Lambda invocation failed');
  }
};
