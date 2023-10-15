import { pki } from 'node-forge';

export interface CertificateParser {
    parsePemFileToX509: (pemString: string) => pki.Certificate;
    //more parsing methods here if necessary
}
