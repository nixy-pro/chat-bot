// made with love nixy
const botResponses = {
    'greetings': ['hi', 'hlo', 'hello', 'hye'],
    'feelingGood': ['am fine','am gud','gud','too g','too good', 'am fine n you','am fine and you','good', 'superb','Great ','nice','Good too'],
    'feelingBad': ['bad','not gud','not good','fair','nothing much','just fair','not well'  ],
    'feelbetter': ['yeah','idk',"I don't know",'yeah sure','sure','fr','for real', 'maybe','idk man','ya'],
    'annouey': ['fuck','fuck you','stupid','mf','stupid ass mf'],
    'stupid': 'i did not understand that.'
};

const responseMapping = {
    'greetings': 'How are you doing?',
    'annouey': 'I dont give a single fuck about you if you fee like you need my help you can always come back and chat !',
    'feelingGood': 'Glad to hear that!',
    'stupid': 'Go back to school, then',
    'feelbetter': 'Oh okay i will be glad to hear that',
    'feelingBad': 'Sorry to hear that 😥 is thier anything I can do to make you feel better',
    'default': 'Teach me how to reply to that here https://t.me/jesse_pro after i will be able to understand it !',
};

function sendMessage() {
    let userInput = document.getElementById('userInput').value.trim().toLowerCase();
    
    if (userInput === '') return;

    addSentMessage(userInput);
    determineBotResponse(userInput);

    document.getElementById('userInput').value = '';
}

function addSentMessage(message) {
    let chatBox = document.getElementById('chatBox');
    let messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', 'sent');
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

function determineBotResponse(userInput) {
    let responseKey = Object.keys(botResponses).find(key => 
        botResponses[key].includes(userInput)
    ) || 'default';
    
    let response = responseMapping[responseKey];
    simulateBotTyping(response);
}

function simulateBotTyping(response) {
    let typingSpeed = 100;
    let chatBox = document.getElementById('chatBox');
    let messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', 'received');
    chatBox.appendChild(messageDiv);

    // Check if the response contains a link (starts with http or https)
    let linkRegex = /(https?:\/\/[^\s]+)/g;
    let responseParts = response.split(linkRegex);

    let index = 0;
    let interval = setInterval(function() {
        if (index < responseParts.length) {
            if (responseParts[index].match(linkRegex)) {
                // Create an anchor tag for the URL
                let link = document.createElement('a');
                link.textContent = responseParts[index];
                link.href = responseParts[index].trim();
                link.target = '_blank';
                link.style.textDecoration = 'none'; // Remove underline
                link.style.color = 'darkblue'; // Set dark blue color
                messageDiv.appendChild(link);
            } else {
                // Append normal text
                let textNode = document.createTextNode(responseParts[index]);
                messageDiv.appendChild(textNode);
            }
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
            index++;
        } else {
            clearInterval(interval);
        }
    }, typingSpeed);
}
// If you are having trouble editing the code get help from channel @jesse_pro
