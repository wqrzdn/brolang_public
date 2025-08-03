// 🔥 BROLANG INTERPRETER - GENIUS EDITION 🔥
// Simple, direct, and bulletproof!

function parseBro(tokens) {
    console.log("🚀 BroLang Parser - GENIUS MODE ACTIVATED!");
    console.log(`📊 Processing ${tokens.length} tokens`);
    
    let output = [];
    let variables = {};
    let position = 0;
    
    // === CORE UTILITIES ===
    function current() {
        return position < tokens.length ? tokens[position] : null;
    }
    
    function advance() {
        position++;
        return current();
    }
    
    function peek(offset = 1) {
        return position + offset < tokens.length ? tokens[position + offset] : null;
    }
    
    // === EXPRESSION PARSER ===
    function parseExpression() {
        return parseComparison();
    }
    
    function parseComparison() {
        let left = parseAddition();
        
        while (current() && current().type === 'OPERATOR' && 
               ['>', '<', '>=', '<=', '==', '!='].includes(current().value)) {
            const op = current().value;
            advance();
            const right = parseAddition();
            
            const leftVal = Number(left);
            const rightVal = Number(right);
            
            console.log(`🔍 Comparing: ${leftVal} ${op} ${rightVal}`);
            
            switch (op) {
                case '>': left = leftVal > rightVal; break;
                case '<': left = leftVal < rightVal; break;
                case '>=': left = leftVal >= rightVal; break;
                case '<=': left = leftVal <= rightVal; break;
                case '==': left = left == right; break;
                case '!=': left = left != right; break;
            }
            
            console.log(`🎯 Result: ${left}`);
        }
        return left;
    }
    
    function parseAddition() {
        let left = parseMultiplication();
        
        while (current() && current().type === 'OPERATOR' && ['+', '-'].includes(current().value)) {
            const op = current().value;
            advance();
            const right = parseMultiplication();
            
            if (op === '+') {
                if (typeof left === 'string' || typeof right === 'string') {
                    left = String(left) + String(right);
                } else {
                    left = Number(left) + Number(right);
                }
            } else {
                left = Number(left) - Number(right);
            }
        }
        return left;
    }
    
    function parseMultiplication() {
        let left = parsePrimary();
        
        while (current() && current().type === 'OPERATOR' && ['*', '/'].includes(current().value)) {
            const op = current().value;
            advance();
            const right = parsePrimary();
            
            if (op === '*') {
                left = Number(left) * Number(right);
            } else {
                left = Number(left) / Number(right);
            }
        }
        return left;
    }
    
    function parsePrimary() {
        const token = current();
        if (!token) return 0;
        
        if (token.type === 'OPEN_PAREN') {
            advance();
            const result = parseExpression();
            if (current() && current().type === 'CLOSE_PAREN') {
                advance();
            }
            return result;
        }
        
        if (token.type === 'STRING') {
            advance();
            return token.value.slice(1, -1).replace(/\\n/g, '\n').replace(/\\t/g, '\t');
        }
        
        if (token.type === 'NUMBER') {
            advance();
            return parseFloat(token.value);
        }
        
        if (token.type === 'IDENTIFIER') {
            const varName = token.value;
            advance();
            const value = variables[varName];
            console.log(`📝 Variable ${varName} = ${value}`);
            return value !== undefined ? value : 0;
        }
        
        advance();
        return 0;
    }
    
    // === BLOCK PARSING ===
    function parseBlock() {
        const blockTokens = [];
        if (current() && current().type === 'OPEN_BRACE') {
            advance(); // skip {
            let braceCount = 1;
            
            while (current() && braceCount > 0) {
                if (current().type === 'OPEN_BRACE') {
                    braceCount++;
                } else if (current().type === 'CLOSE_BRACE') {
                    braceCount--;
                    if (braceCount === 0) {
                        advance(); // skip final }
                        break;
                    }
                }
                blockTokens.push(current());
                advance();
            }
        }
        return blockTokens;
    }
    
    // === CONDITION EVALUATION - GENIUS APPROACH ===
    function evaluateCondition(conditionTokens) {
        console.log("🔍 Evaluating condition with current variables:", variables);
        
        // Save current state
        const savedTokens = tokens;
        const savedPosition = position;
        
        // Set up for condition evaluation
        tokens = conditionTokens;
        position = 0;
        
        try {
            const result = parseExpression();
            console.log(`🎯 Condition result: ${result}`);
            
            // Restore state
            tokens = savedTokens;
            position = savedPosition;
            
            return Boolean(result);
        } catch (error) {
            console.error("❌ Condition evaluation error:", error);
            // Restore state
            tokens = savedTokens;
            position = savedPosition;
            return false;
        }
    }
    
    // === BLOCK EXECUTION - DIRECT APPROACH ===
    function executeBlock(blockTokens) {
        console.log(`🎯 Executing block with ${blockTokens.length} tokens`);
        
        // Save current state  
        const savedTokens = tokens;
        const savedPosition = position;
        
        // Set up block execution
        tokens = blockTokens;
        position = 0;
        
        // Execute statements directly using main parser logic
        while (current()) {
            const token = current();
            console.log(`🔄 Block executing: ${token.type} = ${token.value}`);
            
            try {
                // Variable assignment
                if (token.type === 'IDENTIFIER' && peek() && peek().type === 'OPERATOR' && peek().value === '=') {
                    const varName = token.value;
                    advance(); // skip var
                    advance(); // skip =
                    const value = parseExpression();
                    variables[varName] = value;
                    console.log(`✅ Set ${varName} = ${value}`);
                }
                
                // Say statement
                else if (token.type === 'KEYWORD' && token.value === 'say') {
                    advance(); // skip 'say'
                    const result = parseExpression();
                    const outputStr = String(result);
                    console.log(`💬 Say: "${outputStr}"`);
                    output.push(outputStr);
                }
                
                // Conditionals inside blocks
                else if (token.type === 'KEYWORD' && token.value === 'no cap') {
                    console.log("🧢 BLOCK CONDITIONAL DETECTED!");
                    advance();
                    
                    if (current() && current().type === 'OPEN_PAREN') {
                        advance();
                        const condition = parseExpression();
                        console.log(`🎯 Block condition result: ${condition}`);
                        
                        if (current() && current().type === 'CLOSE_PAREN') {
                            advance();
                        }
                        
                        const trueBlock = parseBlock();
                        console.log(`✅ Block true branch has ${trueBlock.length} tokens`);
                        
                        // Execute appropriate branch
                        if (condition) {
                            console.log("🟢 Executing block TRUE branch");
                            executeBlock(trueBlock);
                            
                            // Skip nah block if condition was true
                            if (current() && current().type === 'KEYWORD' && current().value === 'nah') {
                                console.log("⏭️ Skipping block nah branch (condition was true)");
                                advance(); // skip 'nah'
                                parseBlock(); // Skip without executing
                            }
                        } else {
                            console.log("🔴 Block condition false, checking for nah");
                            // Only execute nah block if condition is false
                            if (current() && current().type === 'KEYWORD' && current().value === 'nah') {
                                console.log("🟡 Executing block nah (FALSE) branch");
                                advance(); // skip 'nah'
                                const falseBlock = parseBlock();
                                executeBlock(falseBlock);
                            }
                        }
                    }
                }
                
                // Skip other tokens
                else {
                    advance();
                }
                
            } catch (error) {
                console.error("❌ Block execution error:", error);
                advance();
            }
        }
        
        // Restore state
        tokens = savedTokens;
        position = savedPosition;
        
        console.log("✅ Block execution complete. Variables:", variables);
    }
    
    // === MAIN EXECUTION LOOP ===
    while (current()) {
        const token = current();
        console.log(`\n🔥 Processing: ${token.type} = "${token.value}"`);
        
        try {
            // Variable declaration: lock name = value
            if (token.type === 'KEYWORD' && token.value === 'lock') {
                advance();
                if (current() && current().type === 'IDENTIFIER') {
                    const varName = current().value;
                    advance();
                    
                    if (current() && current().type === 'OPERATOR' && current().value === '=') {
                        advance();
                        const value = parseExpression();
                        variables[varName] = value;
                        console.log(`🔒 Declared ${varName} = ${value}`);
                    }
                }
            }
            
            // Variable assignment: name = value
            else if (token.type === 'IDENTIFIER' && peek() && peek().type === 'OPERATOR' && peek().value === '=') {
                const varName = token.value;
                advance();
                advance();
                const value = parseExpression();
                variables[varName] = value;
                console.log(`🔄 Updated ${varName} = ${value}`);
            }
            
            // Say statement: say expression
            else if (token.type === 'KEYWORD' && token.value === 'say') {
                advance();
                const result = parseExpression();
                const outputStr = String(result);
                console.log(`💬 Main say: "${outputStr}"`);
                output.push(outputStr);
            }
            
            // WHILE LOOP - GENIUS SIMPLE APPROACH
            else if (token.type === 'KEYWORD' && token.value === 'wloop') {
                console.log("🌪️ WLOOP DETECTED - GENIUS MODE!");
                advance();
                
                if (current() && current().type === 'OPEN_PAREN') {
                    advance(); // skip (
                    
                    // Collect condition tokens
                    const conditionTokens = [];
                    let parenCount = 1;
                    while (current() && parenCount > 0) {
                        if (current().type === 'OPEN_PAREN') parenCount++;
                        else if (current().type === 'CLOSE_PAREN') parenCount--;
                        
                        if (parenCount > 0) {
                            conditionTokens.push(current());
                        }
                        advance();
                    }
                    
                    console.log("🔍 Condition tokens:", conditionTokens.map(t => `${t.type}:${t.value}`));
                    
                    // Parse loop body
                    const blockTokens = parseBlock();
                    console.log("🎯 Loop body tokens:", blockTokens.length);
                    
                    // EXECUTE WHILE LOOP - GENIUS DIRECT APPROACH
                    let iterations = 0;
                    while (iterations < 1000) {
                        console.log(`\n🔄 Loop iteration ${iterations}`);
                        console.log("📊 Current variables before condition:", variables);
                        
                        // Evaluate condition with current variables
                        const conditionResult = evaluateCondition(conditionTokens);
                        console.log(`🎯 Condition evaluated to: ${conditionResult}`);
                        
                        if (!conditionResult) {
                            console.log("🏁 Condition false - exiting loop");
                            break;
                        }
                        
                        // Execute loop body
                        console.log("🚀 Executing loop body...");
                        executeBlock(blockTokens);
                        console.log("📊 Variables after body execution:", variables);
                        
                        iterations++;
                    }
                    
                    console.log(`🎉 While loop completed after ${iterations} iterations`);
                }
            }
            
            // For loop: yappin (start to end) { block }
            else if (token.type === 'KEYWORD' && token.value === 'yappin') {
                advance();
                
                if (current() && current().type === 'OPEN_PAREN') {
                    advance();
                    const start = parseExpression();
                    
                    if (current() && current().type === 'COMPARISON' && current().value === 'to') {
                        advance();
                        const end = parseExpression();
                        
                        if (current() && current().type === 'CLOSE_PAREN') {
                            advance();
                        }
                        
                        const blockTokens = parseBlock();
                        
                        // Execute for loop
                        for (let i = start; i <= end; i++) {
                            // Temporarily set loop variable
                            variables.i = i;
                            executeBlock(blockTokens);
                        }
                    }
                }
            }
            
            // Conditionals: no cap (condition) { block } nah { block }
            else if (token.type === 'KEYWORD' && token.value === 'no cap') {
                console.log("🧢 NO CAP CONDITIONAL DETECTED!");
                advance();
                
                if (current() && current().type === 'OPEN_PAREN') {
                    advance();
                    const condition = parseExpression();
                    console.log(`🎯 Condition result: ${condition}`);
                    
                    if (current() && current().type === 'CLOSE_PAREN') {
                        advance();
                    }
                    
                    const trueBlock = parseBlock();
                    console.log(`✅ True block has ${trueBlock.length} tokens`);
                    
                    // Execute appropriate branch and handle nah properly
                    if (condition) {
                        console.log("🟢 Executing TRUE branch");
                        executeBlock(trueBlock);
                        
                        // CRITICAL: Skip the nah block if condition was true
                        if (current() && current().type === 'KEYWORD' && current().value === 'nah') {
                            console.log("⏭️ Skipping nah block (condition was true)");
                            advance(); // skip 'nah'
                            // Skip the entire nah block
                            parseBlock(); // This advances past the nah block without executing it
                        }
                    } else {
                        console.log("🔴 Condition false, checking for nah block");
                        // Only execute nah block if condition is false
                        if (current() && current().type === 'KEYWORD' && current().value === 'nah') {
                            console.log("🟡 Executing nah (FALSE) branch");
                            advance(); // skip 'nah'
                            const falseBlock = parseBlock();
                            executeBlock(falseBlock);
                        }
                    }
                    
                    console.log("✅ Conditional processing complete");
                }
            }
            
            else {
                advance();
            }
            
        } catch (error) {
            console.error("❌ Parser error:", error);
            advance();
        }
    }
    
    console.log("\n🏆 EXECUTION COMPLETE!");
    console.log("📊 Final variables:", variables);
    console.log("📝 Final output:", output);
    
    return output.join('\n');
}
