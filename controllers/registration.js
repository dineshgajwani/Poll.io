var bcrypt = require('bcrypt-nodejs');
var qs      = require('querystring');
var mysql   = require('mysql');


module.exports.register = function(req, res, connection) {
	var resp = {};
	console.log(req.body);

	resp.success = false;
	errormsg = "";
	if (req.body.email===undefined) {
		errormsg += "email undefined :";
	}
	if (req.body.password===undefined) {
		errormsg += "password undefined :";
	}
	if (errormsg != "") {
		resp.errormsg = errormsg;
	}

	var selectQuery = "SELECT Count(Id) AS 'count' FROM User u WHERE u.email=" + connection.escape(req.body.email);
	console.log(selectQuery);
	connection.query(selectQuery, function(err, rows, fields) {
		console.log("ROWS:");
		console.log(rows);
		if (err) {
			resp.success = false;
			resp.errormsg = "db failure";
			res.end(JSON.stringify(resp));
		}
		else {
			if(rows[0].count != 0) {
				resp.success = false;
				resp.errormsg = "Email is already in use.";
				res.end(JSON.stringify(resp));
			}
		}
	});

	if (resp.errormsg!==undefined) {
		res.end(JSON.stringify(resp));
	}
	else {
		var email = connection.escape(req.body.email);
		var password = connection.escape(req.body.password);


		var insertQuery = "INSERT INTO User ( Email, PasswordHash) values  (" + email + "," + password+ ")";
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