const socket = io()
let namee;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
//do {
  //  namee = prompt('Please enter your name: ')
//} while(!namee)


//signup
function signup(e) {
    e.preventDefault();
    console.log(e.target.name);
    const form = new FormData(e.target);

    const signupDetails = {
        name: form.get("namee"),
        email: form.get("email"),
        password: form.get("psw"),
        Phone:form.get("phone")

    }
    console.log(signupDetails)
    axios.post('http://localhost:4000/signup',signupDetails).then(response => {
        if(response.status === 201){
            window.location.href = "../Login/login.html" // change the page on successful login
        } else {
            throw new Error('Failed to login')
        }
    }).catch(err => {
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    })
}
namee=document.getElementById('namee')
//signup
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: namee,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
