# FoodBot-Hackathon
Slack Bot that gives you the top 4 rated places based on your desired food Cuisine!
Utilizies Google's Places API to search food based on given location and search criterias.

## Search Criteria
You can search based on Radius and Price on your favorite cuisine!
![Image of Slack Modal](https://github.com/art4829/FootBot/blob/master/src/views/Slack%20Modal.PNG)

## Note
In order to run this on your slack, you would have to **create a google developers account and generate an API Key** and add it into /src/constants/GoogleApiConstants.js. As this app is built using **AWS lambda**, you will also have to create an AWS account and fill in the provider section in src/handler/handler.js.
