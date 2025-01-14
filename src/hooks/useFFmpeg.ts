import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { useCallback, useRef, useState } from "react";
import { load } from "../lib/ffmpegSetup";
import { errorHandler } from "../utils/errorHandler";
import { transcode } from "../utils/transcode";
import { UseFFmpeg } from "../types/useFFmpeg";

/**
 * Custom React hook for loading FFmpeg and performing file transcoding operations.
 *
 * Provides methods for initializing FFmpeg and transcoding files using FFmpeg once it is loaded.
 *
 * @returns {UseFFmpeg} An object containing:
 *   - `loaded` (boolean): Indicates whether FFmpeg is loaded and ready to use.
 *   - `loadFFmpeg(baseUrl?: string, mt?: boolean): Promise<void>`: A function to load FFmpeg.
 *   - `transcode(file: File, outputFileFullName: string, cmdOptions?: string[]): Promise<Buffer>`: A function to transcode files using FFmpeg.
 */

export const useFFmpeg = (): UseFFmpeg => {
  const [loaded, SetLoaded] = useState<boolean>(false);

  const ffmpegRef = useRef<FFmpeg | null>(null);

  /**
   * Loads the FFmpeg library and sets it up for use.
   *
   * This function sets the `loaded` state to `false` while loading, and to `true` once the process completes successfully.
   *
   * @param {string} [baseUrl] - The optional base URL to load FFmpeg from.
   * @param {boolean} [mt] - Optional flag for enabling multithreading in FFmpeg.
   * @returns {Promise<void>} Resolves when FFmpeg is successfully loaded.
   * @throws {Error} If FFmpeg fails to load, the error is passed to `errorHandler`.
   */

  const loadFFmpeg = useCallback(async (baseUrl?: string, mt?: boolean) => {
    try {
      const ffmpegResponse: FFmpeg = await load(baseUrl, mt);
      ffmpegRef.current = ffmpegResponse;
      SetLoaded(true);
    } catch (error) {
      errorHandler(error, "Error loading FFmpeg");
    }
  }, []);

  /**
   * Transcodes a file using the loaded FFmpeg instance.
   *
   * This function processes the given input file and generates an output file with the specified name.
   * Additional FFmpeg command-line options can be provided for customization.
   *
   * @param {File} file - The input file to transcode.
   * @param {string} outputFileFullName - The full name of the transcoded output file.
   * @param {string[]} [cmdOptions] - Optional array of FFmpeg command-line options.
   * @returns {Promise<Buffer>} Resolves with the transcoded file data as a buffer.
   * @throws {Error} If FFmpeg is not loaded or if an error occurs during transcoding.
   */

  const handleTranscode = useCallback(
    async (file: File, outputFileFullName: string, cmdOptions?: string[]) => {
      if (!loaded) {
        throw new Error("FFmpeg is not loaded");
      }

      return await transcode(
        ffmpegRef.current,
        file,
        outputFileFullName,
        cmdOptions
      );
    },
    [loaded]
  );

  return {
    loadFFmpeg,
    loaded,
    transcode: handleTranscode,
  };
};
