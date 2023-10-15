import { pki } from "node-forge";
import { PemDataExtractor } from "../../implementations/DataExtractor/PemDataExtractor";

describe("PemDataExtractor", () => {
  const dataExtractor = new PemDataExtractor();
  const commonName = "ww.my-website.com";
  const publicKeyPem =
    "-----BEGIN PUBLIC KEY-----\nYourPublicKeyDataHere\n-----END PUBLIC KEY-----";

  it("should extract the public key to PEM format", () => {
    const parsedCert: pki.Certificate = {
      publicKey: pki.publicKeyFromPem(publicKeyPem),
      subject: {
        attributes: [
          {
            shortName: "CN",
            value: commonName,
          },
        ],
      },
    };

    const result = dataExtractor.extractPublicKeyToPEM(parsedCert);

    expect(result).toBe(publicKeyPem);
  });

  it("should throw an error when the public key is not available", () => {
    const parsedCert: pki.Certificate = {
      subject: {
        attributes: [
          {
            shortName: "CN",
            value: commonName,
          },
        ],
      },
    };

    expect(() => dataExtractor.extractPublicKeyToPEM(parsedCert)).toThrowError(
      "Unable to retrieve Public Key"
    );
  });

  it("should throw an error when input is undefined", () => {
    expect(() => dataExtractor.extractPublicKeyToPEM(undefined)).toThrowError(
      "Unable to retrieve Public Key"
    );
  });

  it("should extract the common name", () => {
    const parsedCert: pki.Certificate = {
      subject: {
        attributes: [
          {
            shortName: "CN",
            value: commonName,
          },
        ],
      },
    };

    const result = dataExtractor.extractCommonName(parsedCert);

    expect(result).toBe(commonName);
  });

  it("should throw an error when the common name is undefined", () => {
    const parsedCert: pki.Certificate = {
      subject: {
        attributes: [],
      },
    };

    expect(() => dataExtractor.extractCommonName(parsedCert)).toThrowError(
      "Unable to retrieve Common Name"
    );
  });
  it("should throw an error when param is undefined", () => {
    expect(() => dataExtractor.extractCommonName(undefined)).toThrowError(
      "Unable to retrieve Common Name"
    );
  });
});
