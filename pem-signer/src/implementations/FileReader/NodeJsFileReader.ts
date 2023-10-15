import { FileReader } from '../../interfaces/FileReader';
import * as fs from 'fs/promises';

export class NodeJsFileReader implements FileReader {
    readFile(fileName: string): Promise<string> {
        return fs.readFile(fileName, 'utf-8');
    }
}
