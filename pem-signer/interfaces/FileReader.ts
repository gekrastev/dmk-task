export interface FileReader {
    readFile: () => Promise<string>;
}
