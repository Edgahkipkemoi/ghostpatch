# Simple Python example for testing
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

def process_numbers(numbers):
    results = []
    for num in numbers:
        results.append(factorial(num))
    return results

if __name__ == "__main__":
    print("Testing factorial:")
    print(factorial(5))
    print(process_numbers([3, 4, 5]))
