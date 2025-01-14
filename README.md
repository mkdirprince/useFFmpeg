# useFFmpeg - React Hook for File Transcoding with FFmpeg

`useFFmpeg` is a custom React hook designed to facilitate loading and transcoding media files using FFmpeg. This hook provides an easy way to load the FFmpeg library, manage the loading state, and transcode files into different formats, all from within a React application.

## Features

- **Load FFmpeg**: Load the FFmpeg library and prepare it for file transcoding.
- **Transcode Files**: Convert media files from one format to another using FFmpeg.
- **File Format Support**: Transcode a variety of video, audio, image, text, and document formats.

## Supported MIME Types

The `useFFmpeg` hook supports a broad range of MIME types, allowing transcoding of video, audio, text, images, and documents. Below are the supported formats:

### Video Formats

- `mp4`: `video/mp4`
- `webm`: `video/webm`
- `mkv`: `video/x-matroska`
- `mov`: `video/quicktime`
- `avi`: `video/x-msvideo`
- `flv`: `video/x-flv`
- `ts`: `video/MP2T`
- `ogv`: `video/ogg`
- `asf`: `video/x-ms-asf`
- `3gp`: `video/3gpp`
- `rm`: `application/vnd.rn-realmedia`

### Audio Formats

- `mp3`: `audio/mpeg`
- `wav`: `audio/x-wav`
- `aac`: `audio/aac`
- `flac`: `audio/flac`
- `ogg`: `audio/ogg`
- `m4a`: `audio/mp4`
- `wma`: `audio/x-ms-wma`
- `amr`: `audio/amr`
- `opus`: `audio/opus`

### Text Formats

- `plain`: `text/plain`
- `html`: `text/html`
- `css`: `text/css`
- `javascript`: `application/javascript`
- `json`: `application/json`
- `xml`: `application/xml`
- `csv`: `text/csv`
- `markdown`: `text/markdown`
- `yaml`: `application/x-yaml`
- `pdf`: `application/pdf`
- `rtf`: `application/rtf`

### Image Formats

- `png`: `image/png`
- `jpeg`/`jpg`: `image/jpeg`
- `gif`: `image/gif`
- `svg`: `image/svg+xml`
- `webp`: `image/webp`
- `bmp`: `image/bmp`
- `tiff`: `image/tiff`
- `ico`: `image/x-icon`

### Document Formats

- `pdf`: `application/pdf`
- `doc`: `application/msword`
- `docx`: `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- `xls`: `application/vnd.ms-excel`
- `xlsx`: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- `ppt`: `application/vnd.ms-powerpoint`
- `pptx`: `application/vnd.openxmlformats-officedocument.presentationml.presentation`

## Installation

To use the `useFFmpeg` hook, you'll need to install it along with the `@ffmpeg/utils` package, which is a necessary dependency for working with FFmpeg.

Install `useFFmpeg` from npm:

```bash
npm install use-ffmpeg
```

Then, install the @ffmpeg/util package:

```bash
npm install @ffmpeg/util
npm install @ffmpeg/ffmpeg
```

## Usage

### Basic Usage (No Custom URL)

By default, the useFFmpeg hook will load FFmpeg from a CDN (Content Delivery Network) that is automatically set. In this case, you don't need to specify a custom URL.

```tsx
import { useFFmpeg } from "use-ffmpeg";

const MyComponent = () => {
  const { loadFFmpeg, loaded, transcode } = useFFmpeg();

  useEffect(() => {
    loadFFmpeg(); // This will use the default FFmpeg URL.
  }, []);

  if (!loaded) {
    return <div>Loading FFmpeg...</div>;
  }

  return <div>FFmpeg is ready!</div>;
};
```

### Optional Custom URL

If you wish to load FFmpeg from a custom URL, you can pass the URL as a parameter to loadFFmpeg. This can be useful if you are hosting your own FFmpeg build or need to use a specific version of the library.

```tsx
import { useFFmpeg } from "use-ffmpeg";

const MyComponent = () => {
  const { loadFFmpeg, loaded, transcode } = useFFmpeg();

  useEffect(() => {
    loadFFmpeg("https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm"); // Custom URL for FFmpeg.
  }, []);

  if (!loaded) {
    return <div>Loading FFmpeg...</div>;
  }

  return <div>FFmpeg is ready!</div>;
};
```

## Multithreading Support

To enable FFmpeg with multithreading, you need to set the mt: true option in the loadFFmpeg function. Multithreading support is available in a specific version of FFmpeg (version 0.12.6 and above), which is optimized for better performance on multicore systems.

```tsx
import { useFFmpeg } from "use-ffmpeg";

