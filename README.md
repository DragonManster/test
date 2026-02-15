# Ciphertool
Web-based tools for breaking ciphers and analyzing encrypted text. Made for CTF competitions and cryptography practice.

## Tools

### Cipher Decryption
- **Cipher Tool** - Auto-detect and decrypt common ciphers (Caesar, Base64, Morse, etc)
- **Vigenere Cracker** - Dictionary attack and brute force
- **Beaufort Cracker** - Dictionary attack for Beaufort cipher
- **Hexahue Decoder** - Decode color-based cipher
- **Punycode Decoder** - Decode internationalized domain names

### Analysis Tools
- **IoC Analyzer** - Find key lengths using Index of Coincidence
- **Keyboard Heatmap** - Visualize letter frequency on different layouts
- **Anagram Solver** - Solve pattern-based anagram puzzles (pre-anagram and post-anagram)

### Utilities
- **Word Finder** - Find valid words from letter combinations

## Notes
- Brute force with high key lengths will be super slow
- Dictionary attacks require internet connection on first use
- All encryption/decryption happens locally in your browser
- Anagram post-anagram mode optimized for better performance

## License
Free to use
