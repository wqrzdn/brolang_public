// 🔥 BROLANG INTERPRETER - GENIUS EDITION 🔥
// Simple, direct, and bulletproof!

function parseBro(tokens) {
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
            
            switch (op) {
                case '>': left = leftVal > rightVal; break;
                case '<': left = leftVal < rightVal; break;
                case '>=': left = leftVal >= rightVal; break;
                case '<=': left = leftVal <= rightVal; break;
                case '==': left = left == right; break;
                case '!=': left = left != right; break;
            }
            
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
        
        // Save current state
        const savedTokens = tokens;
        const savedPosition = position;
        
        // Set up for condition evaluation
        tokens = conditionTokens;
        position = 0;
        
        try {
            const result = parseExpression();
            
            // Restore state
            tokens = savedTokens;
            position = savedPosition;
            
            return Boolean(result);
        } catch (error) {
            // Restore state
            tokens = savedTokens;
            position = savedPosition;
            return false;
        }
    }
    
    // === BLOCK EXECUTION - DIRECT APPROACH ===
    function executeBlock(blockTokens) {
        
        // Save current state  
        const savedTokens = tokens;
        const savedPosition = position;
        
        // Set up block execution
        tokens = blockTokens;
        position = 0;
        
        // Execute statements directly using main parser logic
        while (current()) {
            const token = current();
            
            try {
                // Variable assignment
                if (token.type === 'IDENTIFIER' && peek() && peek().type === 'OPERATOR' && peek().value === '=') {
                    const varName = token.value;
                    advance(); // skip var
                    advance(); // skip =
                    const value = parseExpression();
                    variables[varName] = value;
                }
                
                // Say statement
                else if (token.type === 'KEYWORD' && token.value === 'say') {
                    advance(); // skip 'say'
                    const result = parseExpression();
                    const outputStr = String(result);
                    output.push(outputStr);
                }
                
                // Conditionals inside blocks
                else if (token.type === 'KEYWORD' && token.value === 'no cap') {
                    advance();
                    
                    if (current() && current().type === 'OPEN_PAREN') {
                        advance();
                        const condition = parseExpression();
                        
                        if (current() && current().type === 'CLOSE_PAREN') {
                            advance();
                        }
                        
                        const trueBlock = parseBlock();
                        
                        // Execute appropriate branch
                        if (condition) {
                            executeBlock(trueBlock);
                            
                            // Skip nah block if condition was true
                            if (current() && current().type === 'KEYWORD' && current().value === 'nah') {
                                advance(); // skip 'nah'
                                parseBlock(); // Skip without executing
                            }
                        } else {
                            // Only execute nah block if condition is false
                            if (current() && current().type === 'KEYWORD' && current().value === 'nah') {
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
                advance();
            }
        }
        
        // Restore state
        tokens = savedTokens;
        position = savedPosition;
        
    }
    
    // === MAIN EXECUTION LOOP ===
    while (current()) {
        const token = current();
        
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
            }
            
            // Say statement: say expression
            else if (token.type === 'KEYWORD' && token.value === 'say') {
                advance();
                const result = parseExpression();
                const outputStr = String(result);
                output.push(outputStr);
            }
            
            // WHILE LOOP - GENIUS SIMPLE APPROACH
            else if (token.type === 'KEYWORD' && token.value === 'wloop') {
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
                    
                    
                    // Parse loop body
                    const blockTokens = parseBlock();
                    
                    // EXECUTE WHILE LOOP - GENIUS DIRECT APPROACH
                    let iterations = 0;
                    while (iterations < 1000) {
                        
                        // Evaluate condition with current variables
                        const conditionResult = evaluateCondition(conditionTokens);
                        
                        if (!conditionResult) {
                            break;
                        }
                        
                        // Execute loop body
                        executeBlock(blockTokens);
                        
                        iterations++;
                    }
                    
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
                advance();
                
                if (current() && current().type === 'OPEN_PAREN') {
                    advance();
                    const condition = parseExpression();
                    
                    if (current() && current().type === 'CLOSE_PAREN') {
                        advance();
                    }
                    
                    const trueBlock = parseBlock();
                    
                    // Execute appropriate branch and handle nah properly
                    if (condition) {
                        executeBlock(trueBlock);
                        
                        // CRITICAL: Skip the nah block if condition was true
                        if (current() && current().type === 'KEYWORD' && current().value === 'nah') {
                            advance(); // skip 'nah'
                            // Skip the entire nah block
                            parseBlock(); // This advances past the nah block without executing it
                        }
                    } else {
                        // Only execute nah block if condition is false
                        if (current() && current().type === 'KEYWORD' && current().value === 'nah') {
                            advance(); // skip 'nah'
                            const falseBlock = parseBlock();
                            executeBlock(falseBlock);
                        }
                    }
                    
                }
            }
            
            else {
                advance();
            }
            
        } catch (error) {
            advance();
        }
    }
    
    
    return output.join('\n');
}
