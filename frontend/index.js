// frontend/index.js
const send = document.getElementById('send');
const nameInput = document.getElementById('name');
const contentInput = document.getElementById('content');

send.addEventListener('click', async function(e) {
    e.preventDefault();
    
    // Get form values
    const name = nameInput.value.trim();
    const content = contentInput.value.trim();
    
    // Validate input
    if (!name || !content) {
        alert('Please fill in all fields');
        return;
    }
    
    try {
        // Send data to backend
        const response = await fetch('http://localhost:5000/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, content })
        });
        
        if (response.ok) {
            alert('Message sent successfully!');
            // Clear form
            nameInput.value = '';
            contentInput.value = '';
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        alert('Error sending message: ' + error.message);
    }
});