const express = require("express");

const app = express();

const http = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname+"/public"));

http.listen(PORT,function(){
    console.log(`Server running on PORT ${PORT}`);
})


app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})


// Socket

const io = require('socket.io')(http);

io.on('connection',(socket) => {
    console.log('CONNECTED ...');
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
    })
})