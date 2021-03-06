var mongoose = require('mongoose');

function mongoConnection() {
    mongoose.Promise = global.Promise;
    // DB for development
    if(!process.env.NODE_ENV) {
        return mongoose.connect('mongodb://localhost/webclassproject', {
            useMongoClient: true
        });
    }
    // DB for tests
    else if(process.env.NODE_ENV == 'test') {
        return mongoose.connect('mongodb://localhost/webclassproject_test', {
            useMongoClient: true
        });
    }
    // DB for production (heroku)
    // else if(process.env.NODE_ENV == 'production') {
    //     var connectionUrl = process.env.CLEARDB_DATABASE_URL;
    //     var connGroups = connectionUrl.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);
    //     return mysql.createConnection({
    //         host : connGroups[3],
    //         user : connGroups[1],
    //         password : connGroups[2],
    //         database : connGroups[4]
    //     });
    // }
    this.close = function() {
        mongoose.connection.close(function() {
            console.log('MongoDB database connection closed.');
        });
    }
};


mongoose.connection.on('connected', function() {
    console.log('Connected to MongoDB database!');
});

mongoose.connection.on('error', function(err) {
    console.log('There was an error on database: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('MongoDB database was disconnected!');
});

module.exports = function() {
    return mongoConnection;
};