import { FileReader } from '../interfaces/FileReader';
import * as fs from 'fs/promises';

export class NodeJsFileReader implements FileReader {
    readFile(): Promise<string> {
        return fs.readFile('./x509.pem', 'utf-8');
    }
}
