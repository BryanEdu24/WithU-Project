"use strict";

//Librerías locales
const SAPublicacion = require("./public/javascripts/SAPublicacion");
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
app.get("/leerPublicacion/:id", function(request, response){
	let SA = new SAPublicacion(pool);
	let id = request.params.id;
	SA.leerPublicacion(id, function(err, result) {
		if(err) {
			console.log(err);
			response.redirect("/crearPublicacion");
		}
		else {
			let busq = "Vista de publicación";
			response.render("verPublicacion", {publicacion:result});
		}
	});
});



  