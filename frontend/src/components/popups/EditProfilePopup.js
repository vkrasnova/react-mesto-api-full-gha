import { useContext, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';
import useForm from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';
import PopupWithForm from './PopupWithForm';
import Input from '../Input';

const EditProfilePopup = ({ isOpen, onUpdateUser }) => {

  const cssStyle = 'light';

  const { isLoading } = useContext(AppContext);
  const { currentUser } = useAuth();

  const { values, handleChange, setValues } = useForm({});
  
  const handleSubmitForm = (e) => {

    e.preventDefault();

    onUpdateUser({
      name: values.username,
      about: values.userabout
    });

  }

  useEffect(() => {
    setValues({
      username: currentUser.name,
      userabout: currentUser.about
    });
  // eslint-disable-next-line
  }, [currentUser, isOpen]);

  return (

    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onSubmit={handleSubmitForm}
    >

      <Input
        name="username"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={values.username || ''}
        onChange={handleChange}
        cssStyle={cssStyle}
        required
      />

      <Input
        name="userabout"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        value={values.userabout || ''}
        onChange={handleChange}
        cssStyle={cssStyle}
        required
      />

    </PopupWithForm>

  )

}

export default EditProfilePopup;