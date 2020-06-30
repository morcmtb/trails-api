import AWS from 'aws-sdk';

export function call(action, params) {
  const cisp = new AWS.CognitoIdentityServiceProvider();
  return cisp[action](params).promise();
}
