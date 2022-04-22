"use strict";


class DAORespuesta {
	constructor(pool) {
		this._pool = pool;
	}

	agregarRespuesta(resp, callback) { //Publicación debería ser una estructura {cuerpo, IdPub}
		this._pool.getConnection(function(err, connection) {
			if (err) {
				callback("Error de conexion a la base de datos");
			}
			else {
				connection.query("INSERT INTO respuestas (idPub, cuerpo) VALUES (?, ?)",  [ resp.idPub, resp.cuerpo ], //Aquí va la query a la BD
					function(err, result) {
						connection.release();
						if (err) {
							console.log(err);
							callback("Los datos no son correctos.");
						}
						else {
							//Aquí se tratan los datos y llama al callback (Habría que devolver el ID generado por el instert)
							console.log(result);
							callback(null);
						}
					}
				);
			}
		});
	}
}
module.exports = DAORespuesta;