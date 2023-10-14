export interface PEMKeySigner {
    signPEMKey: (publicKeyPEM: string) => Promise<string>;
}
