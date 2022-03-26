"use strict";
const DAOEtiqueta = require("./DAOEtiqueta");
const DAOPublicacion = require("./DAOPublicacion");
const DAOPublicacionEtiqueta = require("./DAOPublicacionEtiqueta");
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
			this._pool.getConnection(function(err,connection){
				connection.beginTransaction(function(error){
					let daoS =new DAOSeccion(this._pool);
					daoS.leerSeccion(publicacion.seccion, function(err,seccion){
						if(err){
							connection.rollback();
							callback(err);
						}
						else{
							if(seccion === undefined){
								connection.rollback();
								callback("La seccion no es correcta");
							}
							else{
								let dao = new DAOPublicacion(this._pool);
								let daoE = new DAOEtiqueta(this._pool);
								let daoEP = new DAOPublicacionEtiqueta(this._pool);

								dao.agregarPublicacion(publicacion, function(err,idP){
									if(err){
										connection.rollback();
										callback(err);
									}
									else{
										publicacion.ID = idP;
										let i = 0;
										let error = false;
										publicacion.etiquetas.forEach(function(et){
											daoE.leerEtiquetaPorNombre(et, function(err, eti){
												i++;
												if(err){
													error = true;
													if(i === publicacion.etiquetas.length){
														connection.rollback();
														callback("Ha ocurrido un error durante la creacion de la publicacion. Intentelo de nuevo");
													}
												}else{
													if(eti){
														daoEP.agregarPublicacionEtiqueta(idP, eti.ID, function(err){
															if(err){
																error = true;
															}
															if(i === publicacion.etiquetas.length){
																if(error){
																	connection.rollback();
																	callback("Ha ocurrido un error durante la creacion de la publicacion. Intentelo de nuevo");
																}
																else{
																	connection.commit();
																	callback(null, publicacion);
																}
															}
														});
													}
													else{
														daoE.agregarEtiqueta(eti, function(err, idEti){
															if(err){
																error = true;
																if(i === publicacion.etiquetas.length){
																	connection.rollback();
																	callback("Ha ocurrido un error durante la creacion de la publicacion. Intentelo de nuevo");
																}
															}else{
																daoEP.agregarPublicacionEtiqueta(idP, eti.ID, function(err){
																	if(err){
																		error = true;
																	}
																	if(i === publicacion.etiquetas.length){
																		if(error){
																			connection.rollback();
																			callback("Ha ocurrido un error durante la creacion de la publicacion. Intentelo de nuevo");
																		}
																		else{
																			connection.commit();
																			callback(null, publicacion);
																		}
																	}
																});
															}
														});
													}
												}
											});
										});
									}
								});
							}
						}
					});
				});
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