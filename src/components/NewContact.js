"use strict";

import React, { Component, PropTypes } from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import DialogModal from './DialogModal';

class NewContact extends Component {
	static propTypes = {
		pouchDB: PropTypes.object
	}

	constructor(props) {
		super(props);

		this.state = {editorState: EditorState.createEmpty()};
		this.onChange = (editorState) => {
			this.setState({editorState});
		};
	}

	handleClick(event) {
		event.preventDefault();

		let contact = {
			name: this.refs.name.input.value,
			phone: this.refs.phone.input.value
		};
		
		this.clearInput();

		this.props.pouchDB.create(contact, 'contact');
	}

	clearInput() {
		this.refs.name.input.value = "";
		this.refs.phone.input.value = "";
	}

	render() {
		return (
			<div style={{ paddingLeft: '10%', paddingRight: '10%'}}>
				<Card style={{ paddingLeft: '4%', paddingRight: '4%' }}>
					<CardHeader title="New contact" />
					<CardText>
						<form onSubmit={this.handleClick.bind(this)} style={{margin: '0 auto'}}>
							<TextField floatingLabelText="Name" ref="name" fullWidth={true} />
							<br/>
							<TextField floatingLabelText="Phone" ref="phone" fullWidth={true} />
							<br/>
							<br/>
							<br/>
							<RaisedButton label="Registe" primary={true}  type="submit"/>
						</form>
					</CardText>
				</Card>
			</div>
		);
	}
}

export default NewContact;