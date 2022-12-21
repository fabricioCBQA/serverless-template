import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { LambdaLog } from 'lambda-log';

import { User } from '@interfaces/User';
import InternalResponse from '@libs/InternalResponse';
import LambdaResponse from '@libs/LambdaResponse';
import { BadRequestException } from '@utils/Exceptions';

const log = new LambdaLog();

log.options.debug = Boolean(true);

/**
 * Handlers
 */

export const handlerGetHelloThere = async (
  _event: APIGatewayEvent,
  _context: Context,
  _callback: Callback
): Promise<void> => {
  const output = await getHelloThere(_event);
  _callback(null, new LambdaResponse(output));
};

/**
 * Functions
 */

const getHelloThere = async (
  event: APIGatewayEvent
): Promise<InternalResponse> => {
  const output = new InternalResponse();
  const { email, password }: User = JSON.parse(event.body);

  try {
    const greetings = process.env.THIS_IS_AN_ENV_VARIABLE;

    const finalMessage = `${greetings} ${email} this is your password ${password}`;

    output.payload = finalMessage;

    return output;
  } catch (error) {
    const msg = (error as Error).message;
    throw new BadRequestException(msg, error);
  }
};
