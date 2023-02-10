const mongoose = require("mongoose");

mongoose.connect("mongodb://mongo:Pct4lss2bqEldgnqRTTu@containers-us-west-150.railway.app:6246/ezgeDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});
