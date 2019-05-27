import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";

import { saveItemInDB, getItemFromDB } from "./dynamodb-actions";

export const respond = (fulfillmentText: any, statusCode: number): any => {
  return {
    statusCode,
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

    return respond({ created: incoming }, 201);
  } catch (err) {
    return respond(err, 400);
  }
};

/** Get an item from the to-do-list table */
export const getToDoItem: Handler = async (
  event: APIGatewayEvent,
  context: Context
) => {
  const id: string = event.pathParameters.id;

  try {
    const toDoItem = await getItemFromDB(id);

    return respond(toDoItem, 200);
  } catch (err) {
    return respond(err, 404);
  }
};
