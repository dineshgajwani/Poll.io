
module.exports.createPoll = function(req, res, connection) {
	var resp = {}
	resp.success = false;
	if (req.body.pollname===undefined) {
		resp.errormsg = "pollname undefined";
	}

	if (req.body.pollkey===undefined) {
		resp.errormsg = "pollkey undefined";
	}

	if (resp.errormsg!==undefined) {
		res.end(JSON.stringify(resp));
	}
	else {
		var pollname = connection.escape(req.body.pollname);
		var pollkey = connection.escape(req.body.pollkey);
		//var userid = connection.escape(req.body.pollkey);


		var insertQuery = "INSERT INTO Poll ( Name, Key, UserId) values  (" + pollname + "," + pollkey + "," + 0 + ")";
		console.log(insertQuery);
		connection.query(insertQuery, function(err, rows, fields) {
			resp.success = true;
			if (err) {
				resp.success = false;
				resp.errormsg = "db entry failed";
			}
			res.end(JSON.stringify(resp));
		});
		connection.release();
	}
}