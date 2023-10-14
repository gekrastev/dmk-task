import { S3CreateEvent } from 'aws-lambda';
import * as fs from 'fs';
import { LambdaResponse } from './interfaces/LambdaResponse';
import { LambdaHandler } from './implementations/LambdaHandler';
import { NodeJsFileReader } from './implementations/NodeJsFileReader';

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
    const fileReader = new NodeJsFileReader(); // used when testing locally
    const lambdaHandler = new LambdaHandler(fileReader);

    return await lambdaHandler.handleEvent();
};
