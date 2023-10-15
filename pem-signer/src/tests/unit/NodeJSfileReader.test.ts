import * as fs from "fs/promises";
import { NodeJsFileReader } from "../../implementations/FileReader/NodeJsFileReader";

describe("NodeJsFileReader", () => {
  const fileReader = new NodeJsFileReader();

  it("should read a file", async () => {
    const fileName = "example.txt";
    const fileContent = "This is the file content.";

    const result = await fileReader.readFile(fileName);

    expect(fileReader.readFile).toHaveBeenCalledWith(fileName, "utf-8");
    expect(result).toBe(fileContent);
  });

  it("should throw an error when the file does not exist", async () => {
    const fileName = "nonexistent.txt";

    await expect(fileReader.readFile(fileName)).rejects.toThrowError();
  });

  it("should throw an error when trying to read undefined", async () => {
    await expect(fileReader.readFile(undefined)).rejects.toThrowError();
  });
});
