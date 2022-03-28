"use strict";

class DAOEtiqueta {
	constructor(pool) {
		this._pool = pool;
	}
	
	agregarEtiqueta(nombre, callback) { //Publicación debería ser una estructura {titulo, cuerpo}
		this._pool.getConnection(function(err, connection) {
			if (err) {
				connection.release();
				callback("Error de conexion a la base de datos");
			}
			else {
				connection.query("INSERT INTO etiqueta (Nombre) VALUES (?)",  [ nombre ], //Aquí va la query a la BD
					function(err, result) {
						connection.release();
						if (err) {
							callback(err);
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
	
	leerEtiqueta(id, callback){
		this._pool.getConnection(function(err, connection) {
			if (err) {
				connection.release();
				callback("Error de conexion a la base de datos");
			}
			else {
				connection.query("SELECT * FROM etiqueta WHERE ID = ?",  [ id ],
					function(err, rows) {
						connection.release();
						if (err) {
							callback("Los datos no son correctos.");
						}
						else {
							let etiqueta = rows[0];
							callback(null, etiqueta);
						}
					}
				);
			}
		});
	}

	leerEtiquetaPorNombre(nombre, callback){
		this._pool.getConnection(function(err, connection) {
			if (err) {
				connection.release();
				callback("Error de conexion a la base de datos");
			}
			else {
				connection.query("SELECT * FROM etiqueta WHERE Nombre = ?",  [ nombre ],
					function(err, rows) {
						connection.release();
						if (err) {
							callback("Los datos no son correctos.");
						}
						else {
							let etiqueta = rows[0];
							callback(null, etiqueta);
						}
					}
				);
			}
		});
	}
}
module.exports = DAOEtiqueta;