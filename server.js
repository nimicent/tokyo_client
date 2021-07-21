const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const responseTime = require('response-time');
require('dotenv').config();
const cfenv = require("cfenv");
const appEnv = cfenv.getAppEnv();
const path = require('path');


// define route
const dataRoutes = require('./routes/data');

const app = express();

//getting response time 
app.use(responseTime());

const getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(start)

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} [STARTED]`)
    const start = process.hrtime()

    // not really needed

    // res.on('finish', () => {    
    // 	console.log('this happens on beginning the request')        
    //     const durationInMilliseconds = getDurationInMilliseconds (start)
    //     console.log(`${req.method} ${req.originalUrl} [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`)
    // })

    res.on('close', () => {
    	console.log('this happens on finish') 
        const durationInMilliseconds = getDurationInMilliseconds (start)
        console.log(`${req.method} ${req.originalUrl} [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`)
    })

    next()
});

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//assets in /public can be used
app.use(express.static(`${__dirname}/public`));



// not needed but did it out of habit

// // IBM Cloud DB for MongoDB setup -
// let ca = Buffer.from(process.env.CERTIFICATE_BASE64, "base64");

// let mongoDbOptions = {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   ssl: true,
//   sslValidate: true,
//   useUnifiedTopology: true,
//   sslCA: ca
// };

// let mongoDB = process.env.MONGO_URL
// mongoose.connect(mongoDB, mongoDbOptions);

// mongoose.Promise = global.Promise;
// let db = mongoose.connection;
// //- end of setup

// //check health
// db.once('open', function(){
//   console.log('connected to MongoDB 🦦');
// });

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
// cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//route
app.use('/api', dataRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

