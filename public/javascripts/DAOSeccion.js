"use strict";
class DAOSeccion {
	constructor(pool) {
		this._pool = pool;
	}
	
	
	leerSeccion(ID,callback) {
		this._pool.getConnection(function(err, connection) {
			if (err) {
				connection.release();
				callback(new Error("Error de conexion a la base de datos"));
			}
			else {
				connection.query("SELECT * FROM seccion WHERE ID=?" ,[ID] ,//Aquí va la query a la BD
					function(err, rows) {
						connection.release();
						if (err) {
							callback(new Error("Error de conexion a la base de datos"));
						}
						else {
							//Aquí se tratan los datos y llama al callback (Habría que devolver el ID generado por el insert)
							let Seccion;
							if(rows[0]!==undefined){
								Seccion = {
									ID: rows[0].ID, 
									Nombre: rows[0].Nombre
								};
							}
							callback(null,Seccion);
						}
					}
				);
			}
		});
	}

	leerTodas(callback){
		this._pool.getConnection(function(err, connection) {
			if (err) {
				callback(new Error("Error de conexion a la base de datos"));
			}
			else {
				connection.query("SELECT * FROM seccion", //Aquí va la query a la BD
					function(err, rows) {
						connection.release();
						if (err) {
							callback(new Error("Error de conexion a la base de datos"));
						}
						else {
							let secciones = Array.from(new Set(
								rows.map( r => {
									return {
										ID: r.ID, 
										Nombre: r.Nombre,
									}
								})));
							callback(null,secciones);
						}
					}
				);
			}
		});
	}

}
module.exports = DAOSeccion;

/*const mysql = require("mysql");
const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "withu"
});
function leer(){
	let dao= new DAOSeccion(pool);
	dao.leerSeccion(1,function(err,pub){
		if(err){
			console.log(err);
		}
		else{
			console.log(pub);
		}
	});
}
leer();*/
