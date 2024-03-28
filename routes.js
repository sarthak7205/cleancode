const fs=require('fs')
const route =(req,res)=>
{
const url =req.url
const method =req.method
if(url==='/')

{
    
    const data = fs.readFileSync('message.txt', 'utf8');
   
    res.write('<html>');
res.write('<head><title>Enter Message</title></head>');

res.write('<body>');
res.write(`<p>${data}</p>`)
res.write('<form action="/message" method="POST">');
res.write('<input type="text" name="message">');
res.write('<button type="submit">Send</button>');
res.write('</form>');
res.write('</body>');
res.write('</html>');
  return res.end();

}

if(url==='/message' && method==='POST')
{

    const body=[]
    req.on('data',(chunk)=>{
        console.log(chunk);
      body.push(chunk)

    })
    req.on('end',()=>{
        const parsedBody=Buffer.concat(body).toString();
        const message=parsedBody.split('=')[1]
        fs.writeFileSync('message.txt',message);
        console.log (message)
    })
    res.statusCode=302
    res.setHeader('Location','/')
    return res.end()
}
res.setHeader('conent-Type','text/html');
res.write('<html>')
res.write('<head><title>my first page</title></head>')
res.write('<body><h1>hello from node.js server</h1></body>')
res.write('</html>')
res.end();
}
module.exports= route
  