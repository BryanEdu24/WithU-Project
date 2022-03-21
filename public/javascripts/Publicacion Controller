"use strict"


var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Publicacion = require('./Publicacion');

// CREATES A NEW USER
router.post('/', function (req, res) {
   
    publicación.create({
            id : req.body.id,
            titulo : req.body.titulo,
            cuerpo : req.body.cuerpo
        }, 
        
        function (err, user) {
            if (err) return res.status(500).send("Hay un error con la conexion del servidor");
            res.status(200).send(user);
        }
            
    );
});
