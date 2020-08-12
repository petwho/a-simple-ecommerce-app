const gateway = require('fast-gateway')
const server = gateway({
  routes: [{
    prefix: '/users',
    target: 'http://127.0.0.1:3000'
  }]
})
 
server.start(8080).then(srv => {
  console.log("Starting...");
});
