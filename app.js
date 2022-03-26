"use strict";

//Librerías locales
const SAPublicacion = require("./public/javascripts/SAPublicacion");
const config = require("./config");

//Librerías externas
const express = require("express");
const app = express();

const multer = require("multer");
const multerFactory = multer({ storage: multer.memoryStorage() });
const bodyParser = require("body-parser");
const path = require("path");
//Constantes para la base de datos
const mysql = require("mysql");
const { append } = require("express/lib/response");
const { hasUncaughtExceptionCaptureCallback } = require("process");
const pool = mysql.createPool({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

//Sesiones de usuarios (Para flash necesitamos un usuario invitado. Pasará a ser el usuario logueado cuando implementemos el login)
const session = require("express-session");
// const mysqlSession = require("express-mysql-session");
// const MySQLStore = mysqlSession(session);

// const sessionStore = new MySQLStore({
// 	host: config.host,
// 	user: config.user,
// 	password: config.password,
// 	database: config.database
// });

const middleSession = session({
    resave: false,
	//store: sessionStore,
    saveUninitialized: false,
    secret: "miclavesecreta",
});
app.use(middleSession);
// Creacion y obtencion de flash (Vista)
function middleFlash(request, response, next) {
    response.setFlash = (str) => {
        //request.flashMessage = str;
        request.session.flashMessage = str;
    }
    response.locals.getFlash = () => {
        /*
		let mensaje = request.flashMessage;
        delete request.flashMessage;
        return mensaje;
		*/
        let mensaje = request.session.flashMessage;
        delete request.session.flashMessage;
        return mensaje;
    }
    next();
}
app.use(middleFlash);

// Crear una publicacion
app.post('/crearPublicacion', multerFactory.none(), function (req, res) {
	let publicacion = {
		titulo: req.body.publicacion.titulo,
		cuerpo : req.body.publicacion.cuerpo,
		seccion : req.body.publicacion.seccion
	}
	let etiquetas = [req.body.etiquetas.etiqueta1,req.body.etiquetas.etiqueta2,req.body.etiquetas.etiqueta3,
	req.body.etiquetas.etiqueta4,req.body.etiquetas.etiqueta5];

	publicacion.etiquetas = etiquetas.filter((item,index)=>{
			return item !== undefined && etiquetas.indexOf(item) === index;
	});

	console.log(publicacion.etiquetas)
	let sa = new SAPublicacion(pool);
	sa.agregarPublicacion(publicacion, function(err, id) {
		if(err){
			console.log(err);
			res.setFlash(err);
			res.redirect("/crearPublicacion");
		}
		else{
			res.setFlash("Se ha creado la publicación con éxito con id:" + id);
			res.redirect("/crearPublicacion");
		}
	});
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
			response.render("verPublicacion", {publicacion: result});
		}
	});
});

app.get("/crearPublicacion", function(req,res){
	res.render("crearPublicacion");
});

app.get("/", function(req,res){
	res.render("crearPublicacion");
});


app.listen(3000, () => {
    console.log("Escuchando en el puerto 3000");
});