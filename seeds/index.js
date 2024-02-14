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
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus optio, voluptatem veritatis ea, nesciunt corrupti, distinctio architecto quae dolores minima qui beatae. Magni animi dolore nisi earum, accusantium magnam vero.",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dl2o9rris/image/upload/v1707912091/YelpCamp/gythfinvznbximofpoax.jpg",
          filename: "YelpCamp/gythfinvznbximofpoax"
        },
        {
          url: "https://res.cloudinary.com/dl2o9rris/image/upload/v1707912080/YelpCamp/btroz8ynrnatwha2grwm.jpg",
          filename: "YelpCamp/btroz8ynrnatwha2grwm"
        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  db.close();
})