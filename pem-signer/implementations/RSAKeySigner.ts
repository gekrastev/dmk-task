import { PEMKeySigner } from '../interfaces/PEMKeySigner';
import { pki, md, util } from 'node-forge';

export class RSAKeySigner implements PEMKeySigner {
    signPEMKey = async (publicKeyPEM: string): Promise<string> => {
        return this.signWithRSAKey(publicKeyPEM);
    };

    private signWithRSAKey = async (publicKeyPEM: string): Promise<string> => {
        const { publicKey, privateKey } = await this.generateRSAKeyPair();
        const messageDigest = md.sha256.create();
        messageDigest.update(util.encodeUtf8(publicKeyPEM), 'utf8');
        const signedPublicKey = privateKey.sign(messageDigest);
        const verification = publicKey.verify(messageDigest.digest().bytes(), signedPublicKey);

        if (!verification) {
            throw new Error('Verification failed');
        }

        return util.bytesToHex(signedPublicKey);
    };

    private generateRSAKeyPair(): Promise<pki.rsa.KeyPair> {
        return new Promise((resolve, reject) => {
            pki.rsa.generateKeyPair({ bits: 2048, workers: 2 }, (error, keypair) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(keypair);
            });
        });
    }
}
