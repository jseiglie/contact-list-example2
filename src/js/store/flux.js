const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			baseUrl: 'https://playground.4geeks.com/contact/agendas/',
			user: null,
		},
		actions: {
			editContact: async (id, formData) => {
				try {
					const opt = {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(formData)
					};
					const resp = await fetch(`${getStore().baseUrl}${getStore().user}/contacts/${id}`, opt);
					const data = await resp.json();
					console.log('edit contact response ---> ', data)
					getActions().getContacts();
				} catch (error) {
					console.log('error getting contacts ---->', error);
				}
			},
			getOneContact: async (id) => {
				try {
					const resp = await fetch(`${getStore().baseUrl}${getStore().user}/contacts/${id}`);
					const data = await resp.json();
					setStore({ editContact: data });
				} catch (error) {
					console.log('error getting contacts ---->', error);
				}
			},
			deleteContact: async (id) => {
				try {
					const opt = {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						},
					};
					const resp = await fetch(`${getStore().baseUrl}${getStore().user}/contacts/${id}`, opt);
					const data = await resp.json();
					console.log('delete contact response ----> ', data);
					await getActions().getContacts();
					return true;
				} catch (error) {
					console.log('error deleting contact ----> ', error);
					await getActions().getContacts();
					return false;
				}
			},
			createContact: async (newContact) => {
				try {
					const opt = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(newContact)
					};
					const resp = await fetch(`${getStore().baseUrl}${getStore().user}/contacts`, opt);
					const data = await resp.json();
					console.log('create contact response ----> ', data);
					await getActions().getContacts();
					return true;
				} catch (error) {
					console.log('error creating contact ----> ', error);
					return false;
				}
			},
			createAgenda: async (user) => {
				try {
					const opt = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
					}
					const resp = await fetch(`${getStore().baseUrl}${user}`, opt);
					const data = await resp.json();
					console.log('createAgenda response ----> ', data)
					setStore({ user: user, initiated: true });
					await getActions().getContacts();
					return true;
				} catch (error) {
					console.log('error creating agenda ----> ', error);
					return false;
				}
			},
			getContacts: async () => {
				try {
					const resp = await fetch(`${getStore().baseUrl}${getStore().user}/contacts`);
					const data = await resp.json();
					setStore({ contacts: data.contacts });
				} catch (error) {
					console.log('error getting contacts ---->', error);
				}
			},
		}
	};
};

export default getState;
