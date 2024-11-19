/*'use strict';

async function setOptions() {
    const sfmcClientid = process.env.clientId;
    const sfmcClientSecret = process.env.clientSecret; 
    const sfmcAccountId = process.env.accountId;
    const sfmcSubDomain = process.env.domain;
  
    return {
      auth: {
        clientId: sfmcClientid,
        clientSecret: sfmcClientSecret,
        authOptions: {
          authVersion: 2,
          accountId: sfmcAccountId,
        },
        authUrl: `https://${sfmcSubDomain}.auth.marketingcloudapis.com/v2/token`,
      },
      origin: `https://${sfmcSubDomain}.rest.marketingcloudapis.com/`,
      globalReqOptions: {
      },
    };
  }
  
  /**
   * Save data in DE
   * @param externalKey
   * @param data
   * @returns {?Promise}
   */
  /*const saveData = async (externalKey, data) => {
    console.log("////////dentro da funcao saveData. externalKey:  " + externalKey + " | data: " + data);
    const client = await setOptions().then((options) => {
      /*console.info('result of setOptions', arg = {
        options,
      });*/
  
    /*  return new FuelRest(options);
    });

    /*console.info('client', arg = {
      client,
    });*/
  
    /*let result;
    if (client) {
      console.log("////////dentro do if cliente: " + client);
      result = await client.post({
        uri: `/hub/v1/dataevents/key:${externalKey}/rowset`,
        headers: {
          'Content-Type': 'application/json',
        },
        json: true,
        body: data,
      });
    }
    console.log("////////result saveData: " + result);
    return result;
  };

  module.exports = saveData;*/

  'use strict';

const axios = require('axios');

/**
 * Função que retorna as opções de configuração da Marketing Cloud.
 */
async function setOptions() {
  const sfmcClientid = process.env.clientId;
  const sfmcClientSecret = process.env.clientSecret;
  const sfmcAccountId = process.env.accountId;
  const sfmcSubDomain = process.env.domain;

  return {
    authUrl: `https://${sfmcSubDomain}.auth.marketingcloudapis.com/v2/token`, // URL de autenticação
    origin: `https://${sfmcSubDomain}.rest.marketingcloudapis.com/`, // URL base da API REST
    clientId: sfmcClientid,
    clientSecret: sfmcClientSecret,
    accountId: sfmcAccountId,
  };
}

/**
 * Autentica na Salesforce Marketing Cloud para obter o token de acesso.
 */
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

    // Retorna o token de acesso
    return response.data.access_token;
  } catch (error) {
    console.error('Erro na autenticação:', error);
    throw error;
  }
}

/**
 * Função para salvar dados em uma Data Extension.
 * @param {string} externalKey - Chave externa da Data Extension.
 * @param {Array} data - Dados a serem salvos.
 * @returns {Promise} - Promise com o resultado da operação.
 */
const saveData = async (externalKey, data) => {
  console.log("Dentro da função saveData. ExternalKey:", externalKey, " | Data:", JSON.stringify(data));

  try {
    // Obtém o token de acesso
    const token = await authenticate();

    const { origin } = await setOptions();
    const url = `${origin}/hub/v1/dataevents/key:${externalKey}/rowset`; // URL da API para enviar os dados

    // Envia os dados para a Data Extension usando Axios
    const response = await axios.post(
      url,
      { items: data }, // Dados a serem inseridos na Data Extension
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("Dados salvos com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    throw error;
  }
};

module.exports = saveData;
