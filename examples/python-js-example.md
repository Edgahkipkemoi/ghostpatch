# Example: Python + JavaScript Stitching

## Python Code (Data Processing)

```python
def calculate_fibonacci(n):
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

def process_data(numbers):
    results = []
    for num in numbers:
        results.append(calculate_fibonacci(num))
    return results

if __name__ == "__main__":
    import sys
    import json
    numbers = json.loads(sys.argv[1])
    result = process_data(numbers)
    print(json.dumps(result))
```

## JavaScript Code (API & UI)

```javascript
async function fetchAndProcess(numbers) {
  const response = await fetch('/api/process', {
    method: 'POST',
    body: JSON.stringify({ numbers })
  });
  return response.json();
}

function displayResults(results) {
  console.log('Fibonacci Results:', results);
  return results;
}

// Main execution
const testNumbers = [5, 10, 15];
fetchAndProcess(testNumbers).then(displayResults);
```

## Expected Stitch Result

GhostPatch will create a bridge that:
1. Calls Python script from JavaScript using child_process
2. Passes data via JSON
3. Returns results back to JavaScript
4. Creates a unified project structure
