const mongoose=require("mongoose")
mongoose.set('strictQuery', false);
//Local DB Connection

// mongoose.connect("mongodb://localhost:27017/DroneBee_Auth_DataBase",{
//     useNewUrlParser: true, 
//     useUnifiedTopology: true,
//     family: 4,
// })
// .then(()=>{
//     console.log('mongoose connected');
// })
// .catch((e)=>{
//     console.log('failed');
// })
//Atlas URI
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://harsh:20ec01033@cluster0.ej4ottn.mongodb.net/DroneBee?retryWrites=true&w=majority";
const uri = "mongodb+srv://harsh:20ec01033@cluster0.ej4ottn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//Atlas connection
mongoose.connect(uri,{
    useNewUrlParser: true, 
        useUnifiedTopology: true,
        family: 4,
}).then((con)=>{
    console.log("Connected to Atlas DB");
});

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true,
        unique:true
    }
})

const LogInCollection=new mongoose.model('LogInCollections',logInSchema)

module.exports=LogInCollection