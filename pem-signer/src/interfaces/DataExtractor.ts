import { pki } from 'node-forge';

export interface DataExtractor {
    extractPublicKeyToPEM: (certificate: pki.Certificate) => string;
    extractCommonName: (certificate: pki.Certificate) => string;
}
