import { describe, it, expect } from "vitest";
import fs from "fs-extra";
import {
  removeFile,
  fileExists,
  getFoldersInDirectory,
  removeFolder,
} from "./files";

describe("removeFile", () => {
  it("should remove the file if it exists", async () => {
    // Create a temporary file
    const filePath = "/tmp/testfile.txt";
    await fs.outputFile(filePath, "content");

    // Attempt to remove the file
    await removeFile(filePath);

    // Check that the file has been removed
    const exists = await fs.pathExists(filePath);
    expect(exists).toBe(false);
  });

  it("should throw an error if the file does not exist", async () => {
    // Define a path that doesn't exist
    const filePath = "/tmp/nonexistent.txt";

    // Expect an error to be thrown
    await expect(removeFile(filePath)).rejects.toThrow(
      "⛔ Could not read the file.",
    );
  });
});

describe("fileExists", () => {
  it("should return true if the file exists", async () => {
    const filePath = "/tmp/existing.txt";
    await fs.outputFile(filePath, "content");

    const exists = await fileExists(filePath);
    expect(exists).toBe(true);

    await fs.remove(filePath);
  });

  it("should return false if the file does not exist", async () => {
    const filePath = "/tmp/nonexistent.txt";

    const exists = await fileExists(filePath);
    expect(exists).toBe(false);
  });
});

describe("getFoldersInDirectory", () => {
  it("should return a list of directories in the given path", () => {
    // Create a directory with subdirectories and a file
    const directory = "/tmp/testdir";
    fs.ensureDirSync(`${directory}/subdir1`);
    fs.ensureDirSync(`${directory}/subdir2`);
    fs.outputFileSync(`${directory}/file.txt`, "content");

    // Get the list of folders
    const folders = getFoldersInDirectory(directory);

    // Verify the correct directories are returned
    expect(folders).toEqual(["subdir1", "subdir2"]);

    // Remove the created directory and its contents
    fs.removeSync(directory);
  });
});

describe("removeFolder", () => {
  it("should remove the folder and its contents", async () => {
    const folderPath = "/tmp/testfolder";
    fs.ensureDirSync(`${folderPath}/subfolder`);
    fs.outputFileSync(`${folderPath}/file.txt`, "content");

    await removeFolder(folderPath);

    const exists = fs.existsSync(folderPath);
    expect(exists).toBe(false);
  });
});

// TODO: currently is not finished
/* describe("getCurrentDirname", () => {
  it("should return the correct directory name from importMetaUrl", () => {
    const importMetaUrl = "file:///user/project/src/file.ts";
    const dirname = getCurrentDirname(importMetaUrl);
    expect(dirname).toBe("/user/project/src");
  });
}); */

// TODO: currently is not finished
/* describe("getRootDirname", () => {
  it("should return the root directory name based on doubleDotsRepeat", () => {
    const importMetaUrl = "file:///user/project/src/file.ts";
    const rootDir = getRootDirname(importMetaUrl, 2);
    expect(rootDir).toBe("/user");
  });
}); */
