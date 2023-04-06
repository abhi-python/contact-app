import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddContact(props){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.name === "" || formData.email === ""){
            alert("All fileds are mandatory!");
            return;
        }
            props.addContactHandler(formData);
        setFormData({
            name: "",
            email: ""
        });
        navigate('/');
    }

    return (
        <div className="ui main">
            <h2>Add Contact</h2>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange}/>
                </div>

                <div className="field">
                    <label>Email</label>
                    <input type="text" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange}/>
                </div>
                <button className="ui button blue">Add</button>
            </form>
        </div>
    );
}
