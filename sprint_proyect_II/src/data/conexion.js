
const mongoose=require('mongoose');

const MONGO_URI=process.env.MONGO_URI;

const connectdb = async () => {
    try {
        const db=await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected!!');
        return db;
    } catch (err) {
        console.log('Failed to connect to MongoDB');
    }
};

connectdb();

exports=connectdb;