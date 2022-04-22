/*"use strict";
const DAOEtiqueta = require("./DAOEtiqueta");
const DAOPublicacion = require("./DAOPublicacion");
const DAOPublicacionEtiqueta = require("./DAOPublicacionEtiqueta");
const DAOSeccion = require("./DAOSeccion");


class SARespuesta {
	constructor(pool){
		this._pool = pool;
	}
    
	agregarRespuesta(respuesta, callback) { //Publicación debería ser una estructura {titulo, cuerpo}
		
		if(respuesta === undefined || respuesta === null || respuesta.id === undefined || respuesta.cuerpo === undefined || respuesta.idP === undefined 
			|| publicacion.etiquetas === undefined || publicacion.etiquetas === null ||publicacion.titulo === "" || publicacion.cuerpo === "" || publicacion.seccion === ""){
			callback("No puede haber campos vacios");
		}
		else if(publicacion.titulo.length > 50){
			callback("El titulo tiene más de 50 caracteres");
		}
		else if(publicacion.cuerpo.length < 200){
			callback("El cuerpo debe tener más de 90 caracteres");
		}
		else if(isNaN(publicacion.seccion) && publicacion.seccion <= 0) {
			callback("La seccion no es correcta");
		}
		else if(publicacion.etiquetas.length < 1 || publicacion.etiquetas.length > 5){
			callback("Debe introducir entre 1 y 5 etiquetas");
		}
		else{
			let pool = this._pool
			let daoS = new DAOSeccion(pool);
			daoS.leerSeccion(publicacion.seccion, function(err,seccion){
				if(err){
					callback(err);
				}
				else{
					if(seccion === undefined){
						callback("La seccion no es correcta");
					}
					else{
						let etis = "";
						publicacion.etiquetas.forEach(e => {
							if(e !== undefined)
								etis+= e + ",";
						});
						etis = etis.substring(0, etis.length-2);
						publicacion.etiquetas = etis;
						let dao = new DAOPublicacion(pool);
						dao.agregarRespuesta(respuesta, function(err,idP){
							if(err){
								console.log(err);
								callback(err);
							}
							else{
								callback(null, idP);
							}
						});
					}
				}
			});
		}
	}

	leerRespuesta(id, callback) {
		//Comprobar datos
		if (isNaN(id)) { //El id tiene que ser un número
			callback("El id no es un número");
		}
		else if(id <= 0) { //El id tiene que ser mayor que 0 
			callback("El id no es mayor que 0");
		}
		else { //Si todo es correcto...
			let daoP = new DAOPublicacion(this._pool);
			let daoPE = new DAOPublicacionEtiqueta(this._pool);
			daoP.leerRespuesta(id, function(err, pub){
				if(err){
					console.log(err);
					callback(err);
				}
				else{
					daoPE.leerEtiquetaPorPublicacion(pub.ID, function(err, etiquetas){
						if(err){
							callback(err);
						}
						else{
							pub.etiquetas = etiquetas;
							callback(null, pub);
						}
					})
				}
			});
		}
	}

	leerRespuestasPorSeccion(idSec, callback) {
		if (idSec === undefined || isNaN(idSec) || idSec <= 0) {
			callback("Error al seleccionar la publicacion");
		}
		else {
			let pool = this._pool;
			let daoSec = new DAOSeccion(this._pool);
			daoSec.leerSeccion(idSec, function(err, sec){
				if(err){
					callback("La seccion no existe");
				}
				else{
					let daoPub = new DAOPublicacion(pool);
					daoPub.leerRespuestasPorSeccion(idSec,callback);
				}
			});
		}
	}


}
module.exports = SARespuesta;*/

/*async function insertar( idP, et, daoE, daoEP){
	let promesa1 = new Promise((resolve, reject) => {
		daoE.leerEtiquetaPorNombre(et, function(err, eti){
			if(err){
				console.log(err);
				resolve(err);
			}else{
				if(eti){
					daoEP.agregarPublicacionEtiqueta(idP, eti.ID, function(err){
						console.log
						if(err){
							console.log(err);
							resolve(err);
						}
						else{
							resolve();
						}
					});
				}
				else{
					daoE.agregarEtiqueta(et, function(err, idEti){
						if(err){
							console.log(err);
							resolve(err);
						}else{
							daoEP.agregarPublicacionEtiqueta(idP, idEti, function(err){
								if(err){
									console.log(err);
									resolve(err);
								}
								else{
									resolve();
								}
							});
						}
					});
				}
			}
		});
	});
	promesa1.then((mensaje) => {
		if(mensaje){
			return true;
		}
		else{
			return false;
		}
	});
}*/