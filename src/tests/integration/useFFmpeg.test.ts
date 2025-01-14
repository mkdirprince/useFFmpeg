import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useFFmpeg } from "../../hooks/useFFmpeg";
import * as ffmpegSetup from "../../lib/ffmpegSetup";
import * as transcodeUtil from "../../utils/transcode";
import testHelper from "../testHelper";

// Mock the external modules
vi.mock("../../lib/ffmpegSetup", () => ({
  load: vi.fn(), // Ensure load is correctly mocked here
}));

vi.mock("../../utils/transcode", () => ({
  transcode: vi.fn(),
}));

// Mock successful FFmpeg loading
const mockFFmpeg = {
  load: vi.fn(),
  writeFile: vi.fn(),
  readFile: vi.fn(),
  deleteFile: vi.fn(),
  exec: vi.fn(),
};

describe("useFFmpeg Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle transcoding when FFmpeg is loaded", async () => {
    const { result } = renderHook(() => useFFmpeg());

    expect(result.current.loaded).toBe(false);
    expect(typeof result.current.loadFFmpeg).toBe("function");
    expect(typeof result.current.transcode).toBe("function");
  });

  it("should handle successful FFmpeg loading", async () => {
    (ffmpegSetup.load as any).mockResolvedValue(mockFFmpeg);

    const { result } = renderHook(() => useFFmpeg());

    await act(async () => {
      await result.current.loadFFmpeg();
    });

    expect(result.current.loaded).toBe(true);
    expect(ffmpegSetup.load).toHaveBeenCalled();
  });
  it("should handle FFmpeg loading failure", async () => {
    // Mock FFmpeg loading failure
    (ffmpegSetup.load as any).mockRejectedValue(new Error("Loading failed"));

    const { result } = renderHook(() => useFFmpeg());

    await expect(result.current.loadFFmpeg()).rejects.toThrow(
      "Error loading FFmpeg: Loading failed"
    );

    expect(result.current.loaded).toBe(false);
  });
  it("should handle transcoding when FFmpeg is loaded", async () => {
    (ffmpegSetup.load as any).mockResolvedValue(mockFFmpeg);
    (transcodeUtil.transcode as any).mockResolvedValue({
      url: "blob:test",
      fileSize: "1 MB",
    });

    const { result } = renderHook(() => useFFmpeg());

    // Load FFmpeg first
    await act(async () => {
      await result.current.loadFFmpeg();
    });

    const testFile = testHelper.createTestFile("test.mp4", "video/mp4");
    const response = await result.current.transcode(testFile, "output.webm", [
      "-c:v",
      "vp8",
    ]);

    expect(response).toEqual({
      url: "blob:test",
      fileSize: "1 MB",
    });
    expect(transcodeUtil.transcode).toHaveBeenCalledWith(
      mockFFmpeg,
      testFile,
      "output.webm",
      ["-c:v", "vp8"]
    );
  });
  it("should prevent transcoding when FFmpeg is not loaded", async () => {
    const { result } = renderHook(() => useFFmpeg());
    const testFile = testHelper.createTestFile("test.mp4", "video/mp4");

    await expect(
      result.current.transcode(testFile, "output.webm")
    ).rejects.toThrow("FFmpeg is not loaded");
  });

  it("should handle transcoding with custom base URL", async () => {
    const mockFFmpeg = {
      load: vi.fn(),
      writeFile: vi.fn(),
      readFile: vi.fn(),
      deleteFile: vi.fn(),
      exec: vi.fn(),
    };

    (ffmpegSetup.load as any).mockResolvedValue(mockFFmpeg);

    const { result } = renderHook(() => useFFmpeg());
    const customBaseUrl = "https://custom.cdn.com/ffmpeg";

    await act(async () => {
      await result.current.loadFFmpeg(customBaseUrl);
    });

    expect(ffmpegSetup.load).toHaveBeenCalledWith(customBaseUrl, undefined);
  });
  it("should handle multithreading option", async () => {
    const mockFFmpeg = {
      load: vi.fn(),
      writeFile: vi.fn(),
      readFile: vi.fn(),
      deleteFile: vi.fn(),
      exec: vi.fn(),
    };

    (ffmpegSetup.load as any).mockResolvedValue(mockFFmpeg);

    const { result } = renderHook(() => useFFmpeg());

    await act(async () => {
      await result.current.loadFFmpeg(undefined, true);
    });

    expect(ffmpegSetup.load).toHaveBeenCalledWith(undefined, true);
  });
});
