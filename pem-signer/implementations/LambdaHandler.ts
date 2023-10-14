import { DataExtractor } from '../interfaces/DataExtractor';
import { FileReader } from '../interfaces/FileReader';
import { PEMKeySigner } from '../interfaces/PEMKeySigner';
import { LambdaResponse, SupportedAlgorithms } from '../interfaces/types';
import { PemFileParser } from './PemFileParser';
//TODO ADD LambdaHandler interface
export class LambdaHandler {
    private fileReader: FileReader;
    private certificateParser: PemFileParser;
    private dataExtractor: DataExtractor;
    private publicKeySigner: PEMKeySigner;

    constructor(
        fileReader: FileReader,
        certificateParser: PemFileParser,
        dataExtractor: DataExtractor,
        publicKeySigner: PEMKeySigner,
    ) {
        this.fileReader = fileReader;
        this.certificateParser = certificateParser;
        this.dataExtractor = dataExtractor;
        this.publicKeySigner = publicKeySigner;
    }
    handleEvent = async (): Promise<LambdaResponse> => {
        try {
            // Specify the path to the local file
            const fileContent = await this.fileReader.readFile();
            const parsedCertificate = this.certificateParser.parsePemFileToX509(fileContent);
            const certificateCommonName = this.dataExtractor.extractCommonName(parsedCertificate);
            const publicKeyPEM = this.dataExtractor.extractPublicKeyToPEM(parsedCertificate);
            const signedPublicKey = await this.publicKeySigner.signPEMKey(publicKeyPEM, SupportedAlgorithms.RSA);
            console.log(certificateCommonName, signedPublicKey);

            // Do something with the content
            // console.log('Content of the local file:', content);

            // Continue processing
            // ...

            return {
                statusCode: 200,
                body: 'File content read successfully.',
            };
        } catch (error: any) {
            return {
                statusCode: 500,
                body: `Error occured: ${error?.message ?? error}`,
            };
        }
    };
}
