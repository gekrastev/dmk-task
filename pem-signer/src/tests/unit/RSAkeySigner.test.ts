import { RSAKeySigner } from "../../implementations/KeySigner/RSAKeySigner";

describe("RSAKeySigner", () => {
  const rsaKeySigner = new RSAKeySigner();
  const publicKeyPEM =
    "-----BEGIN PUBLIC KEY-----\nYourPublicKeyDataHere\n-----END PUBLIC KEY-----";

  it("should sign a PEM public key", async () => {
    // Replace this with your actual implementation to sign the PEM key
    const result = await rsaKeySigner.signPEMKey(publicKeyPEM);
    expect(typeof result).toEqual("string"); // Check if the result contains the expected signed key header
  });
  it("should throw error when param is not PEM", async () => {
    // Replace this with your actual implementation to sign the PEM key
    await expect(rsaKeySigner.signPEMKey("notapem")).rejects.toThrowError(
      "Message you are trying to encrypt is not a string in PEM format"
    );
  });
  it("should throw error when param is undefined", async () => {
    // Replace this with your actual implementation to sign the PEM key
    await expect(rsaKeySigner.signPEMKey(undefined)).rejects.toThrowError(
      "Message you are trying to encrypt is not a string in PEM format"
    );
  });
});
