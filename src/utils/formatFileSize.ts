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
