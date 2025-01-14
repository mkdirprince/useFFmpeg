import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { errorHandler } from "./errorHandler";
import { extractMimeType } from "./extractMimeType";
import { formatFileSize } from "./formatFileSize";

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

		// create a downloadble URL
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
