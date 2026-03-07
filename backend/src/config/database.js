import mongoose from 'mongoose';

async function connectToDB() {

    try {
        await mongoose.connect(process.env.MONGODB_URL)

        console.log("mongoose database connect successfully");
    }
    catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
}

export default connectToDB;