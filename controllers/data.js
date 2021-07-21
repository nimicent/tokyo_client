const start = new Date();
console.log(start)
require('dotenv').config();
const axios = require('axios');

// Tokyo client makes req to London server
// London server provides res to Tokyo client

// London client makes req to Tokyo server 
// Tokyo server provides res to London client

// ==========

// FROM tokyo site making a req TO london site

let configT = {
  method: 'get',
  url: process.env.LOCATION_2,
  headers: { 
    'accept': 'application/json', 
    'Authorization': process.env.TOKEN,
    'X-Auth-Resource-Group': process.env.AUTH_GROUP, 
    'Cookie': process.env.COOKIE
  }
};

// FROM london site making a req TO tokyo site

let configL = {
  method: 'get',
  url: process.env.LOCATION,
  headers: { 
    'accept': 'application/json', 
    'Authorization': process.env.TOKEN,
    'X-Auth-Resource-Group': process.env.AUTH_GROUP, 
    'Cookie': process.env.COOKIE
  }
};


exports.time = (req, res, next) => {
    req.someData = {time: Date().toString(), startedAt: start, startedAtFormatted: start.toLocaleDateString('en-US', {
    	month: 'long',
    	year: 'numeric',
    	day: 'numeric',
    	hour: '2-digit',
    	minute: '2-digit',
    	second: 'numeric',
    	timeZone: 'UTC', 
    	timeZoneName: 'short'
    }) }
    // res.render("index");
    next();
};

exports.tokyo = async (req, res, next) => {
 const {data} = await axios(configT);
 req.someData.tokyo = JSON.stringify(data);
 next();
};

exports.london = async (req, res, next) => {
	const {data} = await axios(configL);
	req.someData.london = JSON.stringify(data);
 next();
};


exports.headers = (req, res) => {
  // const someData = req.someData || {};
  res.json(req.someData);
  }



