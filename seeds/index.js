const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../models/campground");


mongoose.connect("mongodb://127.0.0.1:27017/YelpCampDB");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database Connected!");
})

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]; // Just returns a random element of the passed array.



const seedDB = async() => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++){
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      author: "65ca1e59162584e2bc4ddff5",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus optio, voluptatem veritatis ea, nesciunt corrupti, distinctio architecto quae dolores minima qui beatae. Magni animi dolore nisi earum, accusantium magnam vero.",
      price
    })
    await camp.save();
  }
}

seedDB().then(() => {
  db.close();
})