export interface UseFFmpeg {
	loaded: boolean;
	loadFfmpeg: (baseUrl: string, mt: boolean) => Promise<void>;
}
