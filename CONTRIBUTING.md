# Contributing to GhostPatch

## Development Setup

1. Install dependencies:
```bash
npm run install:all
```

2. Start development servers:
```bash
npm run dev
```

This will start:
- Backend API on http://localhost:3001
- Frontend UI on http://localhost:3000

## Project Structure

- `/.kiro/` - Kiro configuration (specs, hooks, steering, MCP)
- `/backend/` - Node.js API server
- `/frontend/` - Next.js UI application
- `/examples/` - Example code snippets for testing

## Testing the Application

1. Open http://localhost:3000
2. Add code blocks in different languages
3. Click "Analyze Code" to parse and extract functions
4. Click "Stitch Together" to generate hybrid code
5. View results in the output panel

## Adding New Language Support

1. Update `backend/services/analyzer.js` with new language patterns
2. Add parsing logic for the language
3. Update `backend/services/stitcher.js` with bridge generation
4. Test with example code

## Kiro Features Used

- **Specs**: Define requirements and design in `.kiro/specs/`
- **Hooks**: Automate workflows in `.kiro/hooks/`
- **Steering**: Enforce standards in `.kiro/steering/`
- **MCP**: Custom tools in `.kiro/mcp/`
