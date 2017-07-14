var http    = require('http');
var url     = require('url');
var request = require('request');
var qs      = require('querystring');
var mysql   = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

var registration     = require('./controllers/registration');
var login            = require('./controllers/login');

console.log("Imports done");

var pool = mysql.createPool({
    connectionLimit : 50,
    host     : 'localhost',
    user     : 'root',
    password : 'manchesterisred',
    database : 'Poll.io',
    multipleStatements: true
});

console.log("MySQL connection pool created");

var MasterApp = function() {

    var self = this;

    self.setupVariables = function() {
        self.ipaddress = '127.0.0.1';
        self.port      = 8080;
    };

    self.initializeServer = function() {
        self.app = express();
        self.app.use(express.static('./public'));
        self.app.use(bodyParser.urlencoded({extended: true}));
        self.app.use(bodyParser.json());

        self.mainRouter = express.Router();
        self.app.use('/', self.mainRouter);

        self.mainRouter.post('/login', function(req, res) {
            pool.getConnection(function(err, connection) {
                login.login(req, res, connection);       
            });
        });
        self.mainRouter.post('/register', function(req, res) {
            pool.getConnection(function(err, connection) {
                registration.register(req, res, connection);       
            });
        });  

    };

    self.initialize = function() {
        self.setupVariables();
        self.initializeServer();
    };

    self.start = function() {
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...', Date(Date.now()), self.ipaddress, self.port);
        });
    };

}; 

var server = new MasterApp();
server.initialize();
server.start();