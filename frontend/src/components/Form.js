import { Link } from 'react-router-dom';

const Form = ({

  title,  
  name,
  buttonText,
  buttonTipText,
  buttonTipLink,
  children,
  cssStyle = 'dark',
  cssType = 'default',
  ...props

}) => {

  return (

    <section
      className={`form form_type_${cssType} form_style_${cssStyle}`}
      aria-label={`Форма – ${title}`}>
      
      <h2 className={`form__title form__title_type_${cssType} form__title_style_${cssStyle}`}>{title}</h2>

      <form
        className="form__form"
        name={`${name}-form`}
        {...props}
      >

        <div className={`form__inputs form__inputs_type_${cssType}`}>

          {children}

        </div>
          
        <div className="form__submit-container">

          <button
            type="submit"
            className={`form__submit-btn form__submit-btn_style_${cssStyle}`}
            aria-label={buttonText}>
              {buttonText}
          </button>

          {buttonTipText &&
            (buttonTipLink
              ? (
                <Link
                  className={`
                    form__submit-text
                    form__submit-text_link
                    form__submit-text_link_style_${cssStyle}`}
                  to={buttonTipLink}>
                      {buttonTipText}
                </Link>)
              : (
                <span
                  className={`form__submit-text form__submit-text_style_${cssStyle}`}>
                    {buttonTipText}
                </span>
                )
            )}

        </div>

      </form>

    </section>

  );
}

export default Form;