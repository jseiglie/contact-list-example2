const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			baseUrl: 'https://playground.4geeks.com/contact/agendas/',
			user: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {


			/*
			
			methods: GET POST PUT DELETE
			get is default
			
		
			//DELETE and PUT needs an ID
			//if the GET is to GET ONE element --> ID
			const resp = await fetch('localhost')
			const data = await resp.json()
			
			
			
			*/



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
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
