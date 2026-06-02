import mongoose from 'mongoose';
const connectDB = async () => {
    try {

        mongoose.connection.on('connected',()=>{console.log("MongoDB connected successfully")});

        let mongodbURI = process.env.MONGODB_URI ;
        const projectName = "resume_builder";
        if (!mongodbURI) {
            throw new Error("MONGODB_URI environment variable is not defined");
        }

        if(mongodbURI.endsWith("/")) {
            mongodbURI = mongodbURI.slice(0, -1);
        }

        await mongoose.connect(`${mongodbURI}/${projectName}`)

    }catch (error) {
        console.log("Error connecting to MongoDB:", error);

    }
}

export default connectDB;