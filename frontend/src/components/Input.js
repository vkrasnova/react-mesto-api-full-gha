const Input = ({

  cssStyle = 'dark',
  ...props

}) => {
  return (

    <div className="form__input-container">
      <input
        type={props.type || 'text'}
        minLength={props.minLength || 5}
        maxLength={props.maxLength || 64}
        className={`form__input form__input_style_${cssStyle}`}
        {...props}
      />
      <span className="form__input-error"></span>
    </div>
    
  )
}

export default Input;