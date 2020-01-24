const RESTAURANT_MODAL = {
    "type": "modal",
    "callback_id": "filters",
    "private_metadata": " ",
    "title": {
      "type": "plain_text",
      "text": "We will be feeding you: "
    },
    "submit": {
      "type": "plain_text",
      "text": "Submit"
    },
    "blocks": [
      {
        "type": "input",
        "block_id": 'office_select',
        "element": {
          "type": "static_select",
          "action_id": "office_select_value",
          "placeholder": {
            "type": "plain_text",
            "text": "Office",
            "emoji": true
          },
          "options": [
            {
              "text": {
                "type": "plain_text",
                "text": "Dumbo",
                "emoji": true
              },
              "value": "Dumbo"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "Alpharetta",
                "emoji": true
              },
              "value": "Alpharetta"
            }
          ]
        },
        "label": {
          "type": "plain_text",
          "text": "Location :map:",
          "emoji": true
        }
      },
      {
        "type": "input",
        "block_id": 'distance_select',
        "element": {
          "type": "static_select",
          "action_id": "distance_select_value",
          "placeholder": {
            "type": "plain_text",
            "text": "Distance (in miles)",
            "emoji": true
          },
          "options": [{
              "text": {
                "type": "plain_text",
                "text": "0.25 mi",
                "emoji": true
              },
              "value": "402"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "0.5 mi",
                "emoji": true
              },
              "value": "805"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "1 mi",
                "emoji": true
              },
              "value": "1610"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "1.5 mi",
                "emoji": true
              },
              "value": "2414"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "2 mi",
                "emoji": true
              },
              "value": "3218"
            }
          ]
        },
        "label": {
          "type": "plain_text",
          "text": "Distance :straight_ruler:",
          "emoji": true
        }
      },
      {
        "type": "input",
        "block_id": "price_select",
        "element": {
          "type": "static_select",
          "action_id": "price_select_value",
          "placeholder": {
            "type": "plain_text",
            "text": "Price (is exact)",
            "emoji": true
          },
          "options": [
            {
              "text": {
                "type": "plain_text",
                "text": "Any",
                "emoji": true
              },
              "value": "0"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "$",
                "emoji": true
              },
              "value": "1"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "$$",
                "emoji": true
              },
              "value": "2"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "$$$",
                "emoji": true
              },
              "value": "3"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "$$$$",
                "emoji": true
              },
              "value": "4"
            }
          ]
        },
        "label": {
          "type": "plain_text",
          "text": "Price :pandamoney:",
          "emoji": true
        }
      }
    ],
  }

export default RESTAURANT_MODAL;
