import React from 'react';
import user from '../images/user.png';
import { Link } from 'react-router-dom';

export default function ContactCard(props) {
    const {id, name, email} = props.contact;
  return (
        <div className='item main-item'>
            <img className='ui avatar image' src= {user} alt = "user"/>
            <div className='content item-style'>
                <Link to = {`/contact/${id}`} state = {props.contact}>
                    <div className='header'>
                        {name}
                    </div>
                    <div>{email}</div>
                </Link>
                <div>
                    <Link to = "/edit" state = {props.contact}>
                        <i className='edit alternate outline icon' style={{color: "blue", marginTop: "7px"}}></i>
                    </Link>
                    <i className='trash alternate outline icon' style={{color: "red", marginTop: "7px", cursor: "pointer"}} onClick={() => props.clickHandler(id)}></i>
                </div>
            </div>
        </div>
  )
}
