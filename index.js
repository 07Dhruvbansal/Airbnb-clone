const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

app.set("view engine", "ejs");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}


app.get("/",(req,res) =>{
    res.send("working");
});

// index route: 
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listing/index.ejs", { allListings });
});

// show route:

app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);

    res.render("listing/show.ejs", { listing });
});


app.listen(8080, () =>{
    console.log("Listening port 8080");
});