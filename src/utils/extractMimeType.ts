import { mimeTypesObject } from "../constants";

/**
 * Extracts the MIME type from a file name or path based on its extension.
 *
 * This function takes a file name or file path as input, extracts its extension,
 * and looks up the corresponding MIME type from a predefined object. If the
 * extension is not found or unsupported, it throws an error.
 *
 * @param {string} file - The file name or path to extract the MIME type from.
 * @returns {{ mimeType: string }} An object containing the MIME type of the file.
 * @throws {error} Throws an error if the file has no extension or the extension is unsupported.
 *
 * @example
 * import { extractMimeType } from "./utils";
 *
 * // Example 1: Extracting MIME type for a supported file
 * const file1 = "example.pdf";
 * console.log(extractMimeType(file1)); // { mimeType: "application/pdf" }
 *
 * // Example 2: Extracting MIME type for an unsupported file
 * const file2 = "example.unknown";
 * try {
 *   extractMimeType(file2);
 * } catch (err) {
 *   console.error(err.message); // "Unsupported file extension"
 * }
 *
 * // Example 3: File with no extension
 * const file3 = "example";
 * try {
 *   extractMimeType(file3);
 * } catch (err) {
 *   console.error(err.message); // "No extension found in file"
 * }
 */

export const extractMimeType = (file: string): { mimeType: string } => {
  const splitFile = file.split(".");

  if (splitFile.length < 2) {
    throw new Error("No extension found in file");
  }

  const extension = splitFile[splitFile.length - 1].toLowerCase();

  // look up for the MIM type of the extension
  const mimeType = mimeTypesObject[extension as keyof typeof mimeTypesObject];

  if (!mimeType) {
    throw new Error("Unsupported file extension");
  }

  return { mimeType };
};
