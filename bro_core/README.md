# BroLang Language Documentation

BroLang is a fun, slang-style scripting language built for educational purposes.

## Language Features

### Keywords

- `lock` - Declare and initialize a variable
  ```
  lock myVar = 10
  ```

- `say` - Print output to the console
  ```
  say "Hello, world!"
  say "Value: " + myVar
  ```

- `wloop` - While loop
  ```
  wloop (condition) {
    // code block
  }
  ```

- `yappin` - For loop (inclusive range)
  ```
  yappin (1 to 5) {
    // code block with variable i
  }
  ```

- `no cap` - If statement
  ```
  no cap (condition) {
    // code executed if condition is true
  } nah {
    // code executed if condition is false
  }
  ```

- `nah` - Else statement (used with `no cap`)

- `bring it back` - Return statement
  ```
  bring it back value
  ```

### Operators

BroLang supports standard mathematical and comparison operators:
- Addition: `+`
- Subtraction: `-`
- Multiplication: `*`
- Division: `/`
- Equality: `==`
- Inequality: `!=`
- Greater than: `>`
- Less than: `<`
- Greater than or equal: `>=`
- Less than or equal: `<=`

### Data Types

- Numbers (integers and decimals)
- Strings (enclosed in double quotes)
- Variables (no explicit type declaration)

### Blocks and Scoping

BroLang uses curly braces `{ }` to define code blocks. Variables have block-level scoping, meaning variables declared inside a block are not accessible outside of it.

## Implementation

BroLang is implemented as a JavaScript interpreter with the following components:

1. **Tokenizer**: Breaks the source code into meaningful tokens (keywords, identifiers, literals, etc.)
2. **Parser**: Processes tokens and executes the program according to the BroLang language rules

## Examples

```
// Variable declaration
lock age = 21
lock name = "Bro"

// Output
say "What's good, " + name + "?"

// Loops
wloop (age > 0) {
  say "Age: " + age
  age = age - 1
}

yappin (1 to 3) {
  say "Count: " + i
}

// Conditionals
lock score = 95
no cap (score > 90) {
  say "Top G"
} nah {
  say "L + Ratio"
}
