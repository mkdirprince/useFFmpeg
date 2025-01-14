import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { errorHandler } from "../utils/errorHandler";

/**
 * Loads the FFmpeg library with optional multi-threading support.
 *
 * This function initializes a new instance of FFmpeg, sets up event listeners for logging,
 * and loads the necessary core and WASM files from a given URL. If multi-threading is enabled,
 * it will load an additional worker script. If multi-threading (`mt`) is set to true, a base URL must
 * be provided for the FFmpeg core and worker scripts.
 *
 * @param {string} [baseUrl="https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm"] - The base URL to load the FFmpeg core and WASM files from.
 * @param {boolean} [mt=false] - A flag to indicate if multi-threading should be enabled. If true, a worker script will be loaded. If multi-threading is enabled, `baseUrl` must be provided.
 *
 * @returns {Promise<FFmpeg>} - A Promise that resolves to the initialized FFmpeg instance.
 *
 * @throws {Error} - Throws an error if the FFmpeg core or WASM files fail to load or if an error occurs during FFmpeg operations.
 *
 * @example
 * const ffmpeg = await load()
 * // By default, the base URL is provided for single-threaded transcoding. To use multi-threading, a base URL MUST be provided and `mt` should be set to true.
 * // You can now use the `ffmpeg` instance for transcoding tasks.
 */

export const load = async (
  baseUrl: string = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm",
  mt: boolean = false
): Promise<FFmpeg> => {
  // inittialize a new ffmpeg instance
  const ffmpeg = new FFmpeg();

  // listen to log and print it in the console
  ffmpeg.on("log", ({ message, type }) => {
    console.log(message);

    if (type === "error" || message.toLowerCase().includes("error")) {
      errorHandler(new Error(message), "Error while transcoding file");
    }
  });

  const singleThred = {
    coreURL: await toBlobURL(`${baseUrl}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseUrl}/ffmpeg-core.wasm`, "application/wasm"),
  };

  try {
    if (mt) {
      await ffmpeg.load({
        ...singleThred,
        workerURL: await toBlobURL(
          `${baseUrl}/ffmpeg-core.worker.js`,
          "text/javascript"
        ),
      });
    } else {
      await ffmpeg.load(singleThred);
    }
  } catch (error) {
    errorHandler(error, `Error loading FFmpeg core and WASM files, ${baseUrl}`);
  }

  return ffmpeg;
};
