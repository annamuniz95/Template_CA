'use strict';

//const requestedInteractionBody = require('../js/customActivity');

function retornarMensagem(){
    alert("voce clicou aqui");
    console.log("dentro da função retornar mensagem");
    console.log(window.getRequestedInteractionBody());
    //pegar aqui info do nome da jornada e passar para o endpoint

}