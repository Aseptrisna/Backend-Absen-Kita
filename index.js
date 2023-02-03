const http = require("http");
const app = require("./src");
const Configure = require("./src/config/config")
// const server = http.createServer(Configure.credentials,app);
const server = http.createServer(app);
const Logger=require('./src/utils/logger')

server.listen(process.env.PORT, () => {
   Logger.info(`Server Started On Port:${process.env.PORT}`)
});