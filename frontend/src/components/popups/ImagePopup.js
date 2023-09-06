import Popup from "../Popup";

const ImagePopup = ({ card }) => {

  return (

    <Popup
      isOpen={Object.entries(card).length !== 0}
      type="image"
      name="zoom-image"
      title="Увеличенное изображение"
    >

        <figure className="popup__figure">

          <img
            src={card.link}
            alt={card.name}
            className="popup__image"
          />

          <figcaption className="popup__image-title">
            {card.name}
          </figcaption>

        </figure>

    </Popup>
  )
}

export default ImagePopup;