// eslint-disable-next-line
import extra from '../services/searchers/extra';

exports.list = function(query, callback) {
	extra.search(query.query)
		.then(torrents =>{
			callback(null, torrents);
		})
		.catch(() => {
			callback("Search could not be complete");
		});
};

exports.item = function(p, callback) {
	callback("Not implemented");
};
