const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true,"please add username"]
    },
    email: {
        type : String,
        required : [true,"please add user email address"],
        unique : [true,"Email address alreadt exist"]

    },
    password : {
        type : String,
        required : [true,"please provide password"]
    }
},
{
    timestamps : true,
}
);

module.exports = mongoose.model("User",userSchema);