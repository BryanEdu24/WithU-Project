"use strict";
const DAOUsuario = require("./DAOUsuario");

class SAUsuario {
	constructor(pool){
		this._pool = pool;
	}
    
//usuario.username, usuario.password, usuario.email 
	agregarUsuario(usuario, callback) { //Usuario debería ser una estructura {username, email, password, confirmPassword}
		if(usuario === undefined || usuario === null || usuario.username === "" 
            || usuario.email === "" || usuario.password === "" || usuario.confirmPassword === ""){
			callback("No puede haber campos vacios");
		}
		else if(usuario.username.length < 3){
			callback("El nombre de usuario debe contener al menos 3 caracteres");
		}
		else if(usuario.username.length > 15){
			callback("El nombre de usuario es demasiado largo");
		}
		else if(!usuario.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
			callback("El formato del correo no es correcto");
		}
		else if(usuario.password.length < 5){
			callback("La contraseña es demasiado debil");
		}
		else if(usuario.password.length > 20){
			callback("La contraseña es demasiado larga");
		}
        else if(usuario.password !== usuario.confirmPassword){
            callback("Las contraseñas no coinciden");
        }
		else{
			let dao = new DAOUsuario(this._pool);
            dao.leerUsuarioPorCorreo(usuario.email, function(err,user){
                if(err){
                    callback(err);
                }
                else{
                    if(user){
                        callback("El correo ya ha sido registrado");
                    }
                    else{
                        dao.leerUsuarioPorUsername(usuario.username, function(err,user){
                            if(err){
                                callback(err);
                            }
                            else{
                                if(user){
                                    callback("El nombre de usuario ya ha sido registrado");
                                }
                                else{
                                    console.log(usuario)
                                    dao.agregarUsuario(usuario, function(err,id){
                                        if(err){
                                            callback(err);
                                        }
                                        else{
                                            callback(null, id);
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
		}
    }

    buscarUsuario(usuario, password, callback){//User puede ser username o email
        if(usuario === "" || usuario === undefined || usuario === null || password === "" 
        || password === undefined || password === null){
            callback("No puede haber campos vacios")
        }
        else if(password.length < 5 || password.length > 20){
            callback("La longitud de la contraseña no es la correcta")
        }
        else{
            let dao = new DAOUsuario(this._pool);
            dao.leerUsuarioPorCorreo(usuario, function(err,user1){
                if(err){
                    callback(err)
                }
                else{
                    if(user1){
                        console.log(user1);
                        if(user1.Password === password){
                            callback(null, user1)
                        }
                        else{
                            callback("Contraseña incorrecta")
                        }                        
                    }
                    else{
                        dao.leerUsuarioPorUsername(usuario, function(err,user2){
                            if(err){
                                callback(err);
                            }
                            else{
                                if(user2){
                                    console.log(user2);
                                    if(user2.Password === password){
                                        callback(null, user2)
                                    }
                                    else{
                                        callback("Contraseña incorrecta")
                                    }
                                }
                                else{
                                    callback("El usuario no existe")
                                }
                            }
                        });
                    }
                }
            });
        }
    }
}
module.exports = SAUsuario;