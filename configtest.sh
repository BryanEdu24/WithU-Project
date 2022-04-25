#!/bin/bash

rm config.js
mysql -u withuroot withutest < bdtest.sql

echo "'use strict';
module.exports = {
        host: 'localhost',
        user: 'withuroot',
        password: 'withugps2022',
        database: 'withutest'
}" > config.js


