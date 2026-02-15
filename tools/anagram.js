// Anagram Solver
function applyPatternPreAnagram(scrambled, pattern) {
    const groups = {};
    for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];
        if (!groups[char]) groups[char] = '';
        groups[char] += scrambled[i];
    }
    return groups;
}

function applyPatternPostAnagram(pattern) {
    const lengths = [];
    let currentChar = pattern[0];
    let currentLength = 1;
    
    for (let i = 1; i < pattern.length; i++) {
        if (pattern[i] === currentChar) {
            currentLength++;
        } else {
            lengths.push(currentLength);
            currentChar = pattern[i];
            currentLength = 1;
        }
    }
    lengths.push(currentLength);
    return lengths;
}

function findWordMatches(letters, dict) {
    const sorted = letters.toLowerCase().split('').sort().join('');
    const matches = [];
    
    for (let word of dict) {
        if (word.split('').sort().join('') === sorted) {
            matches.push(word);
        }
    }
    
    return matches;
}

async function findPartitionMatchesOptimized(letters, lengths, dict) {
    const matches = [];
    const seen = new Set();
    const maxResults = 100;
    
    // Build word lists for each position
    const wordsByLength = {};
    for (let len of lengths) {
        if (!wordsByLength[len]) {
            wordsByLength[len] = [...dict].filter(w => w.length === len);
        }
    }
    
    // Optimized recursive search
    async function search(pos, remaining, current, checkedCount) {
        if (pos === lengths.length) {
            if (remaining.length === 0) {
                const key = current.join('|');
                if (!seen.has(key)) {
                    seen.add(key);
                    matches.push([...current]);
                }
            }
            return checkedCount;
        }
        
        if (matches.length >= maxResults) return checkedCount;
        
        const targetLen = lengths[pos];
        const validWords = wordsByLength[targetLen] || [];
        
        for (let word of validWords) {
            // Check if we can make this word from remaining letters
            const wordChars = word.split('');
            const remainingChars = remaining.split('');
            let canMake = true;
            const usedIndices = [];
            
            for (let char of wordChars) {
                const idx = remainingChars.findIndex((c, i) => 
                    c === char && !usedIndices.includes(i)
                );
                if (idx === -1) {
                    canMake = false;
                    break;
                }
                usedIndices.push(idx);
            }
            
            if (canMake) {
                const newRemaining = remainingChars
                    .filter((c, i) => !usedIndices.includes(i))
                    .join('');
                
                current.push(word);
                checkedCount = await search(pos + 1, newRemaining, current, checkedCount);
                current.pop();
                
                checkedCount++;
                if (checkedCount % 5000 === 0) {
                    updateProgress('anagram-progress-bar', Math.min(90, 10 + Math.round(checkedCount / 1000)));
                    await new Promise(resolve => setTimeout(resolve, 0));
                }
            }
            
            if (matches.length >= maxResults) break;
        }
        
        return checkedCount;
    }
    
    await search(0, letters, [], 0);
    return matches;
}

async function runAnagram() {
    const mode = document.getElementById('anagram-mode').value;
    const text = document.getElementById('anagram-text').value.trim().toLowerCase().replace(/[^a-z]/g, '');
    const pattern = document.getElementById('anagram-pattern').value.trim().toLowerCase().replace(/[^a-z]/g, '');
    
    if (!text || !pattern) {
        alert('Please enter both scrambled text and pattern');
        return;
    }
    
    if (text.length !== pattern.length) {
        alert('Text and pattern must be the same length');
        return;
    }
    
    const dict = await loadDictionary();
    if (!dict) return;
    
    showProgress('anagram-progress', true);
    updateProgress('anagram-progress-bar', 0);
    
    let output = '';
    
    if (mode === 'pre') {
        // Pre-Anagram
        const groups = applyPatternPreAnagram(text, pattern);
        const groupKeys = Object.keys(groups).sort();
        
        output += `<strong>Pattern groups (${groupKeys.length}):</strong><br><br>`;
        
        const allSolutions = [[]];
        
        for (let key of groupKeys) {
            const letters = groups[key];
            const matches = findWordMatches(letters, dict);
            
            output += `<div class="result-item">Pattern '${key}' → ${letters}`;
            if (matches.length > 0) {
                output += `<br>Matches: ${matches.slice(0, 5).join(', ')}`;
                if (matches.length > 5) output += ` (+${matches.length - 5} more)`;
            } else {
                output += `<br>No matches`;
            }
            output += '</div>';
            
            if (matches.length > 0) {
                const newSolutions = [];
                for (let solution of allSolutions) {
                    for (let match of matches) {
                        newSolutions.push([...solution, match]);
                    }
                }
                allSolutions.length = 0;
                allSolutions.push(...newSolutions);
            } else {
                for (let solution of allSolutions) {
                    solution.push(letters);
                }
            }
        }
        
        output += `<br><strong>Possible answers (${allSolutions.length}):</strong><br>`;
        for (let solution of allSolutions.slice(0, 10)) {
            output += `<div class="result-item">${solution.join(' ')} → ${solution.join('')}</div>`;
        }
        if (allSolutions.length > 10) {
            output += `<div style="margin-top: 10px; color: #666;">Showing first 10 of ${allSolutions.length} results</div>`;
        }
    } else {
        // Post-Anagram
        const lengths = applyPatternPostAnagram(pattern);
        
        output += `<strong>Word lengths:</strong> ${lengths.join(' + ')} letters<br>`;
        output += `<strong>Word count:</strong> ${lengths.length}<br><br>`;
        output += `<strong>Finding valid partitions...</strong><br>`;
        
        updateProgress('anagram-progress-bar', 10);
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const results = await findPartitionMatchesOptimized(text, lengths, dict);
        
        if (results.length > 0) {
            output += `<br><strong>Found ${results.length} solution(s):</strong><br>`;
            for (let words of results.slice(0, 20)) {
                output += `<div class="result-item">${words.join(' + ')} → ${words.join('')}</div>`;
            }
            if (results.length > 20) {
                output += `<div style="margin-top: 10px; color: #666;">Showing first 20 of ${results.length} results</div>`;
            }
        } else {
            output += '<br><em>No valid combinations found</em>';
        }
    }
    
    updateProgress('anagram-progress-bar', 100);
    showProgress('anagram-progress', false);
    showOutput('anagram-output', output);
}
