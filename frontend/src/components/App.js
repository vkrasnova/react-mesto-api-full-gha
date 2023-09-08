import { useEffect, useState } from 'react';
import { Navigate, Routes, Route, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { auth } from '../utils/auth';
import { AppContext } from '../contexts/AppContext';
import useAuth from '../hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';
import Loader from './Loader';
import Header from './Header';
import Register from './forms/Register';
import Login from './forms/Login';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './popups/EditProfilePopup';
import EditAvatarPopup from './popups/EditAvatarPopup';
import AddPlacePopup from './popups/AddPlacePopup';
import ImagePopup from './popups/ImagePopup';
import DeleteCardPopup from './popups/DeleteCardPopup';
import InfoTooltip from './popups/InfoTooltip';

function App() {

  const navigate = useNavigate();
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  
  const { 
    currentUser, setCurrentUser,
    isLoggedIn, setIsLoggedIn,
    setEmail
  } = useAuth();

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedCardToDelete, setSelectedCardToDelete] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  
  const [isRegSuccesful, setIsRegSuccesful] = useState(false);

  const checkAuth = () => {
    auth.getUserData()
      .then((res) => {
        setIsLoggedIn(true);
        setEmail(res.email);
        navigate('/');
      })
      .catch(() => {
        setIsLoggedIn(false);
      })
  }

  useEffect(() => {
    checkAuth();
  // eslint-disable-next-line
  }, []);

  useEffect(() => {

    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialPlaces()])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          setCards(initialCards.reverse());
        })
        .catch(console.error);
    }
  // eslint-disable-next-line
  }, [isLoggedIn]);

  if (isLoggedIn === null) {
    return <Loader />
  }

  const handleRegister = ({ email, password }) => {

    auth.register({ email, password })
      .then(() => {
        setIsRegSuccesful(true);
        navigate('/sign-in');
      })
      .catch((error) => {
        setIsRegSuccesful(false);
        console.log(error);
      })
      .finally(() => setIsInfoTooltipOpen(true));

  }

  const handleLogin = ({ email, password }) => {

    auth.authorize({ email, password })
      .then(() => {
        setIsLoggedIn(true);
        setEmail(email);
        navigate('/', {replace: true});
      })
      .catch((error) => {
        alert('Вход не выполнен. Проверьте корректность email и пароля.');
        console.log(error);
      });
  }

  const handleSignOut = () => {
    auth.logout()
      .then(() => {
        setIsLoggedIn(false);
        setEmail('');
        navigate('/sign-in', {replace: true});
      })
      .catch((error) => {
        alert('Выход не выполнен.');
        console.log(error);
      });
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardLike = (card) => {

    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
      })
      .catch(console.error);

  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(() => closeAllPopups())
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const handleUpdateUser = ({ name, about }) => {
    function makeRequest() {
      return api.setUserInfo({ name, about })
        .then((userData) => setCurrentUser(userData));
    }
    handleSubmit(makeRequest);
  }

  const handleUpdateAvatar = (newUserAvatarLink) => {
    function makeRequest() {
      return api.updateUserAvatar(newUserAvatarLink)
        .then((userData) => setCurrentUser(userData));
    }
    handleSubmit(makeRequest);
  }

  const handleAddPlace = (newCard) => {
    function makeRequest() {
      return api.addNewCard(newCard)
        .then((card) => setCards([card, ...cards]));
    }
    handleSubmit(makeRequest);
  }

  const handleCardDelete = (card) => {
    setSelectedCardToDelete(card);
  }

  const handleConfirmCardDelete = (card) => {

    function makeRequest() {
      return api.deleteCard(card._id)
        .then(() => setCards((state) => state.filter((item) => item._id !== card._id)));
    }
    handleSubmit(makeRequest);

  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
    setSelectedCardToDelete(null);
  };

  return (

    <AppContext.Provider value={{ closeAllPopups, isLoading }}>

        <Header
          onSignOut={handleSignOut}
        />

        <Routes>

          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={
              <>

                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />

                <Footer />

                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onUpdateUser={handleUpdateUser}
                />

                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onUpdateAvatar={handleUpdateAvatar}
                />

                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onAddPlace={handleAddPlace}
                />

                <ImagePopup
                  card={selectedCard}
                />
                
                <DeleteCardPopup
                  selectedCard={selectedCardToDelete}
                  onDeleteCard={handleConfirmCardDelete}
                />

              </>
            } />
          </Route>

        </Routes>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isRegSuccesful={isRegSuccesful}
        />

    </AppContext.Provider>

  );
}

export default App;