const MyComponent = () => {
  const { loadFFmpeg, loaded, transcode } = useFFmpeg();

  useEffect(() => {
    // Load FFmpeg with multithreading enabled
    loadFFmpeg("https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm", true);
  }, []);

  if (!loaded) {
    return <div>Loading FFmpeg with multithreading...</div>;
  }

  return <div>FFmpeg with multithreading is ready!</div>;
};
```

## FFmpeg Multithreading and Vite Compatibility

This will load the **multithreaded version** of FFmpeg. Please note that **FFmpeg version 0.12.6** is the version that supports multithreading.

### Important Notes on Multithreading

The current supported version for multithreaded FFmpeg is 0.12.6, available at:
URL: https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm
When using multithreading, make sure to use the correct version (@ffmpeg/core-mt) in the URL. The -mt indicates that the build supports multithreading.
The mt: true option is required to enable multithreaded transcoding.
For more information and the latest builds, you can visit the official FFmpeg WASM page.

## For Vite Users:

If you are using **Vite**, make sure to use the **ESM version** of the URL for compatibility.

- **Incorrect URL (for non-Vite users):**
  https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd

- **Correct URL (for Vite users):**
  https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm

> **Caution:**  
> If you are a Vite user, you should use the **ESM version** of FFmpeg to ensure compatibility.

## Transcoding Files

Once FFmpeg is loaded, you can use the transcode function to convert a file to another format. The transcode function accepts the following parameters:

file: The file to be transcoded (e.g., a video or audio file).
outputFileName: The desired name for the transcoded file.
options (optional): An array of FFmpeg command options to customize the transcoding behavior.
The transcode function returns an object containing two key values:

URL: A URL that references the transcoded file, which can be used to display or download the file.
File Size: The human-readable file size of the transcoded file, such as 1.2 MB or 500 KB.

### Basic Transcoding Example

Here’s a basic example of how to use the transcode function. It converts a file to a specified output format and provides both the URL and file size for further use:

```tsx
const handleFileUpload = async (file: File) => {
  try {
    const outputFileName = "output.mp4"; // Specify output file name
    const { fileUrl, fileSize } = await transcode(file, outputFileName); // Transcode the file

    // Now you can use the URL to download or display the transcoded file
    console.log("Transcoded file URL:", fileUrl);
    console.log("Transcoded file size:", fileSize);

    // Example: Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = outputFileName;
    downloadLink.innerText = `Download Transcoded File (${fileSize})`;
    document.body.appendChild(downloadLink);
  } catch (error) {
    console.error("Error transcoding file:", error);
  }
};
```

### Key Points

Transcoded File URL: This is a temporary URL that references the transcoded file as a blob. You can use this URL for displaying or downloading the file.
Human-readable File Size: The file size is provided in a human-readable format, making it easier for users to understand the output size (e.g., 1.2 MB).
This allows users to transcode files and easily work with the resulting transcoded content, whether for display, download, or further processing.

## Custom FFmpeg Command Options

You can pass an array of strings with custom FFmpeg command options for more control over the transcoding process. For example, if you want to change the resolution of a video or apply specific audio settings, you can use the following command options.

Here is an example of an FFmpeg command that resizes a video to 1280x720 and converts it to the mp4 format:

### FFmpeg Command Example:

```bash
ffmpeg -i input.mp4 -vf "scale=1280:720" -acodec aac -vcodec libx264 output.mp4

```

his command:

Takes input.mp4 as the input file (-i input.mp4).
Applies a video filter to resize it to 1280x720 (-vf "scale=1280:720").
Sets the audio codec to aac (-acodec aac).
Sets the video codec to libx264 (-vcodec libx264).
Outputs the result to output.mp4.

### Using Custom Command Options in the Hook:

You can pass this FFmpeg command as an array of options:

```tsx
const handleFileUpload = async (file: File) => {
  try {
    const outputFileName = "output.mp4";
    const options = [
      "-vf",
      "scale=1280:720", // Apply video resizing
      "-acodec",
      "aac", // Set audio codec to AAC
      "-vcodec",
      "libx264", // Set video codec to H.264
    ];

    const transcodedFile = await transcode(file, outputFileName, options); // Transcode the file with custom options
    // Do something with the transcoded file (e.g., download, display, etc.)
  } catch (error) {
    console.error("Error transcoding file:", error);
  }
};
```

## Available Methods

- **`loadFFmpeg(baseUrl?: string, mt?: boolean): Promise<void>`**

  - **Purpose**: Loads FFmpeg and sets it up for transcoding.
  - **Parameters**:
    - `baseUrl` (optional): The URL to load FFmpeg from.
    - `mt` (optional): Boolean flag to enable multithreading.

- **`transcode(file: File, outputFileFullName: string, cmdOptions?: string[]): Promise<Buffer>`**
  - **Purpose**: Transcodes a file to a specified output format.
  - **Parameters**:
    - `file`: The file to be transcoded.
    - `outputFileFullName`: The full name of the output file (including extension).
    - `cmdOptions` (optional): Custom FFmpeg command-line options for transcoding.

## Error Handling

The hook includes basic error handling during FFmpeg loading and transcoding. If an error occurs, it's passed to a custom errorHandler function, which logs the error and provides feedback.

```tsx
import { useFFmpeg } from "use-ffmpeg";

const VideoTranscoder = () => {
  const { loadFFmpeg, loaded, transcode } = useFFmpeg();
  const [file, setFile] = useState(null);

  useEffect(() => {
    loadFFmpeg(); // Default FFmpeg URL
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTranscode = async () => {
    if (file) {
      try {
        const outputFileName = "converted.mp4";
        const transcodedData = await transcode(file, outputFileName);
        // Do something with transcoded data, like saving or displaying it
      } catch (error) {
        console.error("Transcoding failed:", error);
      }
    }
  };

  if (!loaded) return <div>Loading FFmpeg...</div>;

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleTranscode}>Transcode</button>
    </div>
  );
};
```

## Contributing

Feel free to fork the repository, submit issues, and contribute improvements. If you want to suggest any new features or need help with the hook, please open an issue.

## License

This package is open source and available under the [MIT](https://github.com/expressjs/morgan/blob/master/LICENSE) License.
