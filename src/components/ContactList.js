import React, {useRef} from 'react'
import ContactCard from './ContactCard'
import { Link } from 'react-router-dom'

export default function ContactList({contacts, getContactid, term, searchKeyword}) {
  // console.log(term, searchKeyword);
  const inputEl = useRef("");

  const deleteContacthandler = (id) => {
    getContactid(id)
  }

  const getSearchTerm = () => {
    searchKeyword(inputEl.current.value);
  }

    const contactRenderList = contacts.map((contact) => {
        return (
           <ContactCard contact = {contact} key = {contact.id} clickHandler = {deleteContacthandler}/>
        )
    })
  return (
    <div className='main '>
      <div className="contact-row justify-content-space-between align-center">
      <h2>Contact List
      </h2>
        <Link to = "/add">
          <button className='ui button blue right'>Add Contact</button>
        </Link>
      </div>
      <div className='ui search'>
        <div className='ui icon input'>
          <input type='text' placeholder='Search Contacts' className='prompt' value={term} onChange={getSearchTerm} ref={inputEl}/>
          <i className='search icon'></i>
        </div>
      </div>
       <div className='ui celled list'>{contactRenderList.length > 0 ? contactRenderList : "No Contacts Available"}</div> 
    </div>
  )
}