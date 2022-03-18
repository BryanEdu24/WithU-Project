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

}
module.exports = DAOPublicacion;