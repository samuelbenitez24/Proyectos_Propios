const mongoose=require('mongoose');

//conexion a la bd de mongo 
const connectdb = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
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