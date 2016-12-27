"use strict";

import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class DialogModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			phone: ""
		};

		if (!this.props.open) {
			return null;
		}
	}

	handleClickDelete() {
		event.preventDefault();

		let contact = {
			name: this.refs.name.input.value,
			phone: this.refs.phone.input.value,
			_id: this.props.item._id,
			_rev: this.props.item._rev
		};

		this.props.pouchDB.delete(contact);
		this.props.toggle({});
	}

	handleClickUpdate() {
		event.preventDefault();

		let contact = {
			name: this.refs.name.input.value,
			phone: this.refs.phone.input.value,
			_id: this.props.item._id,
			_rev: this.props.item._rev
		};

		this.props.pouchDB.update(contact);
		this.props.toggle({});
	}

	render() {
		let styleDiv = {
			width: '50%',
			margin: '0 auto'
		};

		return (
			<Dialog
				title="Update Contact"
				modal={true}
				open={this.props.open}
				style={{ marginTop: '-2%' }}
			>
				<div style={styleDiv}>
					<form onSubmit={this.handleClickUpdate.bind(this)}>
						<TextField ref="name" floatingLabelText="name" fullWidth={true} defaultValue={this.props.item.name} />
						<br />
						<TextField ref="phone" floatingLabelText="phone" fullWidth={true} defaultValue={this.props.item.phone} />
						<br />
						<br />
						<RaisedButton type="submit" label="update" primary={true}/>
						<FlatButton
							label="delete"
							secondary={true}
							onTouchTap={this.handleClickDelete.bind(this)}
						/>
						<FlatButton
							label="Cancel"
							primary={true}
							onTouchTap={this.props.toggle}
						/>
					</form>
				</div>
			</Dialog>
		);
	}
}

export default DialogModal;