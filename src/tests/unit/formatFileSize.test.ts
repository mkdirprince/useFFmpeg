import assert from "node:assert";
import { describe, test } from "node:test";
import { formatFileSize } from "../../utils/formatFileSize";
import testHelper from "../testHelper";

describe("format file size", () => {
  test("with blob of zero bytes", () => {
    const blob = testHelper.createBlobOfSize(0);

    const readableSize = formatFileSize(blob.size);

    assert.strictEqual(readableSize, "0.00 bytes");
  });

  test("with blob of a single byte", () => {
    const blob = testHelper.createBlobOfSize(1);

    const readableSize = formatFileSize(blob.size);

    assert.strictEqual(readableSize, "1.00 bytes");
  });

  test("with blob of exact threshold", () => {
    const blob1 = testHelper.createBlobOfSize(1024);
    const blob2 = testHelper.createBlobOfSize(1048576);

    const blob3 = testHelper.createBlobOfSize(1073741824);

    const readableSize1 = formatFileSize(blob1.size);
    const readableSize2 = formatFileSize(blob2.size);
    const readableSize3 = formatFileSize(blob3.size);

    assert.strictEqual(readableSize1, "1.00 KB");
    assert.strictEqual(readableSize2, "1.00 MB");
    assert.strictEqual(readableSize3, "1.00 GB");
  });

  test("undefined blob size", () => {
    const readableSize = formatFileSize(undefined);

    assert.strictEqual(readableSize, "unknown size");
  });

  test("blob with very large size", () => {
    const blob = { size: 1125899906842624 };

    const readableSize = formatFileSize(blob.size);

    assert.strictEqual(readableSize, "1024.00 TB");
  });
});
