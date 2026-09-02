const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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

// new route:
app.get("/listings/new", async(req,res) =>{
    res.render("listing/new.ejs");

})

// create route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);

    await newListing.save();

    res.redirect("/listings");
});

// edit route:
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);

    res.render("listing/edit.ejs", { listing });
});

// show route:

app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);

    res.render("listing/show.ejs", { listing });
});

// update route:

app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;

    await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    res.redirect(`/listings/${id}`);
});

// delete route:

// delete route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;

    await Listing.findByIdAndDelete(id);

    res.redirect("/listings");
});



app.listen(8080, () =>{
    console.log("Listening port 8080");
});