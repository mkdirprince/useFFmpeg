export const mimeTypes = {
	video: {
		mp4: "video/mp4",
		webm: "video/webm",
		mkv: "video/x-matroska",
		mov: "video/quicktime",
		avi: "video/x-msvideo",
		flv: "video/x-flv",
		ts: "video/MP2T",
		ogv: "video/ogg",
		asf: "video/x-ms-asf",
		"3gp": "video/3gpp",
		rm: "application/vnd.rn-realmedia",
	},
	audio: {
		mp3: "audio/mpeg",
		wav: "audio/x-wav",
		aac: "audio/aac",
		flac: "audio/flac",
		ogg: "audio/ogg",
		m4a: "audio/mp4",
		wma: "audio/x-ms-wma",
		amr: "audio/amr",
		opus: "audio/opus",
	},
	image: {
		png: "image/png",
		jpeg: "image/jpeg",
		jpg: "image/jpeg",
		gif: "image/gif",
		svg: "image/svg+xml",
		webp: "image/webp",
		bmp: "image/bmp",
		tiff: "image/tiff",
		ico: "image/x-icon",
	},
} as const;

export const mimeTypesObject = {
	...mimeTypes.audio,
	...mimeTypes.image,
	...mimeTypes.video,
} as const;
