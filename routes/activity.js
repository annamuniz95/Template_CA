'use strict';
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
const SFClient = require('../public/js/sfmc-client');
var util = require('util');
var http = require('https');

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

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( "edit: " +  req.body );
    logData(req);
    //res.send(200, 'Edit');
    res.status(200).send('Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( "save: " +   req.body );
    logData(req);
    //res.send(200, 'Save');
    res.status(200).send('Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {
    var dados_nome, dados_apelido, dados_idade;

    // example on how to decode JWT
    JWT(req.body, process.env.jwtSecret, (err, decoded) => {

        // verification error -> unauthorized request
        if (err) {
            console.error(err);
            return res.status(401).end();
        }

        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            
            // decoded in arguments
            var decodedArgs = decoded.inArguments[0];
            console.log(" decodedArgs stringify: " + JSON.stringify(decodedArgs));
            console.log(" decoded stringify: " + JSON.stringify(decoded));

            dados_nome = decodedArgs.nome;
            dados_apelido = decodedArgs.apelido;
            dados_idade = decodedArgs.idade;

            console.log("dados_nome: " + dados_nome + " dados_apelido: " + dados_apelido + " dados_idade: " + dados_idade);
            
            logData(req);
            //res.send(200, 'Execute');
            res.status(200).send('Execute');
            console.log("executando!!!!!!!!!!!!!!!!!!!!!!!!!");
        } else {
            console.error('inArguments invalid.');
            return res.status(400).end();
        }
    });

    //inserir logica de execução aqui

    const deExternalKey = "teste_logs"; //process.env.deExternalKey

    SFClient(deExternalKey, [ {
        keys: {
          Id: dados_idade,
        },
        values: {
            nome: dados_nome + dados_apelido,
            data: new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60000) + (21600000)),
        },
      },]);
    //fim lógica execução
};


/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( "publish: " +   req.body );
    logData(req);
    //res.send(200, 'Publish');
    res.status(200).send('Publish');
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( "validate: " +   req.body );
    logData(req);
    //res.send(200, 'Validate');
    res.status(200).send('Validate');
};