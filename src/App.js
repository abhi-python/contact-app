import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import {Route, Routes} from 'react-router-dom';
import ContactDetail from "./components/ContactDetail";
import EditContact from "./components/EditContact";
import api from './api/contacts';
import './app.scss';

function App() {
  const LOCAL_STORAGE_KEY = "Contacts"
 const [contacts, setContacts] = useState([]);
 const [searchTerm, setSearchTerm] = useState("");
 const [searchResults, setSearchResults] = useState([]);

 const retrieveContacts = async () => {
  const response = await api.get("/contacts");
  return response.data;
 }
 const addContactHandler = async (contact) => {
  const request = {
    id: new Date().getTime().toString(),
    ...contact,
  }

  const response = await api.post("/contacts", request);
  // console.log(response);
  setContacts([...contacts, response.data]);
  // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
 }

 const updateContactHandler = async (contact) => {
  const response = await api.put(`/contacts/${contact.id}`, contact);
  // console.log(response);
  const {id} = response.data;
  setContacts(
    contacts.map((contact) => {
    return contact.id === id? {...response.data} : contact;
  })
  );
 }

 const searchHandler = (searchTerm) => {
  setSearchTerm(searchTerm);
  if(searchTerm !== ""){
    const newContactList = contacts.filter((contact) => {
      return Object.values(contact)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    })
    setSearchResults(newContactList);
  }else{
    setSearchResults(contacts);
  }
 }

 useEffect(() => {
  // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  // // console.log(retrieveContacts);
  // if(retrieveContacts) setContacts(retrieveContacts);
  const getAllContacts = async () => {
    const allContacts = await retrieveContacts();
    if(allContacts) setContacts(allContacts);
  };

  getAllContacts();
 }, []);

 const removeContactHandler = async (id) => {
  await api.delete(`/contacts/${id}`);
  const newContactList = contacts.filter((contact) => {
    return contact.id !== id;
  })
  setContacts(newContactList);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContactList));
 }


  return (
    <div className="ui container">
        <Header/>
        <Routes>
          <Route path="/" element = {<ContactList contacts = {searchTerm < 1 ? contacts : searchResults} getContactid = {removeContactHandler} term = {searchTerm} searchKeyword = {searchHandler}/>}></Route>
          <Route path="/add" element = {<AddContact addContactHandler = {addContactHandler}/>}></Route>
          <Route path="/edit" element = {<EditContact updateContactHandler = {updateContactHandler}/>}></Route>
          <Route path="/contact/:id" element = {<ContactDetail/>}></Route>
        </Routes>
        {/* <AddContact addContactHandler = {addContactHandler}/>
        <ContactList contacts = {contacts} getContactid = {removeContactHandler}/> */}
    </div>
  );
}

export default App;
