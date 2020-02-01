import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName
  };
  try {
    const result = await dynamoDbLib.call("scan", params);
    result.Items.sort((a, b) => {
      return a.trailName > b.trailName ? 1 : -1;
    });
    return success(result.Items);
  } catch (e) {
    return failure({ status: false, error: e.message });
  }
}
