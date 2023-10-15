import { pki } from 'node-forge';
import { CertificateParser } from '../../interfaces/CertificateParser';

export class PemFileParser implements CertificateParser {
    parsePemFileToX509 = (pemString: string): pki.Certificate => {
        return pki.certificateFromPem(pemString);
    };
}
