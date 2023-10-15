export interface FileReader {
    readFile: (fileName: string) => Promise<string>;
}
