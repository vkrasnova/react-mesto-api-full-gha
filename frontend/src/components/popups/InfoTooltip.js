import successIcon from '../../images/icons/success.svg';
import failureIcon from '../../images/icons/failure.svg';
import Popup from '../Popup';

const InfoTooltip = ({ isOpen, isRegSuccesful }) => {

  return (

    <Popup
      isOpen={isOpen}
      type="default"
      name="registration-info"
      title="Результат регистрации"
    >
      <div className="popup__info">
        <img
          src={isRegSuccesful ? successIcon : failureIcon}
          alt={isRegSuccesful ? "Регистрация выполнена" : "Регистрация не выполнена"}
          className="popup__info-image"
        />
        <p className="popup__info-text">
          {isRegSuccesful ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}
        </p>
      </div>

    </Popup>

  )
}

export default InfoTooltip;