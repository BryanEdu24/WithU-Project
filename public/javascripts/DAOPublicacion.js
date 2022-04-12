"use strict";
const DAOEtiqueta = require("./DAOEtiqueta");
const DAOPublicacionEtiqueta = require("./DAOPublicacionEtiqueta");
class DAOPublicacion {
	constructor(pool) {
		this._pool = pool;
	}
	
	agregarPublicacion(publicacion, callback) { //Publicación debería ser una estructura {titulo, cuerpo}
		this._pool.getConnection(function(err, connection) {
			if (err) {
				callback("Error de conexión a la base de datos");
			}
			else {
				connection.query("CALL crearPublicacion(?,?,?,?,@output)",  [ publicacion.titulo, publicacion.cuerpo, publicacion.seccion, publicacion.etiquetas ], 
				function(err, rows) {
					connection.release();
					if (err) {
						callback("Ha ocurrido un error en la base de datos, por favor intentelo de nuevo más tarde");
					}
					else {
						callback(null, rows[0][0]['']);
					}
				});
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
							let publicacion={ID:rows[0].ID,Titulo:rows[0].Titulo,Cuerpo:rows[0].Cuerpo};
							callback(null,publicacion);
						}
					}
				);
			}
		});
	}

	leerPublicacionPorSeccion(IDSec, callback) {
		this._pool.getConnection(function(err, connection) {
			if (err) {
				connection.release();
				callback(new Error("Error de conexion a la base de datos"));
			}
			else {
				connection.query("SELECT p.ID, p.Titulo, p.Cuerpo, e.Nombre " +
				"FROM publicacion p JOIN publicacionetiqueta pe ON (p.ID = pe.IDPub) JOIN etiqueta e ON (e.ID = pe.IDEti) " +
				"WHERE p.IDSec = ? " +
				"ORDER BY p.id" , [IDSec],
					function(err, rows) {
						connection.release(); // devolver al pool la conexión
						if (err) {
							callback(err);
						}
						else {
							let publicacionesDistintas = Array.from(new Set(
							rows.map(t => t.ID))).map(ID => {
								return {
									ID: ID,
									Titulo: rows.find(t => t.ID === ID).Titulo,
									Cuerpo: rows.find(t => t.ID === ID).Cuerpo,
									IDSec: rows.find(t => t.ID === ID).IDSec,
									Etiquetas: Array.from(rows.map(function(t){
												if(t.ID === ID)
													return t.Nombre;
											})).filter(t => t!==undefined)
								}
						});
						callback(null, publicacionesDistintas);
					}
				});
			}
		})
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