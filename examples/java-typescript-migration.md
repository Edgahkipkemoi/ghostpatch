# Real-World Example: Legacy Java to Modern TypeScript

## Scenario
Migrating a legacy Java backend API to modern TypeScript while maintaining compatibility.

## Java Code (Legacy Backend)
```java
public class UserService {
    public User getUserById(int id) {
        // Database logic
        return new User(id, "John Doe", "john@example.com");
    }
    
    public boolean validateUser(String email) {
        return email.contains("@") && email.contains(".");
    }
    
    public List<User> getAllUsers() {
        // Return all users
        return userRepository.findAll();
    }
}
```

## TypeScript Code (Modern Frontend)
```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

async function fetchUser(id: number): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
}

function displayUser(user: User): void {
    console.log(`User: ${user.name} (${user.email})`);
}
```

## GhostPatch Output
- **Bridge Type**: HTTP REST API
- **Generated Files**:
  - `UserService.java` (original)
  - `user.service.ts` (TypeScript wrapper)
  - `api-bridge.ts` (HTTP client)
  - `types.ts` (shared interfaces)

## Business Value
- **Time Saved**: 2-3 weeks of manual migration
- **Risk Reduced**: Automated type conversion
- **Compatibility**: Both systems work during transition
