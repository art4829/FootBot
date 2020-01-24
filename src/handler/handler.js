import queryString from 'query-string';
import axios from 'axios';
import getFilteredPlaces from '../client/GoogleClient';
import RESTAURANT_MODAL from '../views/SlackViews';
import { VIEW_SUBMISSION, OPEN_VIEW_URL, BEARER_TOKEN, NO_FOOD_FOUND_MESSAGE, MARKDOWN } from '../constants/SlackConstants';
import { PHOTO_API, PHOTO_KEY, PHOTO_DEFAULT } from '../constants/GoogleApiConstants';

const JSON_CONTENT_TYPE = 'application/json'

export const handle_modals = async (event) => {
  const parsed_string = queryString.parse(event.body)
  const parsed_payload = JSON.parse(parsed_string.payload)

  console.log("Parsed Payload", parsed_payload)

  if (parsed_payload.type === VIEW_SUBMISSION) { 
    const private_metadata = JSON.parse(parsed_payload.view.private_metadata)
    const distance_selected_value = parsed_payload.view.state.values['distance_select']['distance_select_value']['selected_option']['value']
    const price_selected_value = parsed_payload.view.state.values['price_select']['price_select_value']['selected_option']['value']
    const office_selected_value = parsed_payload.view.state.values['office_select']['office_select_value']['selected_option']['value']
    const places = await getFilteredPlaces(
      private_metadata.cuisine,
      distance_selected_value,
      price_selected_value,
      office_selected_value
    )

    let blocks = [
      {
        "type": "section",
        "text": {
          "type": MARKDOWN,
          "text": `:foodbot: *@${parsed_payload['user']['username']} _is craving "${private_metadata.cuisine}"_*:`
        }
      },
    ]

    places.forEach(placeObject => {
      let priceLevel = ''

      for(let count = 0; count < placeObject['price_level']; count++){
        priceLevel += '$'
      }

      blocks.push(
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": MARKDOWN,
            "text": `*${placeObject.name}* \nRating: \`${placeObject.rating}/5\` \nPrice: *${priceLevel ? priceLevel : "-"}* \nWebsite: ${placeObject.website !== undefined ? placeObject.website : 'N/A'}\n Phone Number: ${placeObject.formatted_phone_number ? placeObject.formatted_phone_number : "N/A"}\n Open in Maps: ${placeObject.url}`
          },
          "accessory": {
            "type": "image",
            "image_url": `${PHOTO_API}${placeObject.photos ? placeObject.photos[0]['photo_reference']: PHOTO_DEFAULT}${PHOTO_KEY}`,
            "alt_text": "Restaurant Image"
          }
        },
      )
    });

    let response = "Hello";

    if(places.length > 0) {
      try {
        response = await axios({
          method: 'post',
          url: private_metadata.url,
          data: {
            'channel': private_metadata.channel_id,
            'blocks': blocks,
            'response_type': 'in_channel'
          },
          headers: {
            'Content-type': JSON_CONTENT_TYPE,
            'Authorization': BEARER_TOKEN
          }
        });
        console.log("Response:", response);
      } catch (error) {
        console.error("Error: ", JSON.stringify(error));
      }
   } else {
    try {
      response = await axios({
        method: 'post',
        url: private_metadata.url,
        data: {
          "response_type": "ephemeral",
          'text': NO_FOOD_FOUND_MESSAGE
        },
        headers: {
          'Content-type': JSON_CONTENT_TYPE,
        }
      });
      console.log("Response:", response);
    } catch (error) {
      console.error("Error: ", JSON.stringify(error));
    }
   }
  }

  console.log("Parsed blocks", JSON.stringify(parsed_payload.view.blocks))

  return {
    statusCode: 200,
    headers: {
      'Content-type': JSON_CONTENT_TYPE
    },
  }
}

export const handle_slack_input = async (event) => {

  const parsed_event = queryString.parse(event.body)
  const cuisine = parsed_event.text;
  const trigger_id = parsed_event.trigger_id;
  const response_url = parsed_event.response_url;
  const channel_id = parsed_event.channel_id;
  const private_metadata = {};

  RESTAURANT_MODAL["title"]["text"] = "Craving " + cuisine;
  private_metadata["cuisine"] = cuisine;
  private_metadata["url"] = response_url;
  private_metadata["channel_id"] = channel_id;
  RESTAURANT_MODAL['private_metadata'] = JSON.stringify(private_metadata);

  let response = "Hello";
  try {
    response = await axios({
      method: 'post',
      url: OPEN_VIEW_URL,
      data: {
        'trigger_id': trigger_id,
        'view': JSON.stringify(RESTAURANT_MODAL)
      },
      headers: {
        'Content-type': JSON_CONTENT_TYPE,
        'Authorization': BEARER_TOKEN
      }
    });
    console.log("Response:", response);
  } catch (error) {
    console.error(JSON.stringify(error));
  }
  return {
    statusCode: 200,
  }
};
