// Hexahue Decoder
function runHexahue() {
    const input = document.getElementById('hexahue-input').value.trim().toLowerCase();
    
    if (!input) {
        alert('Please enter hexahue code');
        return;
    }
    
    const letters = {
        'prgybc': 'a', 'rpgybc': 'b', 'rgpybc': 'c', 'rgypbc': 'd', 'rgybpc': 'e',
        'rgybcp': 'f', 'grybcp': 'g', 'gyrbcp': 'h', 'gybrcp': 'i', 'gybcrp': 'j',
        'gybcpr': 'k', 'ygbcpr': 'l', 'ybgcpr': 'm', 'ybcgpr': 'n', 'ybcpgr': 'o',
        'ybcprg': 'p', 'bycprg': 'q', 'bcyprg': 'r', 'bcpyrg': 's', 'bcpryg': 't',
        'bcprgy': 'u', 'cbprgy': 'v', 'cpbrgy': 'w', 'cprbgy': 'x', 'cprgby': 'y',
        'cprgyb': 'z'
    };
    
    const symbols = {
        'bwwbbw': '.', 'wbbwwb': ',', 'wwwwww': ' ', 'kkkkkk': ' '
    };
    
    const numbers = {
        'bgwbgw': '0', 'gbwbgw': '1', 'gwbbgw': '2', 'gwbgbw': '3', 'gwbgwb': '4',
        'wgbgwb': '5', 'wbggwb': '6', 'wbgwgb': '7', 'wbgwbg': '8', 'bwgwbg': '9'
    };
    
    const complete = { ...letters, ...symbols, ...numbers };
    
    const codes = input.split(/\s+/);
    let result = '';
    let notFound = [];
    
    codes.forEach((code, i) => {
        if (complete[code]) {
            result += complete[code];
        } else {
            result += '?';
            notFound.push(`'${code}' (position ${i + 1})`);
        }
    });
    
    let output = `<strong>Decoded:</strong> ${result}<br><br>`;
    
    if (notFound.length > 0) {
        output += `<em>Unrecognized codes: ${notFound.join(', ')}</em>`;
    }
    
    showOutput('hexahue-output', output);
}
