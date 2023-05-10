import React, { useState, useRef } from "react";
import "./ImageUpload.css";

function ImageUpload(props) {
  const [images, setImages] = useState([]);
  const [dragging, setDragging] = useState(false);
  const dropzoneRef = useRef();
  function handleDrag(e) {
    e.preventDefault();
    if (e.type === "dragover") {
      setDragging(true);
    } else {
      setDragging(false);
      const fileList = Array.from(e.dataTransfer.files);
      const uploadedImages = fileList.filter((file) =>
        file.type.startsWith("image/"),
      );
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
    }
  }

  function handleSelect(e) {
    const fileList = Array.from(e.target.files);
    const uploadedImages = fileList.filter((file) =>
      file.type.startsWith("image/"),
    );
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  }

  function handleKeyDown(e) {
    if (e.keyCode === 32) {
      dropzoneRef.current.click();
    }
  }

  function renderDropzone() {
    const { label, accept, multiple, disabled, ...otherProps } = props;
    return (
      <div
        className={`dropzone ${dragging ? "dragging" : ""}`}
        {...otherProps}
        onDrop={handleDrag}
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onClick={() => dropzoneRef.current.click()}
        onKeyDown={handleKeyDown}
      >
        <p>{label}</p>
        <input
          type="file"
          ref={dropzoneRef}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleSelect}
          className="file-input"
        />
      </div>
    );
  }

  function removeImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  function ImageList(props) {
    const { images } = props;
    return (
      <div className="image-list">
        {images.map((image, index) => (
          <div className="image-item" key={index}>
            <button
              className="remove-button"
              onClick={() => removeImage(index)}
            >
              X
            </button>
            <img src={URL.createObjectURL(image)} alt={image.name} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {renderDropzone()}
      {images.length > 0 && <ImageList images={images} />}
    </div>
  );
}

ImageUpload.defaultProps = {
  label: "Drag and drop your images here or click to select",
  accept: "image/*",
  multiple: true,
  disabled: false,
};

export default ImageUpload;
