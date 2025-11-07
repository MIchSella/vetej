# Vetej Task Manager

A simple but powerful command-line task management tool built with TypeScript.

## Features

- ✅ Add, list, complete, and delete tasks
- 🎨 Beautiful colored output
- 💾 Persistent storage using JSON
- 🚀 Fast and lightweight
- 📊 Task statistics and filtering

## Installation

```bash
npm install
npm run build
```

## Usage

```bash
# Add a new task
npm start -- add "Complete the project documentation"

# List all tasks
npm start -- list

# List only pending tasks
npm start -- list --pending

# Complete a task by ID
npm start -- complete 1

# Delete a task by ID
npm start -- delete 1

# Show statistics
npm start -- stats
```

## Development

```bash
# Run in development mode
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Format code
npm run format
```

## Project Structure

```
vetej/
├── src/
│   ├── index.ts          # CLI entry point
│   ├── task-manager.ts   # Core task management logic
│   ├── storage.ts        # Data persistence layer
│   └── types.ts          # TypeScript type definitions
├── tests/
│   └── task-manager.test.ts  # Unit tests
├── package.json
├── tsconfig.json
└── README.md
```

## Technologies

- **TypeScript** - Type-safe JavaScript
- **Commander.js** - CLI framework
- **Chalk** - Terminal styling
- **Vitest** - Fast unit testing

## License

MIT
