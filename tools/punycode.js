// Punycode Decoder
function runPunycode() {
    const input = document.getElementById('punycode-input').value.trim();
    
    if (!input) {
        alert('Please enter punycode');
        return;
    }
    
    showOutput('punycode-output', `<strong>Input:</strong> ${input}<br><br><em>Basic punycode decoder - for full implementation use external tool</em>`);
}
