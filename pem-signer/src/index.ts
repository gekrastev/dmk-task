import { S3CreateEvent } from 'aws-lambda';
import { PemFileParser } from './implementations/CertificateParser/PemFileParser';
import { PemDataExtractor } from './implementations/DataExtractor/PemDataExtractor';
import { DynamoInteractor } from './implementations/DatabaseInteractor/DynamoInteractor';
import { S3FileReader } from './implementations/FileReader/S3FileReader';
import { ED25519KeySigner } from './implementations/KeySigner/ED25519KeySigner';
import { LambdaHandler } from './implementations/LambdaHandler';
import { LambdaResponse } from './interfaces/types';

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
    // const fileReader = new NodeJsFileReader();  used when testing locally
    const fileReader = new S3FileReader();
    const certificateParser = new PemFileParser();
    const dataExtractor = new PemDataExtractor();
    // you can choose which algorithm to use by instantiating either one of the classes implementing  PEMKeySigner interface
    // const publicKeySigner = new RSAKeySigner();
    const publicKeySigner = new ED25519KeySigner();
    const databaseInteractor = new DynamoInteractor();

    const lambdaHandler = new LambdaHandler(
        fileReader,
        certificateParser,
        dataExtractor,
        publicKeySigner,
        databaseInteractor,
    );

    return await lambdaHandler.handleEvent(event);
};
