"use strict";
const DAOEtiqueta = require("./DAOEtiqueta");
const DAORespuesta = require("./DAORespuesta");
const DAOPublicacion = require("./DAOPublicacion");
const DAOPublicacionEtiqueta = require("./DAOPublicacionEtiqueta");


class SARespuesta {
	constructor(pool){
		this._pool = pool;
	}
    
	agregarRespuesta(respuesta, callback) { //Publicación debería ser una estructura {titulo, cuerpo}
		
		if(respuesta === undefined || respuesta === null || respuesta.cuerpo === "" ||  respuesta.cuerpo === undefined || respuesta.idP === undefined ){
			callback("No puede haber campos vacios");
		}
		else if(respuesta.cuerpo > 1500){
			callback("El cuerpo no puede sobrepasar los 1500 caracteres");
		}
		else{
			let DAOPub= new DAOPublicacion(this._pool);
			let pool = this._pool;
			DAOPub.leerPublicacion(respuesta.idP,function(err,pub){
				if(err){
					callback(err);
				}
				else{
					let DAOResp=new DAORespuesta(pool);
					DAOResp.agregarRespuesta(respuesta,function(err, id){
						if(err){
							console.log(err);
							callback(err);
						}
						else{
							callback(null, id);
						}
					});

				}
			});	
		};
	};

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

	leerRespuestasPorPublicacion(idPub, callback) {
		if (idPub === undefined || isNaN(idPub) || idPub <= 0) {
			callback("No se ha podido encontrar la publicacion");
		}
		else {
			let pool = this._pool;
			let daoPub = new DAOPublicacion(this._pool);
			daoPub.leerPublicacion(idPub, function(err, sec){
				if(err){
					callback("La seccion no existe");
				}
				else {
					let daoRes = new DAORespuesta(pool);
					daoRes.listarRespuestasPorPublicacion(idPub,callback);
				}
			});
		}
	}
}
module.exports = SARespuesta;

async function insertar( idP, et, daoE, daoEP){
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
}