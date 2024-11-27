/*'use strict';

const axios = require('axios');

async function setOptions() {
  const sfmcClientid = process.env.clientId;
  const sfmcClientSecret = process.env.clientSecret;
  const sfmcAccountId = process.env.accountId;
  const sfmcSubDomain = process.env.domain;

  return {
    authUrl: `https://${sfmcSubDomain}.auth.marketingcloudapis.com/v2/token`, 
    origin: `https://${sfmcSubDomain}.rest.marketingcloudapis.com/`,
    clientId: sfmcClientid,
    clientSecret: sfmcClientSecret,
    accountId: sfmcAccountId,
  };
}
async function authenticate() {
  const { authUrl, clientId, clientSecret } = await setOptions();

  const authData = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  });

  try {
    const response = await axios.post(authUrl, authData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error('|| Erro na autenticação:' + error + " ||");
    throw error;
  }
}

/**
 * Função para salvar dados em uma Data Extension.
 * @param {string} externalKey - Chave externa da Data Extension.
 * @param {Array} data - Dados a serem salvos.
 * @returns {Promise} - Promise com o resultado da operação.
 */
/*async function estruturaJornada(nomeJornada){
  console.log("nome Jornada: " + nomeJornada); 

  try {
    const token = await authenticate();  
    const { origin } = await setOptions();
    const url = `${origin}/interaction/v1/interactions?nameOrDescription=${nomeJornada}`; 

    /*
    ARRUMAR ESSA REQUISIÇÃO PARA SER GET !!!!!!!!!!!!!
    */

    /*const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log("|| Resposta da API MC dados .status:" + response.status + "||");
    console.log("|| Resposta da API MC dados .data:" + JSON.stringify(response.data) + "||");
    console.log("|| Resposta da API MC dados .config:" + JSON.stringify(response.config) + "||");
    console.log("|| Resposta da API MC dados .request:" + JSON.stringify(response.request) + "||");
    return response.data;
  } catch (error) {
    console.error('|| Erro dados jornada:' + error.response ? error.response : error + "||");
    throw error;
  }
};


module.exports = {estruturaJornada};*/


'use strict';

const requestedInteractionBody = require('../js/customActivity');

function retornarMensagem(){
    alert("voce clicou aqui");
    alert(requestedInteractionBody);
    //pegar aqui info do nome da jornada e passar para o endpoint

}