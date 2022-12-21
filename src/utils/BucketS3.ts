import { S3 } from 'aws-sdk';
import { LambdaLog } from 'lambda-log';

const s3 = new S3();
const log = new LambdaLog();

log.options.debug = Boolean(true);

const s3ConfigUpdate = (): void => {
  const params = {
    region: process.env.REGION,
  };

  s3.config.update(params);
};

export const uploadObject = async (
  bucketName: string,
  fileName: string,
  body: Buffer,
  contentType: string
): Promise<any> => {
  s3ConfigUpdate();
  try {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: body,
      ContentType: contentType,
    };

    await s3.upload(params).promise();
  } catch (error) {
    log.debug('Error uploading object', error);
    throw new Error('Error uploading object ' + error);
  }
};

export const s3ListObjects = async (bucketName: string): Promise<any> => {
  s3ConfigUpdate();
  try {
    const params = {
      Bucket: bucketName,
    };
    const listedObjects = await s3.listObjectsV2(params).promise();

    return listedObjects.Contents.map((content) => content.Key);
  } catch (error) {
    log.debug('Error listing objects', error);
    throw new Error('Error listing objects ' + error);
  }
};

export const s3GetObject = async (params: any): Promise<string> => {
  s3ConfigUpdate();
  return new Promise<any>((resolve, reject) => {
    s3.headObject(params, function (err) {
      if (err && err.name === 'NotFound') {
        resolve('NotFound');
      } else {
        s3.getSignedUrl('getObject', params, function (err, signedUrl) {
          if (err) {
            log.error(err);
            reject(err);
          } else {
            resolve(signedUrl);
          }
        });
      }
    });
  });
};
