const { TestWatcher } = require("jest");
const DAOPublicacionEtiqueta = require("../public/javascripts/DAOPublicacionEtiqueta");
const DAOEtiqueta = require("../public/javascripts/DAOEtiqueta");
const config = require("../config");
const mysql = require("mysql");
const pool = mysql.createPool({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});
jest.setTimeout(5000);
const dao = new DAOPublicacionEtiqueta(pool);


const nombreCorrecto = "Prueba nombre de la etiqueta correcto ";
const tituloCorrecto = "Prueba titulo correcto con menos de 50 caracteres";
const cuerpoCorrecto = "Este cuerpo tiene más de 90 caracteres: \n\nLorem ipsum dolor sit amet consectetur adipiscing elit aliquet est, facilisi nascetur nulla blandit malesuada varius fermentum hac, ultricies pulvinar cubilia platea massa fames enim iaculis. Ridiculus himenaeos lacinia nullam platea placerat netus sagittis habitasse sollicitudin ut viverra, tristique duis laoreet quam ad malesuada in iaculis magna nisl, leo quis facilisi congue mus odio proin feugiat dictum natoque. Ad dignissim nullam sed himenaeos vulputate inceptos rutrum molestie, pretium potenti tempor nibh porta cum hendrerit, at dictumst hac convallis tortor netus viverra.\n\nTempor enim dictum facilisi netus aliquam torquent justo bibendum pellentesque curae vestibulum massa eros ac ante, vehicula class erat leo inceptos luctus nibh maecenas diam libero dapibus felis ornare. Aenean maecenas metus ullamcorper lacinia nascetur aliquam justo vitae, suscipit arcu malesuada volutpat nulla class tristique facilisi, ultrices ante turpis commodo lectus hac rhoncus. Tortor neque velit montes interdum ridiculus eget arcu magna, urna dignissim cursus eleifend class varius venenatis, leo accumsan nulla maecenas at litora quis.";
const seccionCorrecta = 1;

test('Agregamos la Publicacion Etiqueta correctamente', done =>{
    function cb(err){
        try{
            expect(err).toBe(null);
            done();
        }catch(error){
            done(error);
        }
    }

    let etiqueta = { nombre: nombreCorrecto};
    let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto, idSeccion: seccionCorrecta};
    try{
        dao.agregarPublicacionEtiqueta(1,1, cb);
    } catch(err){
        done(error);
    }
});

test('Error de conexión a la BBDD', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("Error al obtener la conexión");
            done();
        }catch(error){
            done(error);
        }    
    }
    
    let etiqueta = { nombre: nombreCorrecto};
    let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto, idSeccion: seccionCorrecta};
    let dao2 = new DAOEtiqueta();
    try{
        dao2.agregarPublicacionEtiqueta(publicacion,etiqueta, cb);
    } catch(err){
        done();
    }
});

test('Error al ejecutar la petición a la BBDD', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("Los datos no son correctos.");
            done();
        }catch(error){
            done(error);
        }    
    }
    
    let publicacion = "Variable no valida";
    let etiqueta = "Variable no valida";
    dao.agregarPublicacionEtiqueta(publicacion,etiqueta, cb);
});
