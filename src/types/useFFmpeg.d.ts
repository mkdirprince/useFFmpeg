export interface UseFFmpeg {
  loaded: boolean;
  loadFFmpeg: (baseUrl: string, mt: boolean) => Promise<void>;
  transcode: (
    file: File,
    outputFileFullName: string,
    cmdOptions?: string[]
  ) => Promise<{ url: string; fileSize: string }>;
}
