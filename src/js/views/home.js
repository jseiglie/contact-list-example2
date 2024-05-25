import React, { useContext } from "react";
import "../../styles/home.css";
import { NewUser } from "../component/newUser.jsx";
import { Context } from "../store/appContext.js";
import { Card } from "../component/card.jsx";
import { FormController } from "../component/formController.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);
	return (
		<div className="text-center mt-5">
			<NewUser />

			<FormController edit={false} />

			<main>
				{store.contacts?.length > 0 ?
					store.contacts?.map((el, i) => <Card key={i} email={el.email} phone={el.phone} address={el.address} name={el.name} contactId={el.id} />)
					:
					<p>try adding a contact foir it top be displayed right here</p>}
			</main>
		</div>
	);
}
