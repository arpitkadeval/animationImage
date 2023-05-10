import React, { useState, useRef } from "react";
import "./BackgroundRemover.css";
import ImageUpload from "../../common/ImageUpload";

function BackgroundRemover() {
  const [imageUrl, setImageUrl] = useState("");
  const [backgroundRemovedUrl, setBackgroundRemovedUrl] = useState("");
  const [convertedUrl, setConvertedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
  };

  const handleBackgroundRemove = () => {
    setIsLoading(true);
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const threshold = 50;

      for (let i = 0; i < data.length; i += 4) {
        const redDiff = Math.abs(data[i] - data[0]);
        const greenDiff = Math.abs(data[i + 1] - data[1]);
        const blueDiff = Math.abs(data[i + 2] - data[2]);
        const alpha = data[i + 3];

        if (
          redDiff < threshold &&
          greenDiff < threshold &&
          blueDiff < threshold &&
          alpha > 0
        ) {
          data[i + 3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      setBackgroundRemovedUrl(canvas.toDataURL());
      setIsLoading(false);
    };
  };
  const handleConvertToHDR = () => {
    setIsLoading(true);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Find the maximum value of the pixels in the image
      let maxPixelValue = 0;
      for (let i = 0; i < data.length; i += 4) {
        const luminance =
          0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
        if (luminance > maxPixelValue) {
          maxPixelValue = luminance;
        }
      }

      // Apply HDR conversion algorithm to each pixel
      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        const alpha = data[i + 3];

        // Calculate the luminance value for the pixel
        const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

        // Apply tone mapping to adjust the contrast and color
        const toneMapped =
          (luminance / (luminance + 1)) *
          (1 + luminance / (maxPixelValue * maxPixelValue));

        // Convert the tone-mapped value back to RGB
        const convertedRed = (red / luminance) * toneMapped;
        const convertedGreen = (green / luminance) * toneMapped;
        const convertedBlue = (blue / luminance) * toneMapped;

        // Update the pixel values in the image data
        data[i] = convertedRed;
        data[i + 1] = convertedGreen;
        data[i + 2] = convertedBlue;
        data[i + 3] = alpha;
      }

      // Update the canvas with the new image data
      ctx.putImageData(imageData, 0, 0);
      setConvertedUrl(canvas.toDataURL());
      setIsLoading(false);
    };
  };
  return (
    <div className="background-remover-container">
      <div className="background-remover-heading">
        <h2 className="">Background Remover</h2>
        <button
          className="background-remover-button"
          disabled={!imageUrl || isLoading}
          onClick={handleBackgroundRemove}
        >
          {isLoading ? "Loading..." : "Background Remove"}
        </button>
        <button
          className="background-remover-button"
          disabled={!imageUrl || isLoading}
          onClick={handleConvertToHDR}
        >
          {isLoading ? "Loading..." : "Convert to HDR"}
        </button>
      </div>

      <ImageUpload
        label="Drag and drop images here or click to select"
        accept="image/*"
        multiple={false}
        disabled={false}
        onChange={handleImageChange}
      />

      <div className="background-remover-images">
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
      <div className="image-list">
        {backgroundRemovedUrl && (
          <div className="image-item">
            <img
              src={backgroundRemovedUrl}
              alt="BackgroundRemovedImage"
              className="background-remover-image"
            />
          </div>
        )}
        {convertedUrl && (
          <div className="image-item">
            <img
              src={convertedUrl}
              alt="ConvertedImage"
              className="background-remover-image"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BackgroundRemover;
