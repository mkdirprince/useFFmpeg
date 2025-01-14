import { mimeTypesObject } from "../constants";

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
