import useAuth from '../hooks/useAuth';

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {

  const { currentUser } = useAuth();

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `place__like-btn ${isLiked && 'place__like-btn_active'}`
  );

  const handleClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  return (

    <li className="gallery__places-item">
      <article className="place">
        <img
          src={card.link}
          alt={card.name}
          className="place__image"
          onClick={handleClick}
        />
        <div className="place__footer">
          <h2 className="place__title">{card.name}</h2>
          <div className="place__like-container">
            <button
              type="button"
              className={cardLikeButtonClassName}
              aria-label="Мне нравится"
              onClick={handleLikeClick}
            />
            <span className="place__like-qty">{card.likes.length}</span>
          </div>
        </div>
        {isOwn && <button
          type="button"
          className="place__delete-btn"
          aria-label="Удалить фото"
          onClick={handleDeleteClick}
        />}
      </article>
    </li>

  )

}

export default Card;