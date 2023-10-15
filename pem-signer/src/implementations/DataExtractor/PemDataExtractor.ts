import { pki } from 'node-forge';
import { DataExtractor } from '../../interfaces/DataExtractor';

export class PemDataExtractor implements DataExtractor {
    extractPublicKeyToPEM = (parsedCert: pki.Certificate) => {
        const publicKey = parsedCert?.publicKey;

        if (!publicKey) {
            throw new Error('Unable to retrive Public Key!');
        }

        return pki.publicKeyToPem(publicKey);
    };
    extractCommonName = (parsedCert: pki.Certificate) => {
        const commonNameAttribute = parsedCert?.subject?.attributes?.find((attribute) => attribute?.shortName === 'CN');

        if (!commonNameAttribute || !commonNameAttribute?.value) {
            throw new Error('Unable to retrive Common Name!');
        }
        // In the case of a single-name certificate, the Common Name consists of a single host name (e.g. example.com, www.example.com), or a wildcard name in the case of a wildcard certificate (e.g. *.example.com).
        //source https://support.dnsimple.com/articles/what-is-common-name/
        return commonNameAttribute.value as string;
    };
}
