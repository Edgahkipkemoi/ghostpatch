# Code Transformation Standards

## Output Format

All code transformation operations must follow this structure:

```json
{
  "input": {
    "blocks": [
      {
        "language": "string",
        "code": "string",
        "name": "string"
      }
    ]
  },
  "analysis": {
    "ast": {},
    "functions": [],
    "types": [],
    "compatibility": {}
  },
  "output": {
    "stitched_code": {},
    "glue_code": [],
    "bridge_type": "string",
    "readme": "string"
  }
}
```

## Bridge Types

- **FFI**: For Python ↔ Rust
- **IPC**: For JavaScript ↔ Python
- **WASM**: For Go ↔ JavaScript
- **Native**: For same-language stitching

## Error Handling

All errors must be spooky-themed:

- "⚡ The lightning strike failed! Could not parse [language] code"
- "🧟 The dead code refuses to rise! Syntax error at line [X]"
- "🔩 The stitches won't hold! Type mismatch between [type1] and [type2]"
- "⚰️ This code is beyond resurrection! [error details]"

## Naming Conventions

- Use `ghost_` prefix for generated bridge functions
- Use `stitch_` prefix for glue code
- Use `revive_` prefix for wrapper functions
- Use `bolt_` prefix for WASM exports
