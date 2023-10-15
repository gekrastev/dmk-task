import { PEMKeySigner } from '../../interfaces/PEMKeySigner';
import { pki, md, util } from 'node-forge';

export class ED25519KeySigner implements PEMKeySigner {
    signPEMKey = async (publicKeyPEM: string): Promise<string> => {
        return this.signWithECCKey(publicKeyPEM);
    };

    private signWithECCKey = (publicKeyPEM: string): string => {
        const { publicKey, privateKey } = pki.ed25519.generateKeyPair();
        const messageDigest = md.sha256.create();
        messageDigest.update(util.encodeUtf8(publicKeyPEM), 'utf8');
        const signedMd = pki.ed25519.sign({ md: messageDigest, privateKey: privateKey });
        const verification = pki.ed25519.verify({ md: messageDigest, signature: signedMd, publicKey: publicKey });

        if (!verification) {
            throw new Error('Verification failed');
        }

        return signedMd.toString('hex');
    };
}
