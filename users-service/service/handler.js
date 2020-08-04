import * as CognitoLib from "../../libs/cognito-lib";
import { success, failure } from "../../libs/response-lib";

export async function hello(event, context) {
  const params = {
    UserPoolId: "",
    AttributesToGet: null,
    Filter: "",
    Limit: 10,
  };

  try {
    const results = await CognitoLib.call("listUsers", params);
    const { Users } = results;

    const usersList = [];

    for (let index = 0; index < Users.length; index++) {
      const user = Users[index];
      const { Username } = user;
      const groups = await forUserGetGroup(Username);

      usersList.push({
        ...user,
        groups: groups,
      });
    }

    return success(usersList);
  } catch (e) {
    return failure({
      status: false,
      error: e,
    });
  }
}

const forUserGetGroup = async (userName) => {
  const params = {
    UserPoolId: "",
    Username: userName,
  };

  try {
    const results = await CognitoLib.call("adminListGroupsForUser", params);
    const { Groups } = results;

    return Groups;
  } catch (e) {
    return failure({
      status: false,
      error: e,
    });
  }
};
