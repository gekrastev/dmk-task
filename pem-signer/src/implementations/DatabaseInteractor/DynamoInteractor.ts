import * as AWS from "aws-sdk";
import { DatabaseInteractor } from "../../interfaces/DatabaseInteractor";

export class DynamoInteractor implements DatabaseInteractor {
  private dynamoClient;
  constructor() {
    this.dynamoClient = new AWS.DynamoDB.DocumentClient();
  }
  savePublicKey = async (commonName: string, publicKey: string) => {
    return await this.dynamoClient
      .put({
        TableName: process.env.TABLE_NAME!,
        Item: {
          commonName: commonName,
          encryptedValue: publicKey,
        },
      })
      .promise();
  };
}
