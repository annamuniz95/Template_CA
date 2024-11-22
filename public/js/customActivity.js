//onst { json } = require("body-parser");

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
            "telefone": "{{Contact.Default.SMS}}"
        }];

        //tentativa1: InteractionDefaults.Email  - funcionou
        // {{InteractionDefaults.SMS}} nao funcionou
        // {{InteractionDefaults.Telefone}} nao funcionou
        // {{Contact.Default.SMS}} funcionou mas veio vazio
        // "{{Contact.Default.telemovel}}" nao funcionou
        // "{{Contact.Default.MobilePhone}} nao funcionou

        //testar com Contact.EmailAddress, ou só emailAddress
        //daqui passa para config.json
        
        payload['metaData'].isConfigured = true;

        connection.trigger('updateActivity', payload);
    }

});