"use strict";

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './components/Header';
import NewContact from './components/NewContact';
import ListContact from './components/ListContact';
import DialogModal from './components/DialogModal';

import PouchDBService from './services/pouchdb-service'

injectTapEventPlugin();

class App extends Component {

	constructor() {
		super();
		this.state   = { open: false, contact: {} };
		this.pouchDB = new PouchDBService();
	}

	toggle(contact) {
		this.setState({
			open: !this.state.open,
			contact: contact
		});
	}

	render() {
		let divStyle = {
			float: 'left',
			padding: '2%',
			width: '50%'
		};

		return (
			<MuiThemeProvider>
				<div>
					<Header title="MyApp"/>
					<div style={divStyle}>
						<NewContact pouchDB={this.pouchDB} />
					</div>
					<div style={divStyle}>
						<ListContact pouchDB={this.pouchDB} handleClick={this.toggle.bind(this)} />
					</div>
					<DialogModal pouchDB={this.pouchDB} open={this.state.open} toggle={this.toggle.bind(this)}  item={this.state.contact}/>
				</div>
			</MuiThemeProvider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));