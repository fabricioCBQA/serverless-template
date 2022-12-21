import AWS from 'aws-sdk';
import { LambdaLog } from 'lambda-log';

const documentClient = new AWS.DynamoDB.DocumentClient();
const dynamoDB = new AWS.DynamoDB();
const log = new LambdaLog();

log.options.debug = Boolean(true);
AWS.config.update({ region: 'us-west-2' });

export const WalletExists = async (item: string): Promise<boolean> => {
  let existence = false;
  try {
    const params = {
      TableName: process.env.DYNAMODB_USER_INFO,
      Key: {
        wallet: item,
      },
    };

    const result = await documentClient.get(params).promise();

    if (result.Item !== undefined && result.Item !== null) {
      existence = true;
    }
  } catch (error) {
    log.debug('Error at Verifying Wallet', error);
    throw new Error('Error at Verifying Wallet ' + error);
  }
  return existence;
};

export const PutItem = async (tableName: string, item: any): Promise<void> => {
  try {
    await dynamoDB
      .putItem({
        TableName: tableName,
        Item: item,
      })
      .promise();
  } catch (error) {
    log.debug('Error at Put Item', error);
    throw new Error('Error at Put Item ' + error);
  }
};

export const updateItem = async (
  params: AWS.DynamoDB.DocumentClient.UpdateItemInput
) => {
  try {
    await documentClient.update(params).promise();
  } catch (error) {
    log.debug('Error at Updating Item', error);
    throw new Error('Error at Updating Item ' + error);
  }
};

export const queryItem = async (
  params: AWS.DynamoDB.DocumentClient.QueryInput
) => {
  try {
    const response = await documentClient.query(params).promise();
    return response;
  } catch (error) {
    log.debug('Error at Updating Item', error);
    throw new Error('Error at Updating Item ' + error);
  }
};
