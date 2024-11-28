import mongoose from "mongoose";

const DB_URI = process.env.MONGO_DB_URI || "mongodb+srv://voltantroyer2:Zkwryp0BeTEG09CA@cluster0.dh6l6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const DB_NAME = process.env.MONGO_DB_NAME || "BoraBoraBora"

async function Connect(){

    try {

        await mongoose.connect( DB_URI , { dbName : DB_NAME } );

    } catch (error) {
        
        console.log(error)

        console.log("Err Connecting to Database");

    }
    
}

export default Connect;