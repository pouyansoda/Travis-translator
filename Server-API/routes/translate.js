var restify = require('restify');

module.exports.routes = function(server) {

	server.post('/translate', function respond(req, res, next) {

		console.log('/translate'.green, req.params);

		res.send({
			source: req.params.source_lang,
			target: req.params.target_lang,
			translations: [
				{
					text: "ንሕና ንሰባት ክንርድኦም ደሊና ።"
				}
			]
		});
		return next();
	});

	// server.post('/translate', rateLimit, function(req, res, next) {
	// 	// Delete for these dates first
	// 	req.db.BusyDay.destroy( { where: { date: req.params.dates } } ).then(function(data)
	// 	{
	// 		// If the level is not 1, re-insert it (level 1 has no status)
	// 		if(req.params.level > 1) {
	// 			var entries = [];
	// 			for(var i = 0; i < req.params.dates.length; ++i)
	// 			{
	// 				entries.push( { date: req.params.dates[i], busy_level: req.params.level } );
	// 			}

	// 			req.db.BusyDay.bulkCreate(entries).then(function(data)
	// 			{
	// 				res.send({});
	// 				return next();
	// 			});
	// 		}
	// 		else {
	// 			res.send({});
	// 			return next();
	// 		}
	// 	});
	// });

};
