import { S3CreateEvent } from "aws-lambda";
import { PemFileParser } from "./implementations/CertificateParser/PemFileParser";
import { PemDataExtractor } from "./implementations/DataExtractor/PemDataExtractor";
import { DynamoInteractor } from "./implementations/DatabaseInteractor/DynamoInteractor";
import { S3FileReader } from "./implementations/FileReader/S3FileReader";
import { ED25519KeySigner } from "./implementations/KeySigner/ED25519KeySigner";
import { LambdaHandler } from "./implementations/LambdaHandler";
import { LambdaResponse } from "./interfaces/types";
import { NodeJsFileReader } from "./implementations/FileReader/NodeJsFileReader";

export const lambdaHandler = async (
  event: S3CreateEvent
): Promise<LambdaResponse> => {
  const fileReader = new NodeJsFileReader();
  // const fileReader = new S3FileReader();
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
    databaseInteractor
  );

  return await lambdaHandler.handleEvent(event);
};
