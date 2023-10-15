import { S3CreateEvent } from 'aws-lambda';
import { DataExtractor } from '../interfaces/DataExtractor';
import { DatabaseInteractor } from '../interfaces/DatabaseInteractor';
import { FileReader } from '../interfaces/FileReader';
import { PEMKeySigner } from '../interfaces/PEMKeySigner';
import { LambdaResponse } from '../interfaces/types';
import { PemFileParser } from './CertificateParser/PemFileParser';
//TODO ADD LambdaHandler interface
export class LambdaHandler {
    private fileReader: FileReader;
    private certificateParser: PemFileParser;
    private dataExtractor: DataExtractor;
    private publicKeySigner: PEMKeySigner;
    private databaseInteractor: DatabaseInteractor;

    constructor(
        fileReader: FileReader,
        certificateParser: PemFileParser,
        dataExtractor: DataExtractor,
        publicKeySigner: PEMKeySigner,
        databaseInteractor: DatabaseInteractor,
    ) {
        this.fileReader = fileReader;
        this.certificateParser = certificateParser;
        this.dataExtractor = dataExtractor;
        this.publicKeySigner = publicKeySigner;
        this.databaseInteractor = databaseInteractor;
    }
    handleEvent = async (event: S3CreateEvent): Promise<LambdaResponse> => {
        for (const record of event.Records) {
            try {
                const key = record.s3.object.key;
                const fileContent = await this.fileReader.readFile(key);
                const parsedCertificate = this.certificateParser.parsePemFileToX509(fileContent);
                const certificateCommonName = this.dataExtractor.extractCommonName(parsedCertificate);
                const publicKeyPEM = this.dataExtractor.extractPublicKeyToPEM(parsedCertificate);
                const signedPublicKey = await this.publicKeySigner.signPEMKey(publicKeyPEM);
                await this.databaseInteractor.savePublicKey(certificateCommonName, signedPublicKey);
                // console.log(certificateCommonName, signedPublicKey);
            } catch (error: any) {
                return {
                    statusCode: 500,
                    body: `Error occured: ${error?.message ?? error}`,
                };
            }
        }
        return {
            statusCode: 200,
            body: 'File content read successfully.',
        };
    };
}
