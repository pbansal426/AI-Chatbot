const axios = require("axios");

async function sendMessage() {
    const inputField = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    let userMessage = inputField.value.trim();
    if (!userMessage) return;

    // Display user message
    chatBox.innerHTML += `<div class="message user">${userMessage}</div>`;
    inputField.value = "";
    
    // Send request to backend
    let response = await axios.post("http://127.0.0.1:8000/chat", { message: userMessage });

    let aiMessage = response.data.response;
    
    // Format code properly
    if (aiMessage.includes("```")) {
        aiMessage = aiMessage.replace(/```(.*?)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
    }

    // Display AI response
    chatBox.innerHTML += `<div class="message ai">${aiMessage}</div>`;
    
    chatBox.scrollTop = chatBox.scrollHeight;
}
