const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '5fc926fd92f40f3fb0072e00',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url:
            'https://res.cloudinary.com/dzm0huf8s/image/upload/v1607018366/YelpCamp/furvnd2knrxuohynvznz.jpg',
          filename: 'YelpCamp/furvnd2knrxuohynvznz'
        }
      ],
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam molestias accusamus cumque ex esse quas similique, nesciunt exercitationem excepturi quo? Et aliquid earum aspernatur fuga saepe illo voluptas optio obcaecati.',
      price,
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude]
      }
    });
    await camp.save();
  }
};

seedDB();
