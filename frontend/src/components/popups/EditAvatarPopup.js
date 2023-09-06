import { useContext, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';
import useForm from '../../hooks/useForm';
import PopupWithForm from './PopupWithForm';
import Input from '../Input';

const EditAvatarPopup = ({ isOpen, onUpdateAvatar }) => {

  const cssStyle = 'light'; // ???

  const { isLoading } = useContext(AppContext);

  const { values, handleChange, setValues } = useForm({});

  const handleSubmitForm = (e) => {

    e.preventDefault();
    onUpdateAvatar({
      avatar: values.avatar
    });

  }

  useEffect(() => {
    setValues({ avatar: '' })
  // eslint-disable-next-line
  }, [isOpen]);

  return (

    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onSubmit={handleSubmitForm}
    >

      <Input
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        maxLength="200"
        value={values.avatar || ''}
        onChange={handleChange}
        cssStyle={cssStyle}
        required
      />

    </PopupWithForm>

  )

}

export default EditAvatarPopup;