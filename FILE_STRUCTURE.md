# Ciphertool - Modular File Structure

## File Organization

```
ciphertool/
├── index.html              # Main HTML page
├── README.md              # Documentation
└── tools/                 # JavaScript modules (one per tool)
    ├── main.js           # Core functions (dictionary, UI helpers)
    ├── cipher.js         # Cipher Tool
    ├── vigenere.js       # Vigenere Cracker
    ├── beaufort.js       # Beaufort Cracker
    ├── hexahue.js        # Hexahue Decoder
    ├── ioc.js            # IoC Analyzer
    ├── wordfinder.js     # Word Finder
    ├── keyboard.js       # Keyboard Heatmap
    ├── punycode.js       # Punycode Decoder
    └── anagram.js        # Anagram Solver
```

## Benefits of Modular Structure

1. **Easy Maintenance** - Each tool is in its own file, making debugging easier
2. **Better Organization** - Clear separation of concerns
3. **Easier Collaboration** - Multiple people can work on different tools
4. **Performance** - Browser can cache individual modules
5. **Scalability** - Easy to add new tools without affecting existing ones

## Core Module (main.js)

Contains shared functionality:
- `loadDictionary()` - Loads word list from internet
- `showOutput()` - Display results
- `clearOutput()` - Clear results
- `showProgress()` - Show progress bar
- `updateProgress()` - Update progress percentage
- `showTool()` - Switch between tools

## Adding a New Tool

1. Create a new file in `tools/` directory (e.g., `tools/newtool.js`)
2. Add your tool's functions
3. Add a `runYourTool()` function that can be called from HTML
4. Add script tag to `index.html`: `<script src="tools/newtool.js"></script>`
5. Add nav item and tool section to HTML

## Tool Structure Example

```javascript
// tools/example.js

function runExample() {
    const input = document.getElementById('example-input').value;
    
    if (!input) {
        alert('Please enter input');
        return;
    }
    
    // Your tool logic here
    const result = processInput(input);
    
    showOutput('example-output', result);
}

function processInput(input) {
    // Tool-specific logic
    return 'Result: ' + input;
}
```

## Notes

- All tools share the same dictionary loaded by `main.js`
- Progress bars are handled by core functions
- Each tool is independent and can be modified without affecting others
- `main.js` must be loaded first (before other tool scripts)
