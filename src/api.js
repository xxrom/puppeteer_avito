import fetch from "node-fetch";
import {convertIdToInt, convertPriceToInt} from "./parcingHelpers";

const URL = 'http://localhost:3010'

export const uploadToDB = async (data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: ''
  };

  const addCardUrl = `${URL}/card`;

  try {
    await data.forEach(async (item) => {
      console.log('item', item)
      let sendObject = null;

      if (!item) {
        return sendObject;
      }

      const {id, link, title, price, timeAgo, geo} = item;

      const card_id = convertIdToInt(id);
      const priceInt = convertPriceToInt(price);

      sendObject = {card_id, link, title, price: priceInt, timeAgo, geo};

      console.log('sendObject', sendObject)

      options.body = JSON.stringify(sendObject);

      // ADD new card to DB
      const response = await fetch(addCardUrl, options);

      if (response.ok) {
        const json = await response.json();

        console.log("response", json);
      } else {
        console.log("fetch error: ", response.status, response);
      }
    });
  } catch (e) {
    console.log('error', e.message);
  }

  console.log('sendListData', sendListData)
};
