"use strict";

//Librerías locales
const DAOPublicacion = require("./public/javascripts/DAOPublicacion");
const config = require("./config");

//Librerías externas
const express = require("express");
const app = express();

//Constantes para la base de datos
const mysql = require("mysql");
const { append } = require("express/lib/response");
const express = require("express");
const pool = mysql.createPool({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});


//Vista de datos básicos de publicación
app.get("/leerPublicacion", function(request, response){
	let daoPublicacion = new DAOPublicacion(pool);
	daoPublicacion.leerPublicacion(function(err, result) {
		if(err) {
			console.log(err);
			let busq = "Ha ocurrido un error: " + err;
			response.render("indice", {usuario: request.session.currentUser, nick: request.session.userNick, img: request.session.img, 
				busqueda: busq, array: []});
		}
		else {
			let busq = "Vista de publicación";
			response.render("indice", {usuario: request.session.currentUser, nick: request.session.userNick, img: request.session.img, 
				busqueda: b, array: result});
		}
	});
});

  function operar(i1, op, i2){
	let res;

	switch (op){
		case "+":
			res = i1+i2;
			break;
		case "-":
			res = i1-i2;
			break;
		case "*":
			res = i1*i2;
			break;
		case "/":
			if(i2 !== 0)
				res = i1/i2;
			break;
		default:
			break;
	}
	return (isNaN(res) || res === undefined) ? "Debe introducir valores válidos" : res;
  }

  module.exports = operar;


  