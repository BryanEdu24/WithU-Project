"use strict";

class DAOPublicacion {
	constructor(pool) {
		this._pool = pool;
	}
	
	agregarPublicacion(publicacion, callback) { //Publicación debería ser una estructura {titulo, cuerpo}
		callback("error");
		/*
		this._pool.getConnection(function(err, connection) {
			if (err) {
				//connection.release();
				callback(err);
			}
			else {
				connection.query(" " , //Aquí va la query a la BD
					function(err, rows) {
						connection.release();
						if (err) {
							callback(err);
						}
						else {
							//Aquí se tratan los datos y llama al callback (Habría que devolver el ID generado por el instert)
							callback(null, preguntasDistintas);
						}
					}
				);
			}
		});
		*/
	}

	leerPublicacion(ID,callback) {
		this._pool.getConnection(function(err, connection) {
			if (err) {
				connection.release();
				callback(err);
			}
			else {
				connection.query("SELECT * FROM Publicacion WHERE ID=?" ,[ID] ,//Aquí va la query a la BD
					function(err, rows) {
						connection.release();
						if (err) {
							callback(err);
						}
						else {
							//Aquí se tratan los datos y llama al callback (Habría que devolver el ID generado por el insert)
							let publicacion={ID:rows[0].ID,Titulo:rows[0].Titulo,Cuerpo:rows[0].Cuerpo};
							callback(null,publicacion);
						}
					}
				);
			}
		});
		
	}

}
module.exports = DAOPublicacion;

/*const mysql = require("mysql");
const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "withu"
});
function leer(){
	let dao= new DAOPublicacion(pool);
	dao.leerPublicacion(1,function(err,pub){
		if(err){
			console.log(err);
		}
		else{
			console.log(pub);
		}
	});
}
leer();*/