/**
 * converts a file size in bytes to human-readable format
 *
 * This function takes the size of a file in bytes and formats it into a more
 * readable string representation using units such as KB, MB, GB, or TB.
 * If the size is `undefined`, it returns "unknown size".
 *
 * @param {number | undefined} size - The size of the file in bytes. If `undefined`, the size is unknown
 * @returns {string}  The formated file size, or "unknown size" if the input is `undefined`
 *
 * @example
 * // Example 1: Formatting a small size
 * formatFileSize(1024); // Returns "1.00 KB"
 *
 * // Example 2: Formatting a larger size
 * formatFileSize(1048576); // Returns "1.00 MB"
 *
 * // Example 3: Handling undefined input
 * formatFileSize(undefined); // Returns "unknown size"
 */

export const formatFileSize = (size: number | undefined): string => {
  if (size === undefined) {
    return "unknown size";
  }

  const units = ["bytes", "KB", "MB", "GB", "TB"];

  let k = 0;
  let newSize = size;

  while (newSize >= 1024 && k < units.length - 1) {
    newSize /= 1024;
    k++;
  }
  return `${newSize.toFixed(2)} ${units[k]}`;
};
