import { pki } from 'node-forge';

export interface DatabaseInteractor {
    savePublicKey: (commonName: string, publicKey: string) => void;
}
