import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: "roam-trails-api",
    Item: {
      trailId: uuid.v4(),
      trailName: data.trailName,
      description: data.description,
      latitude: data.latitude,
      longitude: data.longitude,
      updatedAt: new Date().getTime(),
      createdAt: new Date().getTime()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    callback(null, failure({ status: false, error: e.message }));
  }
}
