import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function EditContact(props){
    
    const location = useLocation();
    const data = location.state;
    // console.log(data)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: data.id,
        name: data.name,
        email: data.email,
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const update = (e) => {
        e.preventDefault();
        if(formData.name === "" || formData.email === ""){
            alert("All fileds are mandatory!");
            return;
        }
            props.updateContactHandler(formData);
        setFormData({
            name: "",
            email: ""
        });
        navigate('/');
    }

    return (
        <div className="ui main">
            <h2>Edit Contact</h2>
            <form className="ui form" onSubmit={update}>
                <div className="field">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange}/>
                </div>

                <div className="field">
                    <label>Email</label>
                    <input type="text" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange}/>
                </div>
                <button className="ui button blue">Update</button>
            </form>
        </div>
    );
}
