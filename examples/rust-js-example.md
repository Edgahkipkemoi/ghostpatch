# Example: Rust + JavaScript Stitching

## Rust Code (Performance-Critical Logic)

```rust
pub fn calculate_prime(n: u32) -> bool {
    if n <= 1 {
        return false;
    }
    for i in 2..=(n as f64).sqrt() as u32 {
        if n % i == 0 {
            return false;
        }
    }
    true
}

pub fn find_primes(limit: u32) -> Vec<u32> {
    (2..=limit).filter(|&n| calculate_prime(n)).collect()
}
```

## JavaScript Code (Application Logic)

```javascript
function displayPrimes(primes) {
  console.log(`Found ${primes.length} prime numbers`);
  return primes;
}

async function main() {
  const limit = 1000;
  const primes = await findPrimes(limit);
  displayPrimes(primes);
}

main();
```

## Expected Stitch Result

GhostPatch will create:
1. WASM compilation setup for Rust
2. JavaScript wrapper to load WASM module
3. Type conversions between Rust and JS
4. Build configuration (Cargo.toml + package.json)
