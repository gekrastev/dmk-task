import * as AWS from "aws-sdk";
import { FileReader } from "../../interfaces/FileReader";

export class S3FileReader implements FileReader {
  private s3Client;
  constructor() {
    this.s3Client = new AWS.S3();
  }
  readFile(fileName: string): Promise<string> {
    const params = { Bucket: process.env.BUCKET_NAME!, Key: fileName };
    return new Promise((resolve, reject) => {
      this.s3Client.getObject(params, (error, data) => {
        if (error) {
          reject(error);
          return;
        }
        const fileContent = data?.Body?.toString();
        if (!fileContent) {
          reject(new Error("File content is empty!"));
        } else {
          resolve(fileContent);
        }
      });
    });
  }
}
