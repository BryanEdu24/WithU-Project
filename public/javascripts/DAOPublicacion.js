"use strict";
const DAOEtiqueta = require("./DAOEtiqueta");
const DAOPublicacionEtiqueta = require("./DAOPublicacionEtiqueta");
class DAOPublicacion {
	constructor(pool) {
		this._pool = pool;
	}
	
	agregarPublicacion(publicacion, callback) { //Publicación debería ser una estructura {titulo, cuerpo}
		this._pool.getConnection(function(err, connection) {
			connection.release();
			if (err) {
				callback("Error de conexion a la base de datos");
			}
			else {
				connection.query("INSERT INTO publicacion (Titulo, IDSec, Cuerpo ) VALUES (?, ?, ?)",  [ publicacion.titulo, publicacion.seccion, publicacion.cuerpo ], //Aquí va la query a la BD
					function(err, result) {
						if (err) {
							callback("Los datos no son correctos.");
						}
						else {
							//Aquí se tratan los datos y llama al callback (Habría que devolver el ID generado por el instert)
							callback(null, result.insertId);
						}
					}
				);
			}
		});
	}

	leerPublicacion(ID,callback) {
		this._pool.getConnection(function(err, connection) {
			if (err) {
				connection.release();
				callback(new Error("Error de conexion a la base de datos"));
			}
			else {
				connection.query("SELECT * FROM publicacion WHERE ID=?" ,[ID] ,//Aquí va la query a la BD
					function(err, rows) {
						connection.release();
						if (err) {
							callback(new Error("Error de conexion a la base de datos"));
						}
						else {
							//Aquí se tratan los datos y llama al callback (Habría que devolver el ID generado por el insert)
							let publicacion={
								ID:rows[0].ID, 
								Titulo: rows[0].Titulo, 
								Cuerpo: rows[0].Cuerpo, 
								Seccion: rows[0].IDSec, 
								Etiquetas: rows[0].Etiquetas
							};
							callback(null,publicacion);
						}
					}
				);
			}
		});
	}

	
/*
	listarPublicaciones(callback){
		this._pool.getConnection(function(err, connection) {
			if (err) {
				connection.release();
				callback(new Error("Error de conexion a la base de datos"));
			}
			else {
				connection.query("SELECT * FROM Publicacion", //Aquí va la query a la BD
					function(err, rows) {
						connection.release();
						if (err) {
							callback(new Error("Error de conexion a la base de datos"));
						}
						else {
							let listaPublicaciones = Array.from(new Set(
								rows.map(l => l.ID))).map(id => {
									return {
										ID: id, 
										Titulo: rows.find(l => l.id === id).Titulo,
										Cuerpo: rows.find(l => l.id === id).Cuerpo,
									}
								});
							callback(null,listaPublicaciones);
						}
					}
				);
			}
		});
	}
*/
}
module.exports = DAOPublicacion;
