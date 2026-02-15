// Keyboard Heatmap
function runKeyboard() {
    const input = document.getElementById('keyboard-input').value.toUpperCase();
    const layout = document.getElementById('keyboard-layout').value;
    
    if (!input.trim()) {
        alert('Please enter text to analyze');
        return;
    }
    
    const layouts = {
        qwerty: 'QWERTYUIOP' + 'ASDFGHJKL ' + ' ZXCVBNM  ',
        azerty: 'AZERTYUIOP' + 'QSDFGHJKLM' + ' WXCVBN   ',
        qwertz: 'QWERTZUIOP' + 'ASDFGHJKL ' + ' YXCVBNM  ',
        dvorak: '   PYFGCRL' + 'AOEUIDHTNS' + ' QJKXBMWVZ'
    };
    
    const kb = layouts[layout];
    const freq = new Array(30).fill(0);
    
    for (let char of input) {
        const index = kb.indexOf(char);
        if (index !== -1 && char !== ' ') {
            freq[index]++;
        }
    }
    
    const maxFreq = Math.max(...freq);
    
    let output = '<div style="font-family: monospace; line-height: 2;">';
    output += `<strong>${layout.toUpperCase()} Keyboard Layout</strong><br><br>`;
    
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 10; col++) {
            const idx = row * 10 + col;
            const letter = kb[idx];
            const count = freq[idx];
            
            if (letter === ' ') {
                output += '   ';
            } else {
                const intensity = maxFreq > 0 ? Math.round((count / maxFreq) * 255) : 0;
                const color = `rgb(${255 - intensity}, ${255 - intensity}, 255)`;
                output += `<span style="background: ${color}; padding: 8px 12px; margin: 2px; display: inline-block; border: 1px solid #ccc; min-width: 30px; text-align: center;">${letter}<br><small>${count}</small></span>`;
            }
        }
        output += '<br>';
    }
    
    output += '<br><strong>Statistics:</strong><br>';
    output += `Total letters: ${freq.reduce((a, b) => a + b, 0)}<br>`;
    output += `Most frequent: ${kb[freq.indexOf(maxFreq)]} (${maxFreq} times)`;
    output += '</div>';
    
    showOutput('keyboard-output', output);
}
