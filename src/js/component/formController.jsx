import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";

export const FormController = ({ edit, contactId }) => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const contact = store.contacts?.filter(el => el.id == contactId)[0];
    console.log('filtered contact ------ > ', contact);

    const [formData, setFormData] = useState({
        name: contact?.name || '',
        email: contact?.email || '',
        phone: contact?.phone || '',
        address: contact?.address || ''
    });

    const handleSubmit = e => {
        e.preventDefault();
        if (!edit) return actions.createContact(formData);
        if (actions.editContact(contactId, formData)) navigate('/')
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <section>
            <form onSubmit={e => handleSubmit(e)} className="form-control">
                <h3>Create Contact</h3>
                <input type="text" className="form-control" value={formData.name} name="name" placeholder="name" onChange={e => handleChange(e)} />
                <input type="email" className="form-control" value={formData.email} name="email" placeholder="email" onChange={e => handleChange(e)} />
                <input type="text" className="form-control" value={formData.phone} name="phone" placeholder="phone" onChange={e => handleChange(e)} />
                <input type="text" className="form-control" value={formData.address} name="address" placeholder="address" onChange={e => handleChange(e)} />
                <input type="submit" value={edit ? 'Edit' : 'Create'} />
            </form>
            {edit ? <button className="btn btn-danger" onClick={() => navigate('/')} >Go back</button> : ''}
        </section>
    )
}