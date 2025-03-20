let inputprompt = document.querySelector("#prompt-input");
let chatContainer = document.querySelector(".chat-container");
let imgbtn = document.querySelector("#btn-img"); 
let imgbtnimg = document.querySelector("#btn-img img"); 

let btnsubmit = document.querySelector("#btn-submit"); 

//btn-img input is the input tag inside the btn-img 
let inputimgbtn = document.querySelector("#btn-img input"); 




const Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAFyonGSdcl89e39lEGb72UzcMa3UkZNxQ"

let user ={
    message:null,
    file:{
        mime_type:null,
        data: null
    }
}

async function generateResponse(aichatbox) {

    let text = aichatbox.querySelector(".ai-chat-area");
     
    let RequestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "contents": [{
                "parts":[{"text": user.message},(user.file.data?[{"inline_data":user.file}]:[])
                ]
        }]
        })

    };

    try{
        let response = await fetch(Api_url,RequestOptions);
        let data = await response.json();
        let apiResponse = data.candidates[0].content.parts[0].text; // it helps in getting the response from the api
        text.innerHTML = apiResponse; // it helps in showing the response in the chat box
        }
    catch(error){
        console.log("Error");
       }     
    finally{
        chatContainer.scrollTo({
            top: chatContainer.scrollHeight,
            behavior: "smooth"
        });

        imgbtnimg.src =`./image icon.svg`;
        imgbtnimg.classList.remove("chooseimg");
        user.file = {
            mime_type:null,
            data:null
        }
    }      
   
}

// It helps in changing inner text on the div 
function createchatbox(html, classes) {
    let div = document.createElement("div");
    div.innerHTML = html;
    div.classList.add(classes);
    return div;
}

function handlechatreponse(msg) {
    
    user.message = msg;

    let html = `<img src="./User Image.png" alt="" id="user-img" width="8%">
                <div class="user-chat-area">
                ${user.message}  
                ${user.file.data?`<img src="data:${user.file.mime_type};base64,${user.file.data}" alt="User Image" class="choose_img">`:" "}    
                </div>`;        //cause we want to show the user message in the chat box but may be it file or txt that why we use ${user.data}
                                // not ${msg}
                                
    inputprompt.value = "";       // it help in Clearing the input field
    let userChatbox = createchatbox(html, "user-chat-box"); 

    // Append the user chatbox to the chat container
    chatContainer.appendChild(userChatbox);


    // Scroll to the bottom of the chat container
    chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth"
    });

    
    setTimeout(() => {
        let html = `<img src="./Ai Image.png" alt="" id="ai-img" width="10%">
                    <div class="ai-chat-area">
                     <img src="./loading png.webp" alt="Loading" class="load1" id="load" width="40px">
                    </div>`;
        
        const aichatbox = createchatbox(html, "ai-chat-box"); 
        
        
        chatContainer.appendChild(aichatbox); 
        generateResponse(aichatbox);
    }, 600);
}

// Keydown tells us about which key is pressed & if enter is pressed 
// then it triggers & calls handlechatreponse function


inputprompt.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        handlechatreponse(inputprompt.value);
    }
});

//for submit btn
btnsubmit.addEventListener("click",()=>{
    handlechatreponse(inputprompt.value);
});

inputimgbtn.addEventListener("change",()=>{
    const file = inputimgbtn.files[0];
    
    // if there is no file then return
    if(!file){
        return;
    }   

    //used to access the functionality of file reader
    let reader = new FileReader();

    reader.onload=(e)=>{
      let base64str = e.target.result.split(",")[1];   // it helps in getting the base64 string of the image
      user.file = {
        mime_type:file.type,  // user.file is an object which contains the type or mine-type and data of the file
        data: base64str
    }    
     imgbtnimg.src =`data:${user.file.mime_type};base64,${user.file.data}`;
     imgbtnimg.classList.add("chooseimg");
      }
    reader.readAsDataURL(file);

})


//for image btn 

imgbtn.addEventListener('click',()=>{
    imgbtn.querySelector("input").click();
})