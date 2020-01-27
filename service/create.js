import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: `${process.env.tableName}`,
    Item: {
      trailId: uuid.v4(),
      trailName: data.trailName,
      description: data.trailDescription,
      status: data.trailStatus,
      street: data.trailAddress,
      city: data.trailCity,
      state: data.trailState,
      zipcode: data.trailZipCode,
      latitude: data.trailLatitude,
      longitude: data.trailLongitude,
      updatedAt: new Date().getTime(),
      createdAt: new Date().getTime()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false, error: e.message });
  }
}
