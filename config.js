module.exports = {
  username: process.env.AUTH_USERNAME || 'username',
  password: process.env.AUTH_PASSWORD || 'password',
  port: process.env.PORT || 3000
};
/*module.exports = {
  apiKey: process.env.API_KEY || 'mykeyfortest',
  port: process.env.PORT || 3000
};*/
