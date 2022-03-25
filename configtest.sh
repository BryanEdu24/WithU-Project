#!/bin/bash

rm config.js

echo "'use strict';
module.exports = {
        host: 'localhost',
        user: 'withuroot',
        password: 'withugps2022',
        database: 'withutest'
}" > config.js
