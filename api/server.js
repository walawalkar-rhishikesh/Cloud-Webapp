let express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    bodyParser = require('body-parser');

var StatsD = require('statsd-client'),
    booklisting_counter = new StatsD({port: 8125, prefix: 'booklisting_counter'});
    api_execution_time = new StatsD({port: 8125, prefix: 'api_execution_time'})
    query_execution_time = new StatsD({port: 8125, prefix: 'query_execution_time'})
    s3_execution_time = new StatsD({port: 8125, prefix: 's3_execution_time'})

console.log("ENVIRONMENT::", process.env)

//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Enabling CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if(req.url.includes("/findFor")){
        booklisting_counter.counter('sell_book_listing_counter',1)
    }
    if(req.url.includes("/findNotFor")){
        booklisting_counter.counter('buy_book_listing_counter',1)
    }

    var start = process.hrtime();
    res.once('finish', function() {

        console.log("Request for::",req.url )

        var diff = process.hrtime(start);
        var ms = diff[0] * 1e3 + diff[1] * 1e-6;
        
        console.log('The request processing time is %d ms.', ms);

        var diff1 = process.hrtime(start);
        var ms1 = diff1[0] * 1e3 + diff1[1] * 1e-6;

        if(req.url.includes("/uploadS3Image") || req.url.includes("/removeFromS3") || req.url.includes("/removeImagesOnBookDelete") ){
            s3_execution_time.timing(req.url,ms)
        }else{
            query_execution_time.timing(req.url,ms)
            api_execution_time.timing(req.url,ms1)
        }
    });
    next();
});
const db = require("./models/index");

db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

require("./routes/route.users")(app);
require("./routes/route.books")(app);
require("./routes/route.carts")(app);
require("./routes/route.bookimages")(app);

app.all("/", function(req, res) {
    res.send("Welcome to Webapp!");
});

app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message,
            error: err
        }
    });
});

app.listen(port);
console.log('Webapp application is listening on port : ' + port);