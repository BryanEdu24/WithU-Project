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
}