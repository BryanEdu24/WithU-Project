"use strict";
const DAOPublicacion = require("./DAOPublicacion");

class SAPublicacion {
	constructor(pool){
		this._pool = pool;
	}
    
	agregarPublicacion(publicacion, callback) { //Publicación debería ser una estructura {titulo, cuerpo}
		if(publicacion.titulo !== "" || publicacion.cuerpo !== ""){
			callback("No puede haber campos vacios");
		}
		else{
			if(publicacion.titulo.length > 50){
				callback("El titulo tiene más de 50 caracteres");
			}
			else{
				if(publicacion.cuerpo.length < 90){
					callback("El cuerpo es demasiado corto");
				}
				else{
					let dao = new DAOPublicacion(pool);
					dao.agregarPublicacion(publicacion, callback);
				}
			}
		}
	}

	leerPublicacion(id, callback) {
		//Comprobar datos
		if (isNaN(id)) { //El id tiene que ser un número
			callback("El id no es un número");
		}
		else if(id <= 0) { //El id tiene que ser mayor que 0 
			callback("El id no es mayor que 0");
		}
		else { //Si todo es correcto...
			let DAO = new DAOPublicacion(pool);
			DAO.leerPublicacion(id, callback);
		}
	}

}

module.exports = SAPublicacion;