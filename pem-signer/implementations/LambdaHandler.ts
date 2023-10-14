import { FileReader } from '../interfaces/FileReader';
import { LambdaResponse } from '../interfaces/LambdaResponse';
//TODO ADD LambdaHandler interface
export class LambdaHandler {
    fileReader: FileReader;
    constructor(fileReader: FileReader) {
        this.fileReader = fileReader;
    }
    handleEvent = async (): Promise<LambdaResponse> => {
        try {
            // Specify the path to the local file
            const content = await this.fileReader.readFile();

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
}
