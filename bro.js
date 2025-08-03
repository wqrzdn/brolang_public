function runBroLang() {
    const code = document.getElementById('codeArea').value;
    const outputElement = document.getElementById("outputBox");
    
    try {
        console.log("Running BroLang code...");
        
        // Clear previous output
        outputElement.innerHTML = '';
        
        // Tokenize
        const tokens = tokenizeBro(code);
        console.log("=== TOKENS DEBUG ===");
        tokens.forEach((token, i) => {
            console.log(`Token ${i}: ${token.type} = "${token.value}"`);
        });
        
        // Parse and execute
        const result = parseBro(tokens);
        
        // Display result
        if (result && result.trim() !== '') {
            outputElement.textContent = result;
            console.log("Output set successfully:", result);
        } else {
            outputElement.innerHTML = '<div class="output-placeholder">No output generated</div>';
        }
    }
    catch (error) {
        console.error("BroLang Error:", error);
        outputElement.innerHTML = `<div style="color: #ff5252;">Error: ${error.message}</div>`;
    }
}
  