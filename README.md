# Site Response Time

SPA shows response times between OpenShift clusters on IBM Cloud Satellite locations. Neumorphic design is from a public pen on [Cameron Knight's](https://codepen.io/cameronknight) Codepen. 

## Installation

Use the `example_env.txt` as a guide to create the .env file for storing the environmental variables.

Log into IBM Cloud using the CLI with the command `ibmcloud login --apikey='YOURAPIKEYHERE'`.

If you don't know your IAM token, you can get your IAM Token for IBM Cloud by typing the command (after logging in) `ibmcloud iam oauth-tokens`.

Place the live URL of the site you wish to test response time of into LOCATION and LOCATION_2.

Do `npm i` to install the necessary packages.

To test locally, run `npm start` and open the link http://localhost:8000/api.

