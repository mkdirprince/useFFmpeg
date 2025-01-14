import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { useCallback, useRef, useState } from "react";
import { load } from "../lib/ffmpegSetup";
import { errorHandler } from "../utils/errorHandler";
import { transcode } from "../utils/transcode";

export const useFFmpeg = () => {
	const [loaded, SetLoaded] = useState<boolean>(false);

	const ffmpegRef = useRef<FFmpeg | null>(null);

	const loadFFmpeg = useCallback(async (baseUrl?: string, mt?: boolean) => {
		try {
			const ffmpegResponse: FFmpeg = await load(baseUrl, mt);
			ffmpegRef.current = ffmpegResponse;
			SetLoaded(true);
		} catch (error) {
			errorHandler(error, "Error loading FFmpeg");
		}
	}, []);

	const handleTranscode = useCallback(
		async (file: File, outputFileFullName: string, cmdOptions?: string[]) => {
			if (!loaded) {
				throw new Error("FFmpeg is not loaded");
			}

			return await transcode(
				ffmpegRef.current,
				file,
				outputFileFullName,
				cmdOptions,
			);
		},
		[loaded],
	);

	return {
		loadFFmpeg,
		loaded,
		transcode: handleTranscode,
	};
};
