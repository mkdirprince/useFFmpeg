const createBlobOfSize = (sizeInByte: number) => {
	const byte = new Uint8Array(sizeInByte);
	return new Blob([byte]);
};

const createTestFile = (filename: string, mimeType: string) =>
	new File([new ArrayBuffer(8)], filename, {
		type: mimeType,
	});

export default {
	createBlobOfSize,
	createTestFile,
};
