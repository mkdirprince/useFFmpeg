export interface UseFFmpeg {
	loaded: boolean;
	loadFfmpeg: (baseUrl: string, mt: boolean) => Promise<void>;
	transcode: (
		file: File,
		outputFileFullName: string,
		cmdOptions?: string[],
	) => Promise<{ url: string; filesize: number }>;
}
