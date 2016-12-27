"use strict";

import { EventEmitter } from 'events';
import PouchDB from 'pouchdb';
import uuid from 'node-uuid'

class PouchDBService extends EventEmitter {
	constructor() {
		super();

		this.pouchDB = new PouchDB('default', {adapter: 'websql'});

		this.pouchDB
		.changes({ since: 'now', live: true, include_docs: true })
		.on('change', (info) => this.emit('changed', info.doc));

		this.all 	 = this.all.bind(this);
		this.create  = this.create.bind(this);
		this.update  = this.update.bind(this);
		this.delete  = this.delete.bind(this);
	}

	all(doc_type) {
		return this.pouchDB
			.allDocs({ include_docs: true, attachments: true})
			.then(data => {
				return data.rows.map((item) => item.doc);
			});
	}

	create (item, doc_type) {
		return this.pouchDB
			.put(Object.assign(item, {docType: doc_type, _id: uuid.v4()}));
	}

	update(item) {
		delete item.id
		delete item.rev
		return this.pouchDB
			.put(item);
	}

	delete(item) {
		return this.pouchDB
			.remove(item._id, item._rev);
	}
}

export default PouchDBService;