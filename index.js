const mongoose = require('mongoose');

//Map Global Promise - get rid of warnings
mongoose.Promise = global.Promise;

const db = mongoose.connect(process.env.MONGO_URI, {
    useMongoClient: true
})

const User = require('./models/user');

const addUser = (user)=>{
    User.create(user).then((user)=>{
        console.info("user added successfully");
        db.close();
    })
}

const findUser = (name)=>{
    const newName = new RegExp(name, 'i');
    User.find({$or: [{firstName: newName}, {lastName: newName}]})
    .then((user)=>{
        console.info(user)
        console.info(`${user.length} matches`);
    })
}

module.exports = {addUser, findUser}