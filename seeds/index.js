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
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '5fc8d4c31240a332f0239b38',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url:
            'https://res.cloudinary.com/dzm0huf8s/image/upload/v1606996837/YelpCamp/v32akhtzogmpdql7fi8s.jpg',
          filename: 'YelpCamp/v32akhtzogmpdql7fi8s'
        },
        {
          url:
            'https://res.cloudinary.com/dzm0huf8s/image/upload/v1606996950/YelpCamp/uxfpzafdqb67lotdfujt.jpg',
          filename: 'YelpCamp/uxfpzafdqb67lotdfujt'
        }
      ],
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam molestias accusamus cumque ex esse quas similique, nesciunt exercitationem excepturi quo? Et aliquid earum aspernatur fuga saepe illo voluptas optio obcaecati.',
      price
    });
    await camp.save();
  }
};

seedDB();
