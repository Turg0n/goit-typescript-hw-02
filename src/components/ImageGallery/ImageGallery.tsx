import ImageCard from "../ImageCard/ImageCard";
import css from "../ImageGallery/ImageGallery.module.css";
import React from "react";
import { ImageData } from "../App/App.types";

interface ImageGalleryProps {
  Images: ImageData[];
  onClickOnImage: (imageUrl: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ Images, onClickOnImage }) => {
  return (
    <ul className={css.ImageGalleryUl}>
      {Images.map((image) => (
        <li className={css.ImageCardItem} key={image.id}>
          <ImageCard
            key={image.id} 
            smallImage={image.urls.small}
            alt_description={image.alt_description}
            onClickOnImage={onClickOnImage}
            bigImage={image.urls.regular}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;