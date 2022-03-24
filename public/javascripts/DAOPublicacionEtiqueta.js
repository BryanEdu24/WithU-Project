"use strict";


class DAOPublicacionEtiqueta {
	constructor(pool) {
		this._pool = pool;
	}

	agregarPublicacionEtiqueta(idP, idE, callback) { //Publicación debería ser una estructura {titulo, cuerpo}
		this._pool.getConnection(function(err, connection) {
			if (err) {
				connection.release();
				callback("Error de conexion a la base de datos");
			}
			else {
				connection.query("INSERT INTO publicacionetiqueta (IDPub, IDEti) VALUES (?, ?)",  [ idP, idE ], //Aquí va la query a la BD
					function(err, result) {
						connection.release();
						if (err) {
							callback("Los datos no son correctos.");
						}
						else {
							//Aquí se tratan los datos y llama al callback (Habría que devolver el ID generado por el instert)
							callback(null);
						}
					}
				);
			}
		});
	}
}
module.exports = DAOPublicacionEtiqueta;