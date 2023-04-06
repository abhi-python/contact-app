import React from 'react';
import user from '../images/user.jpg';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export default function ContactDetail(props) {
    const location = useLocation();
    const data = location.state;
    const {name, email} = data;
  return (
        <div className='main edit-main-item'>
            <h2>Contact Details</h2>
            <div className='ui card centered'>
                <div className='image'>
                    <img src= {user} alt='user'/>
                </div>
                <div className='content'>
                    <div className='header'>{name}</div>
                    <div className='description'>{email}</div>
                </div>
            </div>
            <div className='center-div'>
                <Link to= "/">
                    <button className='ui button blue center'>Back to Contact List</button>
                </Link>
            </div>
        </div>  
  )
}
