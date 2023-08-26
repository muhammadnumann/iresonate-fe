import React from "react";
import { Image as AntImage } from "antd";
import { ImageProps } from "rc-image/lib/Image";

interface WSImageProps  {
imagePreview?:boolean
}

export const ImageGroup = AntImage.PreviewGroup

export const WSImage: React.FC<ImageProps & WSImageProps> = ({
  imagePreview = false,
   ...props
  }) => {
  return (
  <AntImage {...props}
  preview={imagePreview}
   />
   )
};
