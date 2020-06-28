import { success } from "../../libs/response-lib";

export async function hello(event, context) {
  return success({ message: `Hello from the  ${process.env.SERVICE_NAME}` });
}
