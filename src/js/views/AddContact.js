import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {
	const { store, actions } = useContext(Context);

	const initialState = {
		full_name: "",
		email: "",
		phone: "",
		address: "",
		agenda_slug: "deimian"
	};

	const [contact, setContact] = useState(initialState);
	const [error, setError] = useState(false);

	const { full_name, email, phone, address } = contact;

	const handleContact = e => {
		setContact({
			...contact,
			[e.target.name]: e.target.value
		});
	};

	const handleAddContact = async e => {
		if (full_name.trim() != "" && email.trim() != "" && phone.trim() != "" && address.trim() != "") {
			//se envia el formulario
			let response = await actions.createContact(contact);
			if (response) {
				actions.getContacts();
			}

			setError(false), setContact(initialState);
		} else {
			setError(true);
		}
	};

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							name="full_name"
							onChange={handleContact}
							value={full_name}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							name="email"
							onChange={handleContact}
							value={email}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							name="phone"
							onChange={handleContact}
							value={phone}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							name="address"
							onChange={handleContact}
							value={address}
						/>
					</div>
					{error ? <div className="alert alert-danger">Todos los campos deben ser validos</div> : null}

					<button type="button" className="btn btn-primary form-control" onClick={handleAddContact}>
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
