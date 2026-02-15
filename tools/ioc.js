// Index of Coincidence Analyzer
function calculateIoC(text) {
    text = text.toUpperCase().replace(/[^A-Z]/g, '');
    const n = text.length;
    if (n <= 1) return 0;
    
    const freq = {};
    for (let char of text) {
        freq[char] = (freq[char] || 0) + 1;
    }
    
    let sum = 0;
    for (let f of Object.values(freq)) {
        sum += f * (f - 1);
    }
    
    return sum / (n * (n - 1));
}

function runIoC() {
    const input = document.getElementById('ioc-input').value;
    
    if (!input.trim()) {
        alert('Please enter ciphertext');
        return;
    }
    
    const ciphertext = input.toUpperCase().replace(/[^A-Z]/g, '');
    const expectedIoC = 0.06678;
    const overallIoC = calculateIoC(ciphertext);
    
    let output = `<strong>Analysis Results:</strong><br><br>`;
    output += `Text length: ${ciphertext.length} characters<br>`;
    output += `Overall IoC: ${overallIoC.toFixed(5)}<br>`;
    output += `Expected IoC (English): ${expectedIoC.toFixed(5)}<br><br>`;
    output += '<em>Full IoC analysis with graph requires more implementation</em>';
    
    showOutput('ioc-output', output);
}
