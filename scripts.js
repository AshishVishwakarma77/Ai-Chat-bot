let inputprompt = document.querySelector("#prompt-input");
let chatContainer = document.querySelector(".chat-container");

// It helps in changing inner text on the div 
function createchatbox(html, classes) {
    let div = document.createElement("div");
    div.innerHTML = html;
    div.classList.add(classes);
    return div;
}

function handlechatreponse(msg) {
    let html = `<img src="./User  Image.png" alt="" id="user-img" width="50">
                <div class="user-chat-area">
                ${msg}
                </div>`;
    
    inputprompt.value = "";       // Clear the input field
    let userChatbox = createchatbox(html, "user-chat-box"); 

    // Append the user chatbox to the chat container
    chatContainer.appendChild(userChatbox);
    
    setTimeout(() => {
        let html = `<img src="./Ai Image.png" alt="" id="ai-img" width="50">
                    <div class="ai-chat-area">
                    </div>`;
        
        const aichatbox = createchatbox(html, "ai-chat-box"); 
        
        
        chatContainer.appendChild(aichatbox); 
    }, 600);
}

// Keydown tells us about which key is pressed & if enter is pressed 
// then it triggers & calls handlechatreponse function


inputprompt.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        handlechatreponse(inputprompt.value);
    }
});