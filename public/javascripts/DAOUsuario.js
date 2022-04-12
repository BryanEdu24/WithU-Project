"use strict"

class DAOUsuario {
	constructor(pool){
		this._pool = pool;
	}

    async añadirUsuario(usuario, callback){//El usuario es: username, password, email
        let conexion
        try {
            conexion = await this._pool.getConnection();
            let existe = await conexion.query("SELECT ID FROM usuario WHERE Username = ? OR Email = ?" , [usuario.username, usuario.email])
            if(existe.length === 0){
                let result = await conexion.query("INSERT INTO usuario (Titulo, IDSec, Cuerpo) VALUES (?, ?, ?)", [usuario.username, usuario.password, usuario.email])
                await conexion.release()
                callback(null, result.insertId) 
            }
            
            
        } catch (error) {
            conexion.release()
            callback(error)
        }
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
                                    Password: rows[0].Contraseña,
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
                connection.release();
                callback(new Error("Error de conexion a la base de datos"));
            }
            else {
                connection.query("SELECT * FROM usuario WHERE Email=?" , [correo] ,//Aquí va la query a la BD
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
                                    Password: rows[0].Contraseña,
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