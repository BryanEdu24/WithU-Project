const { TestWatcher } = require("jest");
const SAPublicacion = require("../public/javascripts/SAPublicacion");
const config = require("../config");
const mysql = require("mysql");
const pool = mysql.createPool({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});
const sa = new SAPublicacion();

const tituloCorrecto = "Prueba titulo correcto con menos de 50 caracteres";
const tituloIncorrecto = "Prueba titulo incorrecto con más de 50 caracteres. Debería fallar";
const cuerpoCorrecto = "Este cuerpo tiene más de 90 caracteres: \n\nLorem ipsum dolor sit amet consectetur adipiscing elit aliquet est, facilisi nascetur nulla blandit malesuada varius fermentum hac, ultricies pulvinar cubilia platea massa fames enim iaculis. Ridiculus himenaeos lacinia nullam platea placerat netus sagittis habitasse sollicitudin ut viverra, tristique duis laoreet quam ad malesuada in iaculis magna nisl, leo quis facilisi congue mus odio proin feugiat dictum natoque. Ad dignissim nullam sed himenaeos vulputate inceptos rutrum molestie, pretium potenti tempor nibh porta cum hendrerit, at dictumst hac convallis tortor netus viverra.\n\nTempor enim dictum facilisi netus aliquam torquent justo bibendum pellentesque curae vestibulum massa eros ac ante, vehicula class erat leo inceptos luctus nibh maecenas diam libero dapibus felis ornare. Aenean maecenas metus ullamcorper lacinia nascetur aliquam justo vitae, suscipit arcu malesuada volutpat nulla class tristique facilisi, ultrices ante turpis commodo lectus hac rhoncus. Tortor neque velit montes interdum ridiculus eget arcu magna, urna dignissim cursus eleifend class varius venenatis, leo accumsan nulla maecenas at litora quis.";

test('Intentamos agregar un objeto undefined', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe(null);
            expect(ID).toBeLessThanOrEqual(0);
        }catch(error){
            done(error);
        }    
    }

    let publicacion = undefined;
    sa.agregarPublicacion(pool, publicacion, cb);
});

test('Intentamos agregar un objeto null', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe(null);
            expect(ID).toBeLessThanOrEqual(0);
        }catch(error){
            done(error);
        }    
    }
    let publicacion = null;
    sa.agregarPublicacion(pool, publicacion, cb);
});

test('Intentamos agregar un objeto que no es una publicación', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe(null);
            expect(ID).toBeLessThanOrEqual(0);
        }catch(error){
            done(error);
        }    
    }

    let publicacion = undefined;
    sa.agregarPublicacion(pool, publicacion, cb);
});

test('Intentamos agregar una publicación con titulo y cuerpo correctos', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe(null);
            expect(ID).toBeGreaterThan(0);
        }catch(error){
            done(error);
        }
    }

    let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto};
    sa.agregarPublicacion(pool, publicacion, cb);
});

test('Intentamos agregar una publicación con titulo vacío', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe(null);
            expect(ID).toBeLessThanOrEqual(0);
        }catch(error){
            done(error);
        }    
    }
    
    let publicacion = { titulo: "", cuerpo: cuerpoCorrecto};
    sa.agregarPublicacion(pool, publicacion, cb);
});

test('Intentamos agregar una publicación con cuerpo vacio', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe(null);
            expect(ID).toBeLessThanOrEqual(0);
        }catch(error){
            done(error);
        }    
    }

    let publicacion = { titulo: tituloCorrecto, cuerpo: "" };
    sa.agregarPublicacion(pool, publicacion, cb);
});

test('Intentamos agregar una publicación con titulo incorrecto', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe(null);
            expect(ID).toBeLessThanOrEqual(0);
        }catch(error){
            done(error);
        }    
    }

    let publicacion = { titulo: tituloIncorrecto, cuerpo: cuerpoCorrecto };
    sa.agregarPublicacion(pool, publicacion, cb);
});