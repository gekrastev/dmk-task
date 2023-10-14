export type LambdaResponse = {
    statusCode: number;
    body: string;
};

export enum SupportedAlgorithms {
    RSA = 'RSA',
    ECC = 'ECC',
}
