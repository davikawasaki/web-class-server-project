
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    addressNumber: {
        type: Number,
        required: true
    },
    addressComplement: {
        type: String,
        required: false
    },
    localization: {
        type: {
            type: String,
            required: false
        },
        coordinantes: {
            type: Array,
            required: false
        }
    }
});

module.exports = function() {
    return mongoose.model('User', UserSchema);
}