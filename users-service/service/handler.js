import * as CognitoLib from '../../libs/cognito-lib';
import { success, failure } from '../../libs/response-lib';

export async function hello(event, context) {
  const params = {
    UserPoolId: 'us-east-2_HOg04Uu7N',
    AttributesToGet: ['username', 'email'],
    Filter: '',
    Limit: 0,
  };

  try {
    const results = await CognitoLib.call('listUsers', params);

    return success({ message: results });
  } catch (e) {
    return failure({
      status: false,
      error: e,
    });
  }
}
