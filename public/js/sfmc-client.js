'use strict';

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
  const saveData = async (externalKey, data) => {
    const client = await setOptions().then((options) => {
      console.info('result of setOptions', arg = {
        options,
      });
  
      return new FuelRest(options);
    });

    console.info('client', arg = {
      client,
    });
  
    let result;
    if (client) {
      result = await client.post({
        uri: `/hub/v1/dataevents/key:${externalKey}/rowset`,
        headers: {
          'Content-Type': 'application/json',
        },
        json: true,
        body: data,
      });
    }
  
    return result;
  };
  
  module.exports = {
    saveData,
  };