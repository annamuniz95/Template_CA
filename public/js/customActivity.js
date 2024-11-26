//onst { json } = require("body-parser");
const estruturaJornada = require('../public/js/getPushInformation');

define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    
    connection.trigger('requestSchema'); // adicionei agora
    connection.on('requestedSchema', function (data) {
        // save schema
        console.log('*** Schema ***', JSON.stringify(data['schema']));
     }); //adicionei agora

    connection.on('clickedNext', save);

    connection.on('requestedInteraction', function (interaction) {
        if (interaction) {
            requestedInteractionBody = interaction;
        }
        console.log("|| interaction: " + interaction);
    });

   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');

        alert("preencha as informações");
        var estruturaJornada =  estruturaJornada("Custom Activity");
        console.log("estruturaJornada: " + estruturaJornada);
        alert("estruturaJornada: " + estruturaJornada);


    }

    function initialize(data) {
        console.log("função initialize!!");
        console.log(data);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                
              
            });
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function save() {
        console.log("!!!! função SAVE !!!!")

        var opcao_1 = $('#opcao_1').is(':checked');
        var opcao_2 = $('#opcao_2').is(':checked');
        var opcao_3 = $('#opcao_3').is(':checked');
        

        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "opcao1": opcao_1,
            "opcao2": opcao_2,
            "opcao3": opcao_3,
            "contactKey": "{{Contact.Key}}",
            "emailAddress": "{{InteractionDefaults.Email}}",
            "telefone": "{{InteractionDefaults.MobileNumber}}"
        }];

        //Event.DEAudience-dfa3722f-07cc-323c-5e59-da5bdd5d93a8.primeiroNome para buscar da DE. vem no schema, mas ai tem que saber o nome do campo
        //daqui passa para config.json
        
        payload['metaData'].isConfigured = true;

        connection.trigger('updateActivity', payload);
    }

});