import Popup from "../Popup";
import Form from "../Form";

const PopupWithForm = ({

  title,
  name,
  isOpen,
  buttonText,
  children,
  onSubmit

}) => {

  return (

    <Popup
      isOpen={isOpen}
      type="default"
      name={name}
      title={title}
    >

      <Form
        title={title}
        name={`${name}-form`}
        buttonText={buttonText}
        onSubmit={onSubmit}
        cssStyle="light"
      >

        {children}

      </Form>

    </Popup>

  )

}

export default PopupWithForm;