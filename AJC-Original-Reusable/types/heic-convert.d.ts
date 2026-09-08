declare module "heic-convert" {
  type HeicConversionOptions = {
    buffer: ArrayBufferLike | Buffer;
    format: "JPEG" | "PNG";
    quality?: number;
  };

  function convert(options: HeicConversionOptions): Promise<ArrayBuffer>;

  export = convert;
}
