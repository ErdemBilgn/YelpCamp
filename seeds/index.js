if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../models/campground");
const images = require("./images");

const dbUrl = process.env.MONGO_URL
mongoose.connect(dbUrl);

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
      author: "65dc65e4fd29249fdc5c4a65",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus optio, voluptatem veritatis ea, nesciunt corrupti, distinctio architecto quae dolores minima qui beatae. Magni animi dolore nisi earum, accusantium magnam vero.",
      price,
      geometry : {
        type: 'Point',
        coordinates: [ 
          cities[random1000].longitude, 
          cities[random1000].latitude 
        ]
      },
      images: [
        sample(images),
        sample(images),
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  db.close();
})
