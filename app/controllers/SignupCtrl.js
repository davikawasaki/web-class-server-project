var Q = require('q');

function SignupCtrl(app, mongoose) {
    // First save user
    // Get user id
    // Save login with crypto
    var loginModel = app.models.LoginModel;
    var userModel = app.models.UserModel;

    this.register = function(req, res, next) {
        var data = req.body;
        var user = new userModel({
            name: data.name,
            email: data.email,
            address: data.address,
            addressNumber: data.addressNumber,
            addressComplement: data.addressComplement
        });

        var login = {
            username: data.username,
            password: data.password
        };

        // Open mongo connection
        var connection = new app.databases.mongoConnection();
        
        this.saveUser(user)
            .then(function success(data) {
                console.log(saveLogin(login, data))
                return saveLogin(login, data);
            })
            .then(function success(data) {
                let session = req.session;
                session.username = data.username;
                session.userType = data.userType;
                session.userId = data.userId;
                session.status = true;
                res.status(204).redirect('/');
                res.end('done');
                connection.close();
            })
            .catch(function error(err) {
                next(err);
            });
    };

    this.saveUser = function(user) {
        let deferred = Q.defer();
        console.log(user)
        user.save().then(
            function success(result) {
                return deferred.resolve(result);
            },
            function error(err) {
                return deferred.reject(err);
            }
        );
        return deferred.promise;
    };

    var saveLogin = function(login, us) {
        let deferred = Q.defer();

        var lm = new loginModel({
            username: login.username,
            password: login.password,
            userType: 'user',
            userId: us._id
        });

        lm.save().then(
            function success(result) {
                let user = {
                    username: result.username,
                    userType: result.userType,
                    userId: us._id
                };
                return deferred.resolve(user);
            }, function error(err) {
                return deferred.reject(err);
            }
        );
        return deferred.promise;
    };
}

// Prototype wrapper
module.exports = function() {
    return SignupCtrl;
};