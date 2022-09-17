const cloudinary = require('cloudinary');

require('dotenv').config({path: './config/.env'});

cloudinary.config({ 
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET
});