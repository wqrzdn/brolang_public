// BroLang Example Script

// Variable declarations
lock name = "BroLang"
lock version = 1.0
lock isActive = 1

// Output with string concatenation
say "Welcome to " + name + " v" + version

// Basic math
lock x = 10
lock y = 5
lock sum = x + y
lock diff = x - y
lock product = x * y
lock quotient = x / y

say "Math Operations:"
say "Sum: " + sum
say "Difference: " + diff
say "Product: " + product
say "Quotient: " + quotient

// Conditional statements
no cap (isActive == 1) {
  say "BroLang is active!"
} nah {
  say "BroLang is not active!"
}

// While loop
lock counter = 3
say "Countdown:"
wloop (counter > 0) {
  say counter
  counter = counter - 1
}
say "Blast off!"

// For loop
say "For loop from 1 to 3:"
yappin (1 to 3) {
  say "Iteration " + i
}

// Nested blocks with proper scoping
lock scope_test = "global"
say "Before block: " + scope_test

no cap (1 == 1) {
  lock scope_test = "local"
  say "Inside block: " + scope_test
  
  no cap (2 == 2) {
    lock deeply_nested = "very local"
    say "Deeply nested: " + deeply_nested
  }
}

say "After block: " + scope_test

// Return statement
say "Final statement:"
bring it back "BroLang execution complete!"
