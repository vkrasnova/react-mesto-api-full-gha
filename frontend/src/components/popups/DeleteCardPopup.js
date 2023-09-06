import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import PopupWithForm from './PopupWithForm';

const DeleteCardPopup = ({ selectedCard, onDeleteCard }) => {

  const { isLoading } = useContext(AppContext);

  const handleSubmitForm = (e) => {

    e.preventDefault();
    onDeleteCard(selectedCard);

  }

  return (

    <PopupWithForm
      title="Вы уверены?"
      name="delete-card"
      buttonText={isLoading ? 'Удаление...' : 'Да'}
      isOpen={selectedCard}
      onSubmit={handleSubmitForm}
    />

  )

}

export default DeleteCardPopup;