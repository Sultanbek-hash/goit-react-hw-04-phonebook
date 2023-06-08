import UseLocalStorage from 'components/UseLoacalStorage/USeLoacalStorage';

import { ContactsTitle, Container, FilterTitle, Title } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { useState } from 'react';
import { nanoid } from 'nanoid';

export default function App(){
    const [contacts, setContacts] = UseLocalStorage('contacts', []);
    const [filter, setFilter] = useState('');

    const uniqueName = newName => {
      return contacts.find(
        ({name}) => name.toLocaleLowerCase() === newName.toLocaleLowerCase()
      );
    };

    const numberFormating = number =>{
      const array = [...number];
      return array.join('');
    }

    const addContact = value =>{
      const {name, number} = value;
      const newName = uniqueName(name);
      const formatNumber = numberFormating(number); 

      if(newName){
        return toast.error(newName.name + ' is already in contacts.');
      }

      const contact = {
        id: nanoid(),
        name,
        number: formatNumber,
      }

      setContacts(prevContacts => [contact, ...prevContacts]);
      toast.success(`${name} was added to contacts!`);
    }

    const deleteContacts = itemId =>{
      const item = contacts.find(({id}) => id === itemId);
      ;
      Promise.resolve(
        setContacts(prevContacts => prevContacts.filter(contact => contact.id !== itemId))
      ).then(toast.info(`Contact ${item.name} was deleted!`));
    }

    const changeFilter = e =>{
      setFilter(e.target.value);
    }

    const getVisibleContacts = () =>{
      const normalizedFilter = filter.toLocaleLowerCase();
      return (
        contacts.filter(contact => 
          contact.name.toLowerCase().includes(normalizedFilter)
          )
      );
    }

    const visibleContacts = getVisibleContacts();
return(
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={addContact} />
        <ContactsTitle>Contacts</ContactsTitle>
        <FilterTitle>Find contacts by name</FilterTitle>
        <Filter value={filter} onChange={changeFilter} />
        {contacts.length ? (
          <ContactList
            contacts={visibleContacts}
            onDelete={deleteContacts}
          />
        ) : (
          <p>No any contacts</p>
        )}
        <ToastContainer autoClose={3000} theme={'colored'} />
      </Container>
)

}

