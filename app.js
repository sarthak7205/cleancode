const http=require('http')
const route= require('./routes.js')
const server=http.createServer(route)
server.listen(3000 ,()=>{console.log('server is running on port 3000')})