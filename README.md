# Pharma Partners API

The finalizing project for the second period of the second year on Avans Hogeschool. In this repository you will find the back end portion of the application, this includes: The node backend server, splunk logging service and mongoDB connection code. 

## Development

1. Run `npm install` to install the required dependencies
2. Configure MongoDB, read more below.
3. Set up the other envoirment variables, read more below.
4. (optional) Configure Splunk, read more below.
5. Run `npm start` to start the application on `http://localhost:3000/api/docs`. 

On this endpoint you'll find all callable endpoint documented in [Swagger](https://swagger.io/). 

## Connecting to [MongoDB](https://www.mongodb.com/)

1. Install [MongoDB](https://www.mongodb.com/) (optional if you have an [Atlas](https://www.mongodb.com/atlas/database) database)
2. In the root directory create a .env file.
3. In the .env file set up the following variables as follows:  
`MONGO_URL="Your Mongo Database URL"`    
`MONGO_DB="Your Mongo Database Name"`    
`MONGO_TEST_DB="Your Mongo Test Database Name"`  

## Setting up other envoirment variables

In the .env file you created for your MongoDB connection also configure the following variables:  
  `SERVER_SECRET="Your super secret encryption key"`  
  `PORT="The port you wish to use"`

## Setting up Splunk

We're assuming you already have your own version of Splunk set up in one way or another.  
To connect the logging of our application to your splunk server simply assign your Splunk key and URL to the  
  `SPLUNK_KEY` and `SPLUNK_URL` variables in your .env file.

## Product Owner

Dit is een project voor het bedrijf [Pharma Partners](https://www.pharma-partners.net/)

### Creators
- [Wessel van Gils](https://github.com/TheElementalDragon)
- [Joey de Jonge](https://github.com/JoeydeJongeAvans)
- [Danine Geijben](https://github.com/dan00n1)
- [Boris Pouw](https://github.com/BPouw)
- [Janne Sterk](https://github.com/JanneS242)
