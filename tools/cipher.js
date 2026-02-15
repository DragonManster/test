// Cipher Tool
function caesarShift(text, n) {
    let output = '';
    for (let char of text) {
        if (char >= 'a' && char <= 'z') {
            let x = char.charCodeAt(0);
            x = x + n;
            if (x > 'z'.charCodeAt(0)) {
                x = 'a'.charCodeAt(0) - 1 + (x - 'z'.charCodeAt(0));
            }
            output += String.fromCharCode(x);
        } else if (char >= 'A' && char <= 'Z') {
            let x = char.charCodeAt(0);
            x = x + n;
            if (x > 'Z'.charCodeAt(0)) {
                x = 'A'.charCodeAt(0) - 1 + (x - 'Z'.charCodeAt(0));
            }
            output += String.fromCharCode(x);
        } else {
            output += char;
        }
    }
    return output;
}

function base64Decode(text) {
    try {
        return atob(text.trim());
    } catch (e) {
        return 'Invalid Base64';
    }
}

function morseDecode(text) {
    const morseDict = {
        '-': 'T', '-.--': 'Y', '.': 'E', '-.-': 'K', '..---': '2', '.--': 'W',
        '-.': 'N', '.--.': 'P', '.-.': 'R', '...': 'S', '.---': 'J', '-..-': 'X',
        '...--': '3', '...-': 'V', '-....': '6', '--..': 'Z', '---': 'O', '-.-.': 'C',
        '-..': 'D', '----.': '9', '--.': 'G', '..-': 'U', '---..': '8', '-...': 'B',
        '..': 'I', '.-..': 'L', '....-': '4', '..-.': 'F', '....': 'H', '.-': 'A',
        '--': 'M', '--...': '7', '.....': '5', '--.-': 'Q', '-----': '0', '.----': '1'
    };
    
    let result = '';
    for (let letter of text.split(' ')) {
        result += morseDict[letter] || '?';
    }
    return result;
}

function mirrorDecode(text) {
    return text.split('').reverse().join('');
}

function letter2number(text) {
    const lowerDict = {
        'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
        'j': 10, 'k': 11, 'l': 12, 'm': 13, 'n': 14, 'o': 15, 'p': 16, 'q': 17,
        'r': 18, 's': 19, 't': 20, 'u': 21, 'v': 22, 'w': 23, 'x': 24, 'y': 25, 'z': 26
    };
    const upperDict = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
        'J': 10, 'K': 11, 'L': 12, 'M': 13, 'N': 14, 'O': 15, 'P': 16, 'Q': 17,
        'R': 18, 'S': 19, 'T': 20, 'U': 21, 'V': 22, 'W': 23, 'X': 24, 'Y': 25, 'Z': 26
    };
    
    let result = '';
    for (let char of text) {
        if (lowerDict[char]) {
            result += lowerDict[char];
        } else if (upperDict[char]) {
            result += upperDict[char];
        } else {
            result += char;
        }
    }
    return result;
}

function runCipherTool() {
    const input = document.getElementById('cipher-input').value;
    const type = document.getElementById('cipher-type').value;
    
    if (!input.trim()) {
        alert('Please enter ciphertext');
        return;
    }
    
    let output = '<div style="font-family: monospace;">';
    
    if (type === 'auto' || type === 'caesar') {
        output += '<div style="margin-bottom: 20px;"><strong>Caesar Cipher (All ROT values):</strong></div>';
        for (let i = 1; i < 26; i++) {
            const result = caesarShift(input, i);
            const highlight = (result.toLowerCase().includes('flag') || result.toLowerCase().includes('ctf')) 
                ? ' style="background: #fff3cd; padding: 5px;"' : '';
            output += `<div${highlight}>ROT${i}: ${result}</div>`;
        }
    }
    
    if (type === 'auto' || type === 'base64') {
        if (input.trim().length % 4 === 0 || type === 'base64') {
            output += '<div style="margin: 20px 0;"><strong>Base64 Decode:</strong></div>';
            output += `<div>${base64Decode(input)}</div>`;
        }
    }
    
    if (type === 'auto' || type === 'morse') {
        if (/^[\.\-\s]*$/.test(input) || type === 'morse') {
            output += '<div style="margin: 20px 0;"><strong>Morse Code:</strong></div>';
            output += `<div>${morseDecode(input)}</div>`;
        }
    }
    
    if (type === 'auto' || type === 'mirror') {
        output += '<div style="margin: 20px 0;"><strong>Mirror (Reverse):</strong></div>';
        output += `<div>${mirrorDecode(input)}</div>`;
    }
    
    if (type === 'auto' || type === 'l2n') {
        output += '<div style="margin: 20px 0;"><strong>Letter to Number:</strong></div>';
        output += `<div>${letter2number(input)}</div>`;
    }
    
    output += '</div>';
    showOutput('cipher-output', output);
}
