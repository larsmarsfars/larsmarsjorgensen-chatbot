async function sendPrompt() {
    const prompt = document.getElementById('prompt').value;
    const chatBox = document.getElementById('chat-box');
    
    // Add the user's message to the chat box
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.textContent = prompt;
    chatBox.appendChild(userMessage);
    
    // Clear the textarea
    document.getElementById('prompt').value = '';
    
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    });
    
    const data = await response.json();
    
    // Add the AI's response to the chat box
    const aiMessage = document.createElement('div');
    aiMessage.className = 'ai-message';
    aiMessage.innerHTML = `<p>${data.text}</p>
                           <a href="${data.link}" target="_blank">Relevant Link</a>
                           <img src="${data.image_url}" alt="Relevant Image">`;
    chatBox.appendChild(aiMessage);
    
    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}
