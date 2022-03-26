"use strict";
const DAOPublicacion = require("./DAOPublicacion");
const DAOSeccion = require("./DAOSeccion");


class SAPublicacion {
	constructor(pool){
		this._pool = pool;
	}
    
	agregarPublicacion(publicacion, callback) { //Publicación debería ser una estructura {titulo, cuerpo}
		
		if(publicacion === undefined || publicacion === null || publicacion.titulo === undefined || publicacion.cuerpo === undefined || publicacion.cuerpo === undefined || publicacion.seccion === undefined){
			callback("El objeto no es una publicacion");
		}
		else if(publicacion.titulo === "" || publicacion.cuerpo === "" || publicacion.seccion === ""){
			callback("No puede haber campos vacios");
		}
		else if(publicacion.titulo.length > 50){
			callback("El titulo tiene más de 50 caracteres");
		}
		else if(publicacion.cuerpo.length < 90){
			callback("El cuerpo debe tener más de 90 caracteres");
		}
		else if(isNaN(publicacion.seccion) && publicacion.seccion <= 0) {
			callback("La seccion no es correcta");
		}
		else{
			let pul = this._pool;
			let daoS =new DAOSeccion(this._pool);
			daoS.leerSeccion(publicacion.seccion,function(err,seccion){
				if(err){
					callback(err);
				}
				else{
					if(seccion !== undefined){
						let dao = new DAOPublicacion(pul);
						dao.agregarPublicacion(publicacion, callback);
					}
					else{
						callback("La seccion no es correcta");
					}

				}
			});
			
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
			let DAO = new DAOPublicacion(this._pool);
			DAO.leerPublicacion(id, callback);
		}
	}

	leerPublicacionesPorSeccion(idSec, callback) {
		if (idSec === undefined || isNaN(idSec) || idSec <= 0) {
			callback("Error al seleccionar la publicacion");
		}
		else {
			let daoSec = new DAOSeccion(this._pool);
			daoSec.leerSeccion(idSec, function(sec){
				if(err){
					callback("La seccion no existe");
				}
				else{
					let daoPub = new DAOPublicacion(this._pool);
					daoPub.leerPublicacionesPorSeccion(idSec,callback);
				}
			});
		}
	}

}

module.exports = SAPublicacion;