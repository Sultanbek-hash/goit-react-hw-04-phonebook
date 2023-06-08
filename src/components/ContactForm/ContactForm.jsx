import PropTypes from 'prop-types';

import { Formik, Form, ErrorMessage } from 'formik';

import { Button, Input, Label } from './ContactForm.styled';

function ContactForm ({onSubmit}){

  const handleSubmit = (values, {resetForm}) => {
    onSubmit(values);
    resetForm();
  } 

  return (
    <Formik initialValues={{ name: '', number: '' }} onSubmit={handleSubmit}>
      <Form >
        <Label>
          Name
          <Input  
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <ErrorMessage name="name" component="div" />
        </Label>
        <Label>
          Number
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <ErrorMessage name="number" component="div" />
        <Button type="submit">Add contact</Button>
      </Form>
    </Formik>
  );
  };
    

export default ContactForm;

ContactForm.propTypes = {
  handleSubmit: PropTypes.func,
};
