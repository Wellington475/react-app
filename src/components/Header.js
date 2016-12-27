"use strict";

import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {open: false};
	}

	handleToggle() {
		this.setState({open: !this.state.open});
	}

	render() {
		return (
			<header className="header">
				<AppBar
					title={this.props.title} 
					titleStyle={{textAlign: "center"}} 
					showMenuIconButton={true}
					onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
				/>
				<Drawer docked={false}
					open={this.state.open}
					onRequestChange={(open) => this.setState({open})}
				>
					<Menu>
						<MenuItem primaryText="Home" />
						<MenuItem primaryText="New Post" />
					</Menu>
				</Drawer>
			</header>
		);
	}
}

export default Header;