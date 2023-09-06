import { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import Form from '../Form';
import Input from '../Input';

const Register = ({ onRegister }) => {

  const cssStyle = 'dark'; // ???

  const { values, handleChange, setValues } = useForm({});

  const handleSubmitForm = (e) => {

    e.preventDefault();
    onRegister(values);

  }

  useEffect(() => {
    setValues({
      email: '',
      password: ''
    });
  // eslint-disable-next-line
  }, [])

  return (
  
    <Form
      title="Регистрация"
      name="register"
      buttonText="Зарегистрироваться"
      onSubmit={handleSubmitForm}
      buttonTipText="Уже зарегистрированы? Войти"
      buttonTipLink="/sign-in"
      cssStyle={cssStyle}
      cssType='single'
    >

      <Input
        type="email"
        cssStyle={cssStyle}
        name="email"
        placeholder="Email"
        minLength="5"
        maxLength="64"
        value={values.email || ''}
        onChange={handleChange}
        required
      />

      <Input
        type="password"
        cssStyle={cssStyle}
        name="password"
        placeholder="Пароль"
        minLength="5"
        maxLength="64"
        value={values.password || ''}
        onChange={handleChange}
        required
      />

    </Form>
  
  )
}

export default Register;