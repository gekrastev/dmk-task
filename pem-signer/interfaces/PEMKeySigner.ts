import { SupportedAlgorithms } from './types';

export interface PEMKeySigner {
    signPEMKey: (publicKeyPEM: string, algorithm: SupportedAlgorithms) => Promise<string>;
}
