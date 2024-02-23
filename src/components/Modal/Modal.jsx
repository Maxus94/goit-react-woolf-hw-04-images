import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ children, toggleModal }) => {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        toggleModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleModal]);

  const handleOverlayClick = evt => {
    if (evt.currentTarget === evt.target) {
      toggleModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>{children}</div>
    </div>
  );
};
