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
		listarRespuestasPorPublicacion(idP,callback){
			this._pool.getConnection(function(err, connection) {
				if (err) {
					connection.release();
					callback(new Error("Error de conexion a la base de datos"));
				}
				else {
					connection.query("SELECT * FROM respuesta WHERE IDPub =?",[idP], //Aquí va la query a la BD
						function(err, rows) {
							connection.release();
							if (err) {
								callback(new Error("Error de conexion a la base de datos"));
							}
							else {
								let listaRespuesta = Array.from(new Set(
									rows.map(l => l.idPub))).map(id => {
										return {
											ID: id, 
											Cuerpo: rows.find(l => l.idPub === idPub).Cuerpo,
											idPub: rows.find(l => l.idPub === idPub).idPub,
										}
									});
								callback(null,listaRespuesta);
							}
						}
					);
				}
			});
		}
}
module.exports = DAORespuesta;