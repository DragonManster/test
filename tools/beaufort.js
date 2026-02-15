// Beaufort Cipher Cracker
function beaufortDecrypt(ciphertext, key) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let plaintext = '';
    let keyIndex = 0;
    
    for (let char of ciphertext) {
        if (alphabet.includes(char)) {
            const c = alphabet.indexOf(char);
            const k = alphabet.indexOf(key[keyIndex % key.length]);
            plaintext += alphabet[(k - c + 26) % 26];
            keyIndex++;
        }
    }
    return plaintext;
}

async function runBeaufort() {
    const input = document.getElementById('beaufort-input').value.toLowerCase().replace(/[^a-z]/g, '');
    
    if (!input) {
        alert('Please enter ciphertext');
        return;
    }
    
    const dict = await loadDictionary();
    if (!dict) return;
    
    showProgress('beaufort-progress', true);
    updateProgress('beaufort-progress-bar', 0);
    
    const results = [];
    const words = Array.from(dict).filter(w => w.length >= 2 && w.length <= input.length);
    
    for (let i = 0; i < words.length; i++) {
        const key = words[i];
        const plaintext = beaufortDecrypt(input, key);
        
        if (dict.has(plaintext)) {
            results.push({ key, plaintext });
        }
        
        if (i % 1000 === 0) {
            updateProgress('beaufort-progress-bar', Math.round((i / words.length) * 100));
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    }
    
    updateProgress('beaufort-progress-bar', 100);
    showProgress('beaufort-progress', false);
    
    let output = `<strong>Found ${results.length} possible solution(s):</strong><br><br>`;
    
    if (results.length === 0) {
        output += '<em>No valid words found.</em>';
    } else {
        results.forEach(r => {
            output += `<div class="result-item"><strong>Key:</strong> ${r.key} → <strong>Plaintext:</strong> ${r.plaintext}</div>`;
        });
    }
    
    showOutput('beaufort-output', output);
}
