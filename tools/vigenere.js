// Vigenere Cipher Cracker
function vigenereDecrypt(ciphertext, key) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let plaintext = '';
    let keyIndex = 0;
    
    for (let char of ciphertext) {
        if (alphabet.includes(char)) {
            const c = alphabet.indexOf(char);
            const k = alphabet.indexOf(key[keyIndex % key.length]);
            plaintext += alphabet[(c - k + 26) % 26];
            keyIndex++;
        }
    }
    return plaintext;
}

async function runVigenere() {
    const input = document.getElementById('vig-input').value.toLowerCase().replace(/[^a-z]/g, '');
    const mode = document.getElementById('vig-mode').value;
    
    if (!input) {
        alert('Please enter ciphertext');
        return;
    }
    
    const dict = await loadDictionary();
    if (!dict) return;
    
    showProgress('vig-progress', true);
    updateProgress('vig-progress-bar', 0);
    
    const results = [];
    const words = Array.from(dict).filter(w => w.length >= 2 && w.length <= input.length);
    
    for (let i = 0; i < words.length; i++) {
        const key = words[i];
        const plaintext = vigenereDecrypt(input, key);
        
        if (dict.has(plaintext)) {
            results.push({ key, plaintext });
        }
        
        if (i % 1000 === 0) {
            updateProgress('vig-progress-bar', Math.round((i / words.length) * 100));
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    }
    
    updateProgress('vig-progress-bar', 100);
    showProgress('vig-progress', false);
    
    let output = `<strong>Found ${results.length} possible solution(s):</strong><br><br>`;
    
    if (results.length === 0) {
        output += '<em>No valid words found. Try different settings.</em>';
    } else {
        results.forEach(r => {
            output += `<div class="result-item"><strong>Key:</strong> ${r.key} → <strong>Plaintext:</strong> ${r.plaintext}</div>`;
        });
    }
    
    showOutput('vig-output', output);
}
