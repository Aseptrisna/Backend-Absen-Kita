const fs = require(`fs`);
const credentials = {
  // pfx:fs.readFileSync(process.env.pfx),
  // passphrase: process.env.passphrase,
  // ca: fs.readFileSync(process.env.ca)
};
module.exports = {
  secret: process.env.SECRET,
  user: process.env.EMAIL, 
  pass: process.env.PASSWORD,
  credentials
};