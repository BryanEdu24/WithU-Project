"use strict"

class DAOUsuario {
	constructor(pool){
		this._pool = pool;
	}

    async agregarUsuario(usuario, callback){//El usuario es: username, password, email
        this._pool.getConnection(function(err, connection) {
			if (err) {
				callback("Error de conexión a la base de datos");
			}
			else {
				connection.query("INSERT INTO usuario (username, email, password) VALUES (?, ?, ?)",  [ usuario.username, usuario.email, usuario.password], 
				function(err, result) {
					connection.release();
					if (err) {
						callback("Ha ocurrido un error en la base de datos, por favor intentelo de nuevo más tarde");
					}
					else {
						callback(null, result.insertId);
					}
				});
			}
		});



        
    }

    leerUsuarioPorUsername(username, callback){
        this._pool.getConnection(function(err, connection) {
            if (err) {
                connection.release();
                callback(new Error("Error de conexion a la base de datos"));
            }
            else {
                connection.query("SELECT * FROM usuario WHERE Username=?" , [username] ,//Aquí va la query a la BD
                    function(err, rows) {
                        connection.release();
                        if (err) {
                            callback(new Error("Error de conexion a la base de datos"));
                        }
                        else {
                            //Aquí se tratan los datos y llama al callback (Habría que devolver el ID generado por el insert)
                            let usuario;
                            if(rows[0]!==undefined){
                                usuario = {
                                    ID: rows[0].ID, 
                                    Email: rows[0].Email,
                                    Username: rows[0].Username,
                                    Password: rows[0].Password,
                                };
                            }
                            callback(null,usuario);
                        }
                    }
                );
            }
        });
    }

    leerUsuarioPorCorreo(correo, callback){
        this._pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexion a la base de datos"));
            }
            else {
                connection.query("SELECT * FROM usuario WHERE Email=?" , [correo] ,//Aquí va la query a la BD
                    function(err, rows) {
                        console.log(rows);
                        connection.release();
                        if (err) {
                            callback(new Error("Error de conexion a la base de datos"));
                        }
                        else {
                            //Aquí se tratan los datos y llama al callback (Habría que devolver el ID generado por el insert)
                            let usuario;
                            if(rows[0]!==undefined){
                                usuario = {
                                    ID: rows[0].ID, 
                                    Email: rows[0].Email,
                                    Username: rows[0].Username,
                                    Password: rows[0].Password,
                                };
                            }
                            callback(null,usuario);
                        }
                    }
                );
            }
        });
    }
}
module.exports = DAOUsuario;