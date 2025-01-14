import assert from "node:assert";
import { describe, test } from "node:test";
import { extractMimeType } from "../../utils/extractMimeType";

describe("extractMimeType", () => {
  test("with correct MIME type for supported file", () => {
    const result = extractMimeType("example.pdf");
    assert.deepStrictEqual(result, { mimeType: "application/pdf" });
  });

  test("with unsupported file extension", () => {
    assert.throws(() => extractMimeType("example.unknown"), {
      message: "Unsupported file extension",
    });
  });

  test("with file without extension", () => {
    assert.throws(() => extractMimeType("unknown"), {
      message: "No extension found in file",
    });
  });

  test("with file with multiple periods", () => {
    const result = extractMimeType("example.file.name.pdf");

    assert.deepStrictEqual(result, { mimeType: "application/pdf" });
  });

  test("with case-insensitive extension", () => {
    const result = extractMimeType("example.JPEG");

    assert.deepStrictEqual(result, { mimeType: "image/jpeg" });
  });

  test("with empty string filename ", () => {
    assert.throws(() => extractMimeType(""), {
      message: "No extension found in file",
    });
  });
});
