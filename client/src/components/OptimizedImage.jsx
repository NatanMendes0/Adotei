import { useState } from "react";

const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  loading = "lazy",
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Função para gerar o caminho do WebP
  const getWebPPath = (originalPath) => {
    const lastDot = originalPath.lastIndexOf(".");
    if (lastDot === -1) return originalPath;
    return originalPath.substring(0, lastDot) + ".webp";
  };

  // Verifica se o navegador suporta WebP
  const supportsWebP = () => {
    const elem = document.createElement("canvas");
    if (elem.getContext && elem.getContext("2d")) {
      return elem.toDataURL("image/webp").indexOf("data:image/webp") === 0;
    }
    return false;
  };

  const webpSrc = getWebPPath(src);

  return (
    <div className={`relative ${className || ""}`}>
      {isLoading && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      <picture>
        {supportsWebP() && <source srcSet={webpSrc} type="image/webp" />}
        <img
          src={src}
          alt={alt}
          className={`${className || ""} ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          width={width}
          height={height}
          loading={loading}
          onLoad={() => setIsLoading(false)}
          {...props}
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;
