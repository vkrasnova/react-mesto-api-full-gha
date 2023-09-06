import { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import Form from '../Form';
import Input from '../Input';

const Login = ({ onLogin }) => {

  const cssStyle = 'dark';

  const { values, handleChange, setValues } = useForm({});

  const handleSubmitForm = (e) => {

    e.preventDefault();
    onLogin(values);

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
      title="Вход"  
      name="login"
      buttonText="Войти"
      onSubmit={handleSubmitForm}
      cssStyle={cssStyle}
      cssType='single'
    >

      <Input
        type="email"
        name="email"
        placeholder="Email"
        minLength="5"
        maxLength="64"
        value={values.email || ''}
        onChange={handleChange}
        cssStyle={cssStyle}
        required
      />

      <Input
        type="password"
        name="password"
        placeholder="Пароль"
        minLength="5"
        maxLength="64"
        value={values.password || ''}
        onChange={handleChange}
        cssStyle={cssStyle}
        required
      />

    </Form>
  )
}

export default Login;