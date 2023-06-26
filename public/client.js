const socket = io();
let name;
let textarea = document.getElementById('textarea');
let messageArea = document.querySelector('.message_area')
do{
    name = prompt("Please enter your name");
}while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==="Enter"){
        sendMessage(e.target.value);
       
    }
})

function sendMessage(message){
    let msg = {
        user : name,
        message : message.trim()
    }
    appendMessage(msg,'outgoing');
    textarea.value="";
    scrollTopBottom();
    socket.emit('message',msg);

}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div');
    mainDiv.classList.add(type,'message');
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup;
    messageArea.appendChild(mainDiv);
}

// Receive

socket.on('message',(msg)=> {
    appendMessage(msg,'incoming');
    scrollTopBottom();
})

function scrollTopBottom(){
    messageArea.scrollTop = messageArea.scrollHeight; 
}