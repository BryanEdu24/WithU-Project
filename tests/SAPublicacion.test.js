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
jest.setTimeout(5000);
const sa = new SAPublicacion(pool);

const tituloCorrecto = "Prueba titulo correcto con menos de 50 caracteres";
const tituloIncorrecto = "Prueba titulo incorrecto con más de 50 caracteres. Debería fallar";
const cuerpoCorrecto = "Este cuerpo tiene más de 90 caracteres: \n\nLorem ipsum dolor sit amet consectetur adipiscing elit aliquet est, facilisi nascetur nulla blandit malesuada varius fermentum hac, ultricies pulvinar cubilia platea massa fames enim iaculis. Ridiculus himenaeos lacinia nullam platea placerat netus sagittis habitasse sollicitudin ut viverra, tristique duis laoreet quam ad malesuada in iaculis magna nisl, leo quis facilisi congue mus odio proin feugiat dictum natoque. Ad dignissim nullam sed himenaeos vulputate inceptos rutrum molestie, pretium potenti tempor nibh porta cum hendrerit, at dictumst hac convallis tortor netus viverra.\n\nTempor enim dictum facilisi netus aliquam torquent justo bibendum pellentesque curae vestibulum massa eros ac ante, vehicula class erat leo inceptos luctus nibh maecenas diam libero dapibus felis ornare. Aenean maecenas metus ullamcorper lacinia nascetur aliquam justo vitae, suscipit arcu malesuada volutpat nulla class tristique facilisi, ultrices ante turpis commodo lectus hac rhoncus. Tortor neque velit montes interdum ridiculus eget arcu magna, urna dignissim cursus eleifend class varius venenatis, leo accumsan nulla maecenas at litora quis.";
const seccionCorrecta = 1;
const seccionIncorrecta = 0;
const etiquetaIncorrecta = [];
const etiquetaCorrecta = ["Emociones"];

test('Intentamos agregar un objeto undefined', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("El objeto no es una publicacion");
            done();
        }catch(error){
            done(error);
        }    
    }

    let publicacion = undefined;
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar un objeto null', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("El objeto no es una publicacion");
            done();
        }catch(error){
            done(error);
        }    
    }
    let publicacion = null;
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar un objeto que no es una publicación', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("El objeto no es una publicacion");
            done();
        }catch(error){
            done(error);
        }    
    }

    let publicacion = undefined;
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar una publicación con titulo, cuerpo, seccion y etiquetas correctas', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe(null);
            expect(ID).toBeGreaterThan(0);
            done();
        }catch(error){
            done(error);
        }
    }

    let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto, seccion:seccionCorrecta, etiqueta: etiquetaCorrecta};
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});
test('Intentamos agregar una publicación con titulo ,etiqueta y cuerpo correctos y seccion incorrectas', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("La seccion no es correcta");
            done();
        }catch(error){
            done(error);
        }
    }

    let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto, seccion:seccionIncorrecta, etiqueta: etiquetaCorrecta};
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});
test('Intentamos agregar una publicación con titulo ,etiqueta y cuerpo correctos y seccion undefined', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }
    }

    let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto, seccion: undefined, etiqueta: etiquetaCorrecta};
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});
test('Intentamos agregar una publicación con titulo, etiqueta y cuerpo correctos y seccion null', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }
    }

    let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto,seccion:null, etiqueta: etiquetaCorrecta};
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar una publicación con titulo, cuerpo, seccion correcta y etiqueta incorrecta', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("Se debe añadir al menos una etiqueta");
            done();
        }catch(error){
            done(error);
        }
    }

    let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto, seccion: seccionCorrecta, etiqueta: etiquetaIncorrecta};
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar una publicación con titulo, cuerpo, seccion correcta y etiqueta null', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacíos");
            done();
        }catch(error){
            done(error);
        }
    }

    let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto, seccion: seccionCorrecta, etiqueta: null};
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar una publicación con titulo, cuerpo, seccion correcta y etiqueta undefined', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacíos");
            done();
        }catch(error){
            done(error);
        }
    }

    let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto, seccion: seccionCorrecta, etiqueta: undefined};
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar una publicación con titulo vacío', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }    
    }
    
    let publicacion = { titulo: "", cuerpo: cuerpoCorrecto, seccion: seccionCorrecta, etiqueta: etiquetaCorrecta};
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar una publicación con cuerpo vacio', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("No puede haber campos vacios");
            done();
        }catch(error){
            done(error);
        }    
    }

    let publicacion = { titulo: tituloCorrecto, cuerpo: "" , seccion: seccionCorrecta, etiqueta: etiquetaCorrecta};
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});

test('Intentamos agregar una publicación con titulo incorrecto', done =>{
    function cb(err, ID){
        try{
            expect(err).toBe("El titulo tiene más de 50 caracteres");
            done();
        }catch(error){
            done(error);
        }    
    }

    let publicacion = { titulo: tituloIncorrecto, cuerpo: cuerpoCorrecto, seccion: seccionCorrecta, etiqueta: etiquetaCorrecta };
    try{
        sa.agregarPublicacion(publicacion, cb);
    }catch(error){
        done(error);
    }
});

// Test de Vista Publicacion

test('Leer datos de una publicación', done => {
    function callback(err, publicacion) { 
        try{
            expect(err).toBe(null);
            expect(publicacion.titulo).toBe(tituloCorrecto);
            expect(publicacion.cuerpo).toBe(cuerpoCorrecto);
            expect(publicacion.seccion).toBe(seccionCorrecta);
            expect(publicacion.etiqueta).toBe(etiquetaCorrecta);
            done(); 
        }catch(error){
            done(error);
        }  
    }

    let publicacion = { titulo: tituloCorrecto, cuerpo: cuerpoCorrecto, seccion: seccionCorrecta, etiqueta: etiquetaCorrecta };
    
    try{
        sa.agregarPublicacion(publicacion, function (err, ID) {
            expect(err).toBe(null);
            sa.leerPublicacion(ID, callback);
        });
    }catch(error){
        done(error);
    }

});
