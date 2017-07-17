
module.exports.createChoice = function(req, res, connection) {
	var resp = {}
	resp.success = false;
	if (req.body.QId===undefined) {
		resp.errormsg = "QId undefined";
	}

	if (req.body.QDescription===undefined) {
		resp.errormsg = "QDescription undefined";
	}

	if (resp.errormsg!==undefined) {
		res.end(JSON.stringify(resp));
	}
	else {
		var QDescription = connection.escape(req.body.QDescription);
		var QId = connection.escape(req.body.QId);

		var insertQuery = "INSERT INTO QuestionChoice ( QuestionTypeID, Description) values  (" + QId + "," + QDescription + "," + 0 + ")";
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