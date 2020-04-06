import mongoose from 'mongoose';
import keys from './keys.js';

export default () => {
    mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, () => {
        console.log('Connected to mongo');
    });
}

