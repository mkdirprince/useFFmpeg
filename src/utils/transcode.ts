import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { errorHandler } from "./errorHandler";
import { extractMimeType } from "./extractMimeType";
import { formatFileSize } from "./formatFileSize";

/**
 * Transcodes a file using FFmpeg and returns the output as a downloadable URL and its human-readable size.
 *
 * This function handles the file conversion process using FFmpeg, including writing the file to FFmpeg's virtual file system,
 * executing the FFmpeg command, and cleaning up temporary files after the conversion.
 *
 * @param {FFmpeg | null} ffmpeg - The initialized FFmpeg instance.
 * @param {File} file - The input file to be transcoded.
 * @param {string} outputFileFullName - The name of the output file, including its extension.
 * @param {string[]} [cmdOptions] - Optional array of additional FFmpeg command-line options.
 * @returns {Promise<{ url: string; fileSize: string }>} A promise resolving to an object containing:
 *   - `url` (string): A downloadable URL for the transcoded file.
 *   - `fileSize` (string): The size of the transcoded file in a human-readable format.
 * @throws {Error} If FFmpeg is not loaded, or if any error occurs during the transcoding process.
 */

export const transcode = async (
	ffmpeg: FFmpeg | null,
	file: File,
	outputFileFullName: string,
	cmdOptions?: string[],
): Promise<{ url: string; fileSize: string }> => {
	const inputFileFullName = file.name;

	if (!ffmpeg) {
		return errorHandler(
			new Error("FFmpeg not loaded"),
			"Error converting file",
		);
	}

	try {
		// Write the file to FFmpeg's virtual file system
		await ffmpeg.writeFile(inputFileFullName, await fetchFile(file));

		const { mimeType } = extractMimeType(outputFileFullName);

		// Ensure cmdOptions is an array or defaults to empty array
		const safeCmdOptions = Array.isArray(cmdOptions) ? cmdOptions : [];

		// FFmpeg command setup
		const ffmpegCmd = [
			"-i",
			inputFileFullName,
			outputFileFullName,
			...safeCmdOptions,
		];

		// Execute FFmpeg command
		await ffmpeg.exec(ffmpegCmd);

		// Read the output file
		const data = await ffmpeg.readFile(outputFileFullName);

		// Create a Blob from the data and generate a URL
		const blob = new Blob([data], { type: mimeType });

		// blobsize
		const size = blob.size;

		//convert blob size to human-readable form
		const humanReadableSize = formatFileSize(size);

		// creates a URL to reference the blob
		const url = URL.createObjectURL(blob);

		// Clean FFmpeg virtual file system by deleting temporary files
		await Promise.all([
			ffmpeg.deleteFile(inputFileFullName),
			ffmpeg.deleteFile(outputFileFullName),
		]);

		return { url, fileSize: humanReadableSize };
	} catch (error) {
		return errorHandler(error, "Error converting file");
	}
};
