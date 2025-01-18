import React from "react";
import { createContext, useContext } from "react";
import { useFFmpeg as useFFmpegBase } from "../hooks/useFFmpeg";
import type { UseFFmpeg } from "../types/useFFmpeg";

/**
 * Context to provide the FFmpeg hook to the application.
 * @private
 */
const FFmpegContext = createContext<UseFFmpeg | null>(null);

/**
 * FFmpegContextProvider is a React component that wraps the application and provides
 * the FFmpeg hook using context. This provider must be placed higher in the component tree
 * where the `useFFmpeg` hook needs access to FFmpeg functionality.
 *
 * @param {React.PropsWithChildren} props - The props to be passed to the children components.
 * @returns {React.ReactNode} - The wrapped children components with the FFmpeg context provided.
 *
 * @example
 * <FFmpegContextProvider>
 *   <YourComponent />
 * </FFmpegContextProvider>
 */
export const FFmpegContextProvider = (props: React.PropsWithChildren) => {
  const ffmpeg = useFFmpegBase();

  return (
    <FFmpegContext.Provider value={ffmpeg}>
      {props.children}
    </FFmpegContext.Provider>
  );
};

/**
 * Custom hook to access the FFmpeg context value.
 * If the context is not available (i.e., the hook is called outside the provider),
 * it will fallback to using the base `useFFmpeg` hook directly.
 *
 * @returns {UseFFmpeg} - The FFmpeg hook, providing FFmpeg functionality and methods.
 *
 * @throws {Error} - Throws an error if the hook is used outside of the FFmpegContextProvider
 *   and the fallback logic is not invoked (since the base hook will be used in that case).
 *
 * @example
 * const ffmpeg = useFFmpeg();
 * ffmpeg.load(); // Example usage
 */
export const useFFmpeg = () => {
  const contextValue = useContext(FFmpegContext);

  if (contextValue) {
    return contextValue;
  }

  return useFFmpegBase();
};
