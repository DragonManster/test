// Core functionality
let dictionary = null;
let dictionaryOriginal = null;

function showTool(toolId) {
    document.querySelectorAll('.tool-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.getElementById(toolId).classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const clickedItem = Array.from(document.querySelectorAll('.nav-item')).find(
        item => item.getAttribute('onclick') === `showTool('${toolId}')`
    );
    if (clickedItem) {
        clickedItem.classList.add('active');
    }
}

function clearOutput(outputId) {
    const output = document.getElementById(outputId);
    output.innerHTML = '';
    output.classList.add('empty');
}

function showOutput(outputId, content) {
    const output = document.getElementById(outputId);
    output.innerHTML = content;
    output.classList.remove('empty');
}

function showProgress(progressId, show) {
    const progress = document.getElementById(progressId);
    if (progress) {
        progress.style.display = show ? 'block' : 'none';
    }
}

function updateProgress(progressBarId, percent) {
    const bar = document.getElementById(progressBarId);
    if (bar) {
        bar.style.width = percent + '%';
        bar.textContent = percent + '%';
    }
}

// Load dictionary
async function loadDictionary() {
    if (dictionary) return dictionary;
    
    try {
        const response = await fetch('https://raw.githubusercontent.com/david47k/top-english-wordlists/refs/heads/master/top_english_words_mixed_500000.txt');
        const text = await response.text();
        
        const words = text.split('\n').map(w => w.trim()).filter(w => w.length > 0);
        
        dictionary = new Set(words.map(w => w.toLowerCase()));
        
        dictionaryOriginal = new Map();
        words.forEach(word => {
            const normalized = word.toLowerCase();
            if (!dictionaryOriginal.has(normalized) || 
                (word.match(/[A-Z]/g) || []).length > (dictionaryOriginal.get(normalized).match(/[A-Z]/g) || []).length) {
                dictionaryOriginal.set(normalized, word);
            }
        });
        
        return dictionary;
    } catch (error) {
        alert('Error loading dictionary. Please check your internet connection.');
        return null;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const vigMode = document.getElementById('vig-mode');
    if (vigMode) {
        vigMode.addEventListener('change', (e) => {
            const bruteOptions = document.getElementById('vig-brute-options');
            bruteOptions.style.display = e.target.value === 'brute' ? 'block' : 'none';
        });
    }
    
    // Load dictionary on page load
    loadDictionary();
});
