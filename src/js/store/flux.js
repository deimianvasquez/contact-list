const URL_BASE = "https://assets.breatheco.de/apis/fake/contact";
const getState = ({ getStore, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contacts: [],
			idContact: null
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			getContacts: async () => {
				const store = getStore();
				try {
					let response = await fetch(`${URL_BASE}/agenda/deimian`);
					let data = await response.json();
					if (data.length >= 0) {
						setStore({
							...store,
							contacts: data
						});
					}
				} catch (error) {
					console.log(error);
				}
			},
			createContact: async contact => {
				try {
					let response = await fetch(`${URL_BASE}/`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(contact)
					});
					if (response.ok) {
						return true;
					} else {
						return false;
					}
				} catch (error) {
					console.log(error);
				}
			},
			deleteContact: async id => {
				try {
					let response = await fetch(`${URL_BASE}/${id}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json"
						}
					});
					if (response.ok) {
						return true;
					} else {
						return false;
					}
					console.log(response);
				} catch (error) {
					console.log(error);
				}
			},
			modifyId: id => {
				const store = getStore();
				setStore({
					idContact: id
				});
			}
		}
	};
};

export default getState;
