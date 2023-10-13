import { S3CreateEvent } from 'aws-lambda';
import * as fs from 'fs';
import { LambdaResponse } from './interfaces/LambdaResponse';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: S3CreateEvent): Promise<LambdaResponse> => {
    try {
        // Specify the path to the local file
        const localFilePath = './x509.pem';
        console.log(event);
        // Read the local file
        const content = fs.readFileSync(localFilePath, 'utf-8');

        // Do something with the content
        console.log('Content of the local file:', content);

        // Continue processing
        // ...

        return {
            statusCode: 200,
            body: 'File content read successfully.',
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: 'An error occurred while reading the local file.',
        };
    }
};
