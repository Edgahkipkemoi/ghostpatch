# Project Structure Standards

## Directory Layout

All generated hybrid projects must follow this structure:

```
/project-name/
├── /src/
│   ├── /[language1]/     # Original code from language 1
│   ├── /[language2]/     # Original code from language 2
│   └── /bridges/         # Generated glue code
├── /build/               # Compiled artifacts
├── /tests/               # Generated tests
├── README.md             # Auto-generated documentation
├── package.json          # If JS/TS involved
├── Cargo.toml            # If Rust involved
├── requirements.txt      # If Python involved
├── go.mod                # If Go involved
└── Makefile              # Build instructions
```

## README Template

Every stitched project must include:

1. **Title**: "[Project Name] - Stitched by GhostPatch"
2. **Languages**: List of languages combined
3. **Bridge Type**: How languages are connected
4. **Architecture**: Diagram or description
5. **Build Instructions**: Step-by-step
6. **Run Instructions**: How to execute
7. **How It Works**: Explanation of the stitching
8. **Original Sources**: Attribution

## Build Files

Generate appropriate build configuration for each language:

- **JavaScript/TypeScript**: package.json, tsconfig.json
- **Python**: requirements.txt, setup.py
- **Rust**: Cargo.toml
- **Go**: go.mod

## Glue Code Location

All bridge/glue code goes in `/bridges/` directory with clear naming:

- `python_to_rust_ffi.py`
- `js_to_python_bridge.js`
- `go_wasm_exports.go`
