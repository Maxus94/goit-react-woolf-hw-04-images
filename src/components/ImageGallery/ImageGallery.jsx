import { useEffect } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ pictures, toggleModal, handleModalImage }) => {
  useEffect(() => {
    window.scrollBy({
      top: 260 * 3 + 48,
      behavior: 'smooth',
    });
  }, [pictures]);

  return (
    <ul className={css.gallery}>
      {pictures.map(picture => (
        <li key={picture.id} className={css.galleryItem}>
          <ImageGalleryItem
            picture={picture}
            toggleModal={toggleModal}
            handleModalImage={handleModalImage}
          />
        </li>
      ))}
    </ul>
  );
};
