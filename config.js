"use strict";

const { required } = require("nodemon/lib/config");

module.exports = {
	host: "localhost",
	user: "root",
	password: "",
	database: "withu"
}
// Si no funciona
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
