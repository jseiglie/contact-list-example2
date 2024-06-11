import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const NewUser = () => {
    const [user, setUser] = useState('');
    const { actions } = useContext(Context);
    const [hide, setHide] = useState(false)
    const handleSubmit = e => {
        e.preventDefault();
        if (actions.createAgenda(user)) setHide(true)
    }

    return (
        <div className="container">

            {!hide ? (
                <form onSubmit={e => handleSubmit(e)} className="form-control">
                    <h2>Create your agenda</h2>
                    <input type="text"
                        className="form-control"
                        value={user}
                        name="user"
                        placeholder="slug"
                        onChange={e => setUser(e.target.value)} />
                    <input type="submit" className="btn btn-primary" value={'send'} />
                </form>
            ) : ''}
        </div>
    )
}