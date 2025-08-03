function tokenizeBro(code) {
  // Normalize line endings and trim extra whitespace
  code = code.replace(/\r\n/g, '\n').trim();
  
  // First, strip out all comments to avoid tokenizing them
  code = code.replace(/\/\/.*(?:\n|$)/g, '\n');
  
  const tokens = [];
  const tokenTypes = [
    { type: 'KEYWORD', pattern: /^(lock|say|wloop|yappin|no cap|nah|bring it back)/ },
    { type: 'OPEN_BRACE', pattern: /^{/ },
    { type: 'CLOSE_BRACE', pattern: /^}/ },
    { type: 'OPEN_PAREN', pattern: /^\(/ },
    { type: 'CLOSE_PAREN', pattern: /^\)/ },
    { type: 'STRING', pattern: /^"([^"]*)"/ },
    { type: 'NUMBER', pattern: /^[0-9]+(\.[0-9]+)?/ },
    { type: 'OPERATOR', pattern: /^(\+|\-|\*|\/|==|!=|<=|>=|<|>|=)/ },
    { type: 'COMPARISON', pattern: /^(to)/ },
    { type: 'IDENTIFIER', pattern: /^[a-zA-Z_][a-zA-Z0-9_]*/ },
    { type: 'WHITESPACE', pattern: /^[\s\t\n\r]+/ },
    { type: 'SEMICOLON', pattern: /^;/ }
  ];

  let position = 0;
  let line = 1;
  let column = 1;

  while (position < code.length) {
    let matched = false;

    for (const tokenType of tokenTypes) {
      const match = code.slice(position).match(tokenType.pattern);
      
      if (match) {
        const value = match[0];
        
        // Skip whitespace
        if (tokenType.type !== 'WHITESPACE') {
          tokens.push({
            type: tokenType.type,
            value,
            line,
            column
          });
        }
        
        // Count newlines in the matched text
        const newlines = (value.match(/\n/g) || []).length;
        if (newlines > 0) {
          line += newlines;
          const lastNewlineIndex = value.lastIndexOf('\n');
          column = value.length - lastNewlineIndex;
        } else {
          column += value.length;
        }
        
        position += value.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      throw new Error(`Unexpected character: ${code[position]} at line ${line}, column ${column}`);
    }
  }

  return tokens;
}
  