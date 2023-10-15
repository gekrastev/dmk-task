import { pki } from "node-forge";
import { PemFileParser } from "../../implementations/CertificateParser/PemFileParser";

describe("PemFileParser", () => {
  const pemParser = new PemFileParser();

  it("should parse a PEM file to X.509 certificate", () => {
    const pemString =
      "-----BEGIN CERTIFICATE-----\nYourCertDataHere\n-----END CERTIFICATE-----";
    const mockX509Certificate = {} as pki.Certificate;

    const result = pemParser.parsePemFileToX509(pemString);

    expect(pki.certificateFromPem).toHaveBeenCalledWith(pemString);
    expect(result).toBe(mockX509Certificate);
  });

  it("should throw an error when parsing an invalid PEM string", () => {
    const pemString = "Invalid PEM formatted message.";
    expect(() => pemParser.parsePemFileToX509(pemString)).toThrowError(
      "Invalid PEM formatted message."
    );
  });

  it("should throw an error when parsing an undefined", () => {
    expect(() => pemParser.parsePemFileToX509(undefined)).toThrowError(
      "Invalid PEM formatted message."
    );
  });
});
