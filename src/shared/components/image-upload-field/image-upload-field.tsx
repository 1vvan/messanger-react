import React, { useEffect, useRef, useState } from "react";
import styles from "./image-upload-field.module.scss";
import { BASE_API_URL } from "@/shared/constants/api-url";

interface ImageUploadFieldProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  profilePictureUrl?: string | null;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  handleFileChange,
  profilePictureUrl
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (profilePictureUrl) {
      setPreviewUrl(`${BASE_API_URL}${profilePictureUrl}`);
    }
  }, [profilePictureUrl]);

  const handleLocalFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
    handleFileChange(event);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles["image-upload-field"]}>
      <div className={styles["image-upload-preview"]}>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className={styles["image-upload-preview-image"]}
          />
        ) : (
          <div className={styles["image-upload-placeholder"]}>
            No image selected
          </div>
        )}
      </div>
      <div className={styles["image-upload-custom-input"]} onClick={handleClick}>
        {previewUrl ? "Change photo" : "Click to select a photo"}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleLocalFileChange}
        className={styles["image-upload-hidden-input"]}
      />
    </div>
  );
};

export default ImageUploadField;
