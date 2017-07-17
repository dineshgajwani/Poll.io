
module.exports.createQuestion = function(req, res, connection) {
	var resp = {}
	resp.success = false;
	if (req.body.QDescription===undefined) {
		resp.errormsg = "QDescription undefined";
	}

	if (req.body.QTypeId===undefined) {
		resp.errormsg = "QTypeId undefined";
	}

	if (resp.errormsg!==undefined) {
		res.end(JSON.stringify(resp));
	}
	else {
		var QDescription = connection.escape(req.body.QDescription);
		var QTypeId = connection.escape(req.body.QTypeId);
		//var PollId = connection.escape(req.body.PollId);

		var insertQuery = "INSERT INTO Question ( Description, QuestionTypeID, PollId) values  (" + QDescription + "," + QTypeId + "," + 0 + ")";
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

