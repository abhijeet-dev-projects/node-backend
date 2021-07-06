const mongoURI = 'mongodb+srv://user:user@learningmongodb.gube3.mongodb.net/auth?retryWrites=true&w=majority';
const mongoose = require('mongoose');

const connectToDB = () => {
    try {
        mongoose.connect(mongoURI,
             {useNewUrlParser: true, useUnifiedTopology: true},
             () => {
                 console.log('MongoDB connected...')
             })
    } catch (err) {
        console.error(`could'nt connect to the DB`, err);
    }
}

module.exports = connectToDB;