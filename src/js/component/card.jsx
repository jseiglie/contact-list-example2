import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";

export const Card = ({ email, phone, address, name, contactId }) => {
    const navigate = useNavigate();
    const { actions } = useContext(Context);

    return (<div className="card" style={{ width: '28rem' }}>

        <div className="card-body d-flex">

            <div className="container">
                <figure>
                    <img className="img-fluid" src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-1024.png" alt={name} />
                    <figcaption>{name}</figcaption>
                </figure>
            </div>
            <div className="container">
                <p>
                    email: {email}
                </p>
                <p>
                    phone: {phone}
                </p>
                <p>
                    address: {address}
                </p>
                <div className=" d-flex justify-content-between"></div>
                <button className="btn btn-success" onClick={() => navigate('/edit/' + contactId)}>Edit</button>
                <button className="btn btn-danger" onClick={() => actions.deleteContact(contactId)}>Delete</button>
            </div>
        </div>

    </div>)
}