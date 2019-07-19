const config = {
  server: process.env.SERVER,
  // server: 'http://localhost:8010',
  factory: process.env.FACTORY,
};

// if (process.env.NODE_ENV === 'development') {
//   config.cdn = config.devCDN;
// } else {
//   config.cdn = config.prodCDN;
// }

module.exports = config;
