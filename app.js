const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

const User = mongoose.model("User", {
    name: String
});

app.post("/save", async (req, res) => {

    try {

        await User.create({
            name: req.body.name
        });

        res.send(`
            <h1>Data Saved Successfully!</h1>
            <p>Name: ${req.body.name}</p>
            <a href="/">Go Back</a>
        `);

    } catch (error) {

        console.log(error);
        res.status(500).send("Error saving data");

    }

});

app.listen(3000, () => {
    console.log("Application running on port 3000");
});
