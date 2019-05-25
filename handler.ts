import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";

import { saveItemInDB } from "./dynamodb-actions";

export const respond = (fulfillmentText: any): any => {
  return {
    statusCode: 200,
    body: JSON.stringify(fulfillmentText),
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  };
};

/** Save an item in the to-do list */
export const saveToDoItem: Handler = async (
  event: APIGatewayEvent,
  context: Context
) => {
  const incoming: { item: string; complete: boolean } = JSON.parse(event.body);
  const { item, complete } = incoming;

  try {
    await saveItemInDB(item, complete);

    return respond({ created: incoming });
  } catch (err) {
    return respond(err);
  }
};
