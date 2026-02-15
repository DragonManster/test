// Word Finder
function parseQuickMode(input) {
    const bracketRegex = /\[([^\]]+)\]/g;
    const matches = [...input.matchAll(bracketRegex)];
    
    if (matches.length === 0) return null;
    
    const letterLists = [];
    matches.forEach(match => {
        const content = match[1].trim();
        if (content.includes(' ')) {
            letterLists.push(content.split(/\s+/).filter(s => s));
        } else {
            letterLists.push(content.split(''));
        }
    });
    
    return letterLists;
}

function* cartesianProduct(arrays) {
    if (arrays.length === 0) return;
    
    const indices = new Array(arrays.length).fill(0);
    const maxIndices = arrays.map(arr => arr.length - 1);
    
    while (true) {
        yield indices.map((idx, i) => arrays[i][idx]);
        
        let pos = arrays.length - 1;
        while (pos >= 0 && indices[pos] === maxIndices[pos]) {
            indices[pos] = 0;
            pos--;
        }
        
        if (pos < 0) break;
        indices[pos]++;
    }
}

async function runWordFinder() {
    const input = document.getElementById('word-finder-input').value.trim();
    
    if (!input) {
        alert('Please enter bracket notation');
        return;
    }
    
    const letterLists = parseQuickMode(input);
    if (!letterLists) {
        alert('No valid brackets found. Use format: [ABC][DEF][GHI]');
        return;
    }
    
    const dict = await loadDictionary();
    if (!dict) return;
    
    const minLength = letterLists.reduce((sum, opts) => sum + Math.min(...opts.map(o => o.length)), 0);
    const maxLength = letterLists.reduce((sum, opts) => sum + Math.max(...opts.map(o => o.length)), 0);
    const validWords = new Set([...dict].filter(w => w.length >= minLength && w.length <= maxLength));
    
    const totalCombinations = letterLists.reduce((prod, opts) => prod * opts.length, 1);
    
    showProgress('word-finder-progress', true);
    updateProgress('word-finder-progress-bar', 0);
    
    const foundWords = [];
    let checked = 0;
    
    for (let combo of cartesianProduct(letterLists)) {
        const word = combo.join('').toLowerCase();
        if (validWords.has(word)) {
            foundWords.push(word);
        }
        
        checked++;
        if (checked % 10000 === 0 || checked === totalCombinations) {
            updateProgress('word-finder-progress-bar', Math.round((checked / totalCombinations) * 100));
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    }
    
    showProgress('word-finder-progress', false);
    
    let output = `<strong>Found ${foundWords.length} word(s) (${totalCombinations.toLocaleString()} combinations checked):</strong><br><br>`;
    
    if (foundWords.length === 0) {
        output += '<em>No valid words found. Try different letter combinations.</em>';
    } else {
        foundWords.sort().forEach(word => {
            const displayWord = dictionaryOriginal.has(word) ? dictionaryOriginal.get(word) : word;
            output += `<span style="display: inline-block; margin: 5px 10px 5px 0;">${displayWord}</span>`;
        });
    }
    
    showOutput('word-finder-output', output);
}
