import { useContext, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';
import useForm from '../../hooks/useForm';
import PopupWithForm from './PopupWithForm';
import Input from '../Input';

const AddPlacePopup = ({ isOpen, onAddPlace }) => {

  const cssStyle = 'light';

  const { isLoading } = useContext(AppContext);

  const { values, handleChange, setValues } = useForm({});

  const handleSubmitForm = (e) => {

    e.preventDefault();

    onAddPlace({
      name: values.placeTitle,
      link: values.placeURL
    });

  }

  useEffect(() => {
    setValues({
      placeTitle: '',
      placeURL: '' })
  // eslint-disable-next-line
  }, [isOpen]);

  return (

    <PopupWithForm
      title="Новое место"
      name="add-place"
      buttonText={isLoading ? 'Создание...' : 'Создать'}
      isOpen={isOpen}
      onSubmit={handleSubmitForm}
    >

      <Input
        name="placeTitle"
        placeholder="Название"
        minLength="2"
        maxLength="40"
        value={values.placeTitle || ''}
        onChange={handleChange}
        cssStyle={cssStyle}
        required
      />

      <Input
        type="url"
        name="placeURL"
        placeholder="Ссылка на картинку"
        minLength="2"
        maxLength="40"
        value={values.placeURL || ''}
        onChange={handleChange}
        cssStyle={cssStyle}
        required
      />

    </PopupWithForm>)

}

export default AddPlacePopup;