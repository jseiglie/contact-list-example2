import React, { useEffect } from "react";
import { useParams } from "react-router";
import { FormController } from "../component/formController.jsx";

export const Edit = () => {

    const { id } = useParams();


    return (
        <section>

            <FormController edit={true} contactId={id} />

        </section>
    )
}