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
// const { append } = require("express/lib/response");
// const { hasUncaughtExceptionCaptureCallback } = require("process");
const pool = mysql.createPool({
	multipleStatements: true,
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
const DAOSeccion = require("./public/javascripts/DAOSeccion");
const SAUsuario = require("./public/javascripts/SAUsuario");
var sections = [];

const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore({
	host: config.host,
	user: config.user,
	password: config.password,
	// createDatabaseTable: false,
	// clearExpired: true,
	// checkExpirationInterval: 30000,
	// expiration: 1000,
	database: config.database
	// schema: {
	// 	tableName: "sessions",
	// 	columnNames: {
	// 	   session_id: "session_id",
	// 	   expires: "expires",
	// 		data: "data"
	// 	   //user: "user"
	//    }
	// }
});

app.use(session({
    name: "session-id",
    secret: "GFGEnter", // Secret key,
    saveUninitialized: false,
    resave: false,
	store: sessionStore
	// cookie: {
	// 	maxAge: 3600000,
	// 	sameSite: true
	// }
}))

function middleSecciones(req,res,next){
	let daoSec = new DAOSeccion(pool);
	if(sections.length === 0){
		try{
			daoSec.leerTodas(function(err, secciones){
				if(err)
					sections = [];
				else {
					sections = secciones;
				}
				next();
			});
		}catch(err){
			sections = [];
			next();
		}
	}
	else{
		next()
	}
	
}
app.use(middleSecciones);

function middleLogueado(req, res, next){
	//if usuario loggueado, next
	if(req.session.user){
		next()
	}
	else res.redirect("/login")
}

function middleNoLogueado(req, res, next){
	//if usuario loggueado, next
	if(!req.session.user){
		next()
	}
	else res.redirect("/seccion/1")
}

// Crear una publicacion
app.post('/crearPublicacion', multerFactory.none(), function (req, res) {
	let publicacion = {
		titulo: req.body.publicacion.titulo,
		cuerpo : req.body.publicacion.cuerpo,
		seccion : req.body.publicacion.seccion
	}
	let etiquetas = req.body.etiquetas ? [req.body.etiquetas.etiqueta1,req.body.etiquetas.etiqueta2,req.body.etiquetas.etiqueta3,
req.body.etiquetas.etiqueta4,req.body.etiquetas.etiqueta5] : [];

	publicacion.etiquetas = etiquetas.filter((item,index)=>{
			return item !== undefined && etiquetas.indexOf(item) === index;
	});

	let sa = new SAPublicacion(pool);
	sa.agregarPublicacion(publicacion, function(err, id) {
		if(err){
			console.log(err);
			res.render("mensaje", {mensaje : err});
		}
		else{
			let msg= "Se ha creado la publicación con éxito con id:" + id;
			res.render("mensaje", {mensaje : msg, id : id});
		}
	});
});

//Registrar un usuario
app.post("/registrarUsuario", multerFactory.none(), function(req, res) {
	console.log("entro")
	let usuario = {
		email: req.body.usuario.email,
		username: req.body.usuario.username,
		password: req.body.usuario.password,
		confirmPassword: req.body.usuario.confirmPassword,
	};

	console.log(usuario)

	let sa = new SAUsuario(pool);
	sa.agregarUsuario(usuario, function(err, id){
		if(err){
			console.log(err);
			res.render("mensaje", {mensaje : err});
		}
		else{
			let msg= "Se ha creado el usuario correctamente con id: " + id + " y nombre de usuario: " + usuario.username;
			res.render("mensaje", {mensaje : msg, id : id});
		}
	});
});


//Vista de datos básicos de publicación
app.get("/leerPublicacion/:id", function(req, res){
	let SA = new SAPublicacion(pool);
	let id = req.params.id;
	SA.leerPublicacion(id, function(err, result) {
		if(err) {
			console.log(err);
			res.redirect("/error404");
		}
		else {
			res.render("verPublicacion", {publicacion: result, secciones:sections});
		}
	});
	
});

app.get("/crearPublicacion", middleLogueado, function(req,res){
	res.render("crearPublicacion",{secciones:sections});
});

//Busqueda de publicacion por seccion
app.get("/seccion/:id", function(req, res){
	let SA = new SAPublicacion(pool);
	let id = req.params.id;
	SA.leerPublicacionesPorSeccion(id, function(err, result) {
		if(err) {
			console.log(err);
			res.redirect("/error404");
		}
		else {
			res.render("buscarPorSeccion", {publicaciones: result, secciones:sections});
		}
	});
});

app.post("/login", multerFactory.none(), function(req,res){
	let saUsuario = new SAUsuario(pool)
	console.log("entro")
	try{
		let user = {
			username: req.body.user.username,
			password: req.body.user.password
		}	
		console.log(user)
		saUsuario.buscarUsuario(user.username, user.password, function(err, usr){
			console.log(err)
			if(err){						
				res.render("inicioSesion", {secciones:sections, exito: false});						
			}
			else{
				req.session.user = usr.Username						
				res.redirect("/seccion/1")
			}
		});
	}catch(err){
		res.render("inicioSesion", {secciones:sections, exito: true});
	}
});


app.get("/login", middleNoLogueado, function(req,res){
	res.render("inicioSesion", {secciones:sections, exito: true});
});

app.get("/registroUser", function(req,res){
	let daoSec = new DAOSeccion(pool);
			try {
				daoSec.leerTodas(function(err, sec){
					if(sec === undefined){
						sec = [];
					}
					res.render("registroUsuario", {secciones:sec});
				});
			}catch(err){
				let sec = [];
				res.render("registroUsuario", {secciones:sec});
			}
});

app.get("/", function(req,res){
	res.redirect("/login");
});

app.get("*", function(req,res){
	res.render("error404");
});

app.listen(80, () => {
    console.log("Escuchando en el puerto 80");
});