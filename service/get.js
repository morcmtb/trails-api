import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  const params = {
    TableName: "roam-trails-api",
    Key: {
      trailId: event.pathParameters.trailId
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      callback(null, success(result.Item));
    } else {
      callback(
        null,
        failure({
          status: false,
          error: "Trail not found."
        })
      );
    }
  } catch (e) {
    callback(null, failure({ status: false, error: e.message }));
  }
}
