/**
 * Handles an error by creating an error message and throwing a new Error.
 *
 * This function accepts an error and context string, constructs a descriptive error message,
 * and throws an error with that message. If the provided error is an instance of `Error`,
 * its message is included; otherwise, a generic message indicating an unknown error is used.
 *
 * @param {unknown} error - The error to handle. It can be any type, but if it's an instance of `Error`, its message will be used.
 * @param {string} context - A string that provides context about where the error occurred, helping to identify the source of the issue.
 * @returns {never} - This function always throws an error and does not return a value.
 *
 * @throws {Error} Throws a new error with a formatted message containing the provided context and the error message (if available).
 *
 * @example
 * try {
 *   // Some code that may throw an error
 * } catch (error) {
 *   handleError(error, "Error processing the file");
 * }
 */

export const errorHandler = (error: unknown, context: string): never => {
	let errorMessage = `${context}: `;
	if (error instanceof Error) {
		errorMessage += error.message;
	} else {
		errorMessage += "Unknown error occurred.";
	}
	throw new Error(errorMessage);
};
