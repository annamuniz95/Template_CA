'use strict';
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
const SFClient = require('../public/js/sfmc-client');
const estruturaJornada = require('../public/js/getPushInformation');
var util = require('util');
var http = require('https');
const { Console } = require('console');

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.hostname,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    /*console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.hostname);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);*/
}

exports.edit = function (req, res) {
    logData(req);
    res.status(200).send('Edit');
};

exports.save = function (req, res) {
    logData(req);
    res.status(200).send('Save');
};

exports.execute = function (req, res) {
    console.log("// ============================== ||");
    console.log("|| Aplicação                      ||");
    console.log("||           esta                 ||");
    console.log("||                executando      ||");
    console.log("||                            /o/ ||");
    console.log("|| ============================== ||");

    console.log(estruturaJornada("Custom Activity"));

    var Opcao_1, Opcao_2, Opcao_3;

    JWT(req.body, process.env.jwtSecret, (err, decoded) => {
        if (err) {
            console.error(err);
            return res.status(401).end();
        }

        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            
            console.log("|| só decoded: " + JSON.stringify(decoded));

            var decodedArgs = decoded.inArguments[0];
            console.log(" decodedArgs stringify: " + JSON.stringify(decodedArgs));

            Opcao_1 = decodedArgs.opcao1;
            Opcao_2 = decodedArgs.opcao2;
            Opcao_3 = decodedArgs.opcao3;

            if (Opcao_1) {
                console.log("|| vai executar a prmiera lógica ||");
            } 
            else if (Opcao_2) {
                console.log("|| vai executar a segunda lógica ||");
            } 
            else if (Opcao_3) {
                console.log("|| vai executar a terceira lógica ||");
            }
            
            logData(req);
            res.status(200).send('Execute');
        } else {
            console.error('inArguments invalid.');
            return res.status(400).end();
        }
    });

    const deExternalKey = "teste_logs"; //process.env.deExternalKey

    SFClient(deExternalKey, [ {
        keys: {
          Id: Math.random(),
        },
        values: {
            nome: "teste-"+Math.random(),
            data: new Date().toLocaleString('en-US', { timeZone: 'Europe/Lisbon' }),
        },
      },]);
};

exports.publish = function (req, res) {
    logData(req);
    res.status(200).send('Publish');
};

exports.validate = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    logData(req);
    res.status(200).send('Validate');
};