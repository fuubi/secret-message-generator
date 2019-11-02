textInputElement = document.getElementById('alphabet-shift-textarea');
encodedMessage = document.getElementById('alphabet-shift-encoded-message')

textInputElement.addEventListener('ionInput', event => {
    let rawMessage = event.target.textContent
    if (rawMessage.length <= 1) {
        encodedMessage.innerText = 'Please type something into the message box above.';
        return;
    }

    this.encodedMessage.innerText = rawMessage
});
