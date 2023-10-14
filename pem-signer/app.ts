import { S3CreateEvent } from 'aws-lambda';
import { LambdaHandler } from './implementations/LambdaHandler';
import { NodeJsFileReader } from './implementations/NodeJsFileReader';
import { PemDataExtractor } from './implementations/PemDataExtractor';
import { PemFileParser } from './implementations/PemFileParser';
import { LambdaResponse } from './interfaces/types';
import { RSAKeySigner } from './implementations/RSAKeySigner';
import { ED25519KeySigner } from './implementations/ED25519KeySigner';

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
    const certificateParser = new PemFileParser();
    const dataExtractor = new PemDataExtractor();
    // you can choose which algorithm to use by instantiating either one of the classes implementing  PEMKeySigner interface
    const publicKeySigner = new RSAKeySigner();
    // const publicKeySigner = new ED25519KeySigner();

    const lambdaHandler = new LambdaHandler(fileReader, certificateParser, dataExtractor, publicKeySigner);

    return await lambdaHandler.handleEvent();
};
