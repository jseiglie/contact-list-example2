import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Contacts = () => {

    const { store, actions } = useContext(Context);

    return (
        <p>map the contacts</p>
    )


};