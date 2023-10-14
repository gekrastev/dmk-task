import { PEMKeySigner } from '../interfaces/PEMKeySigner';
import { SupportedAlgorithms } from '../interfaces/types';
import { pki, md, util } from 'node-forge';

export class PublicKeySigner implements PEMKeySigner {
    signPEMKey = async (publicKeyPEM: string, algorithm: SupportedAlgorithms): Promise<string> => {
        switch (algorithm) {
            case SupportedAlgorithms.RSA:
                return this.signWithRSAKey(publicKeyPEM);

            case SupportedAlgorithms.ECC:
                return this.signWithECCKey(publicKeyPEM);

            default:
                throw new Error('Algorithm is not supported!');
        }
    };

    private signWithRSAKey = async (publicKeyPEM: string): Promise<string> => {
        try {
            const { publicKey, privateKey } = await this.generateRSAKeyPair();
            const messageDigest = this.hashPublicKey(publicKeyPEM);
            const signedPublicKey = privateKey.sign(messageDigest);
            const verification = publicKey.verify(messageDigest.digest().bytes(), signedPublicKey);

            if (!verification) {
                throw new Error('Verification failed');
            }

            return util.bytesToHex(signedPublicKey);
        } catch (err: any) {
            throw new Error(`Failed to generate RSA Key:${err.message ?? err}`);
        }
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

    private signWithECCKey = (publicKeyPEM: string): string => {
        const { publicKey, privateKey } = pki.ed25519.generateKeyPair();
        const messageDigest = this.hashPublicKey(publicKeyPEM);
        const signedMd = pki.ed25519.sign({ md: messageDigest, privateKey: privateKey });
        const verification = pki.ed25519.verify({ md: messageDigest, signature: signedMd, publicKey: publicKey });

        if (!verification) {
            throw new Error('Verification failed');
        }

        return signedMd.toString('hex');
    };

    private hashPublicKey = (publicKeyPEM: string): md.sha256.MessageDigest => {
        const messageDigest = md.sha256.create();
        return messageDigest.update(util.encodeUtf8(publicKeyPEM), 'utf8');
    };
}
