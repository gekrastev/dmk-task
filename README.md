# dmk-task

This project contains source code and supporting files for a serverless application that you can deploy using AWS CloudFormation.
The application does the following:
1. reads a x509 certificate in .pem file format from an S3 bucket
2. extracts the commonName and the Public Key from the certificate
3. Hashesh the Public Key then signs it with a Private Key that it generates.
4. Saves the signed Public Key to a DynamoDB table with the commonName as the HASH key.


The application uses several AWS resources: Lambda, S3, DynamoDB, IAMPolicy. These resources are defined in the `cloudFormation.yml (inside pem-signer)

## Pre-requisites
1. aws account
2. aws cli installed and configured (IAM profile added)
3. aws cdk installed
4. node.js installed (project was made using node 18)
5. Create an S3 Bucket where you will store the lambda code. Make sure it's name is the same in the Stack Parameters.
6. Before starting the deployment **make sure that you go to the cloudFormation.yml file and change the Stack Parameters** or pass different ones when invoking the stack crate command.

## Deploy
To build and deploy the application, please follow these steps:

1. First, navigate to the pem-signer directory.
2. These commands will install the dependencies and compile the typescript files. The compiled files can be found inside the dist folder.
```bash
npm install
tsc
```
3. After that is done, you need to create a .zip file to upload to the S3 bucket you created earlier. Copy the node_modules folder inside the dist directory. Also copy the x509.pem certificate there and make sure it is on the same level as index.js. Refer to **IMPORTANT** section to find out why.
4.  upload the .zip  file
5.  execute the following command:
```bash
aws cloudformation create-stack --stack-name YourStackName --template-body file://cloudFormation.yml --capabilities CAPABILITY_NAMED_IAM
```
If you prefer to set the Stack Parameters from the commandline, use:
```bash
aws cloudformation create-stack --stack-name YourStackName --template-body file://cloudFormation.ym --parameters ParameterKey=S3BucketName,ParameterValue=your-s3-bucket ParameterKey=S3Key,ParameterValue=path/your-deployment-package.zip
```
6. Wait for the deployment to complete. You can check the status in the AWS Console

## Test the application

You can test the application by configuring a test event inside the AWS Console. Open Lambda > Test > Create New Event. You can then use the following template:

```json
{
  "Records": [
    {
      "eventSource": "aws:s3",
      "eventName": "ObjectCreated:Put",
      "s3": {
        "bucket": {
          "name": "your-bucket-name"
        },
        "object": {
          "key": "dist/x509.pem"
        }
      }
    }
  ]
}
```
Send the event. After execution is complete, check your Dynamo Table to see the new entry.

## IMPORTANT

Currently, the application is reading the PEM file from the same directory as the index.js file because I have not figured out why I am getting an "Access Denied" error when accessing the file from the S3 Bucket. The S3 Trigger is working correctly, but I can't quite figure out the permissions yet.
Because of this, the application is using a local file reader (Node fs) instead of the AWS S3 SDK. In order to get it working with it, OR in order to switch up the encryption algorithm, uncomment the corresponding lines in the index.ts. After that compile and deploy again.

## Cleanup
**To delete the stack you need to make sure that your S3 bucket is empty. After that, you can delete it via the AWS CLI or the Management Console.**
