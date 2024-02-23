import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { getDataAPI } from 'api/gallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import css from './App.module.css';

const PER_PAGE = 12;

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [buttonIsShown, setButtonIsShown] = useState(false);
  const [isShownModal, setIsShownModal] = useState(false);
  const [errorIsShown, setErrorIsShown] = useState(false);
  const [modalImage, setModalImage] = useState(false);

  const handleModalImage = picture => {
    setModalImage(picture);
    toggleModal();
  };

  const toggleModal = () => {
    setIsShownModal(prev => !prev);
  };

  useEffect(() => {
    const getData = async searchString => {
      if (searchString) {
        try {
          setLoading(true);
          const data = await getDataAPI(searchString, page, PER_PAGE);
          setPictures(prev => (prev ? [...prev, ...data.hits] : data.hits));
          setButtonIsShown(page < Math.ceil(data.totalHits / PER_PAGE));
        } catch (error) {
          setErrorIsShown(true);
        } finally {
          setLoading(false);
        }
      }
    };
    getData(searchText, page);
  }, [searchText, page]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleSubmit = searchString => {
    if (searchString === searchText) {
      alert('Please, enter new text for search');
      return;
    }
    if (!searchString) {
      alert('Enter some text to search');
    }

    setPictures([]);
    setLoading(false);
    setPage(1);
    setButtonIsShown(false);
    setIsShownModal(false);
    setErrorIsShown(false);
    setModalImage(false);
    setSearchText(searchString);
  };

  return (
    <div>
      <Searchbar handleSubmit={handleSubmit} />
      {pictures && (
        <ImageGallery
          pictures={pictures}
          toggleModal={toggleModal}
          handleModalImage={handleModalImage}
        />
      )}
      {loading && <Loader />}
      {errorIsShown && <h2 className={css.errorMessage}>Error of loading</h2>}
      {buttonIsShown && !loading && <Button handleLoadMore={handleLoadMore} />}
      {!errorIsShown && !loading && pictures.length === 0 && (
        <h2 className={css.message}>Nothing was found</h2>
      )}
      {!errorIsShown && !loading && !buttonIsShown && pictures.length > 0 && (
        <h2 className={css.message}>End of collection was reached</h2>
      )}
      {isShownModal && (
        <Modal toggleModal={toggleModal}>
          <img src={modalImage} alt="" />
        </Modal>
      )}
    </div>
  );
};
