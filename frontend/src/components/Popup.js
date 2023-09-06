import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useEffect } from 'react';

const Popup = ({ isOpen, type, name, title, children }) => {

  const onClose = useContext(AppContext).closeAllPopups;

  useEffect(() => {

    if (!isOpen) return;

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);

  }, [isOpen, onClose])

  const handleOverlay = (e) => {
    if (e.target.classList.contains('popup_opened')) {
      onClose();
    }
  }

  return (

    <section
      className={`popup popup_type_${type} ${isOpen ? "popup_opened" : ""}`}
      name={`${name}-popup`}
      aria-label={`Окно – ${title}`}
      onClick={handleOverlay}
    >

      <div className={`popup__container popup__container_type_${type}`}>

        {children}

      <button
        type="button"
        className="popup__close-btn"
        aria-label={`Закрыть окно – ${title}`}
        onClick={onClose}
      />

      </div>

    </section>

  );

};

export default Popup;

