import Card from './Card';
import useAuth from '../hooks/useAuth';

const Main = ({

  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards

}) => {

  const { currentUser } = useAuth();

  return (
    <main className="main">

      <section className="profile" aria-label="Профиль">
        <div className="profile__main">
          <div className="profile__avatar-container">
            <img
              src={currentUser.avatar}
              alt="Аватар профиля"
              className="profile__avatar"
              onClick={onEditAvatar}
            />
          </div>
          <div className="profile__info">
            <div className="profile__info-main">
              <h1 className="profile__info-name">{currentUser.name}</h1>
              <p className="profile__info-about">{currentUser.about}</p>
            </div>
            <button
              type="button"
              className="profile__info-edit-btn"
              aria-label="Редактировать профиль"
              onClick={onEditProfile} />
          </div>
        </div>
        <button
          type="button"
          className="profile__add-place-btn"
          aria-label="Добавить фото"
          onClick={onAddPlace} />
      </section>

      <section className="gallery" aria-label="Фотогалерея">
        <ul className="gallery__places">
          {cards.map((item) => {
            return (
              <Card
                key={item._id}
                card={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            )
          })}
        </ul>
      </section>

    </main>
  )
}

export default Main;