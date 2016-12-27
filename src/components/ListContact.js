"use strict";

import React, { Component, PropTypes } from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import {blue500} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';

class ListContact extends Component {
	static propTypes = {
		pouchDB: PropTypes.object
	}

	state = {
		allContact: [],
	}

	constructor(props) {
		super(props);


		this.props.pouchDB.on('changed', () => {
			this.refreshContact();
		});

	}

	refreshContact = () => {
		this.props.pouchDB.all('contact').then((data) => {
			this.setState({ allContact: data || []});
		});
		
	}

	componentDidMount() {
		this.refreshContact();
	}

	renderContact() {
		return this.state.allContact.map((item) => {
				return (
					<ListItem
						primaryText = {item.name}
						secondaryText={item.phone}
						rightIcon={ <CommunicationCall color={blue500} />}
						onClick={() => { this.props.handleClick(item); }}
					/>
				);
			});
	}

	render() {
		return (
			<Card style={{width: "80%"}}>
				<CardHeader title="List Contact" />
				<CardText>
					<List>
						{this.renderContact()}
					</List>
				</CardText>
			</Card>	
		);
	}
}

export default ListContact;