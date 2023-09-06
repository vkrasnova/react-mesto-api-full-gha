import { Link, Routes, Route } from 'react-router-dom';
import headerLogo from '../images/logo.svg';
import useAuth from '../hooks/useAuth';

const Header = ({ onSignOut }) => {

  const { email } = useAuth();

  return (

    <header className="header">

      <Link to="/" className="header__logo">
        <img src={headerLogo} alt="Логотип Mesto" className="header__logo-image" />
      </Link>

      <ul className="header__nav">

        <Routes>

          <Route exact path="/" element={
            <>
              <li className="header__email">{email}</li>
              <li className="header__nav-link header__nav-link_style_gray" onClick={onSignOut}>
                Выйти
              </li>
            </>
          }/>

          <Route path="/sign-up" element={
            <li>
              <Link to="/sign-in" className="header__nav-link">
                Войти
              </Link>
            </li>
          }/>

          <Route path="/sign-in" element={
            <li>
              <Link to="/sign-up" className="header__nav-link">
                Регистрация
              </Link>
            </li>
          }/>

        </Routes>

      </ul>

    </header>

  )

}

export default Header;