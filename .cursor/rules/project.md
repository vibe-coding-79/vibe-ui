# React + Vite + TypeScript Project Setup Guide (Best Practices 2025)

This document provides a detailed guide for setting up a modern React project using **Vite** and **TypeScript**. It adheres to **Clean Architecture** principles and **Best Practices** for folder structure and **Clean Code**, ensuring scalability and maintainability for large-scale applications [1] [2].

## 1. Project Initialization

We will use Vite, a fast and modern build tool, to initialize the project with the React + TypeScript template.

```bash
# Initialize the project
pnpm create vite my-project-name --template react-ts

# Navigate into the project directory
cd my-project-name

# Install dependencies
pnpm install
```

## 2. Folder Structure

We will adopt a **Feature-based** folder structure combined with common/shared directories [3]. This approach isolates the logic of each feature, reduces coupling, and enhances maintainability.

### 2.1. Overview Structure

```
src/
├── assets/             # Images, fonts, icons, etc.
├── components/         # Reusable, presentational UI components (Button, Input, Card, etc.)
├── features/           # Logic and UI grouped by feature (Feature-based)
│   ├── Auth/           # Example: Login/Registration feature
│   │   ├── components/ # Feature-specific components
│   │   ├── hooks/      # Feature-specific custom hooks
│   │   ├── services/   # Feature-specific business logic/API calls
│   │   └── types/      # Feature-specific TypeScript types
│   ├── UserProfile/    # Example: User Profile feature
│   └── ...
├── hooks/              # Custom hooks shared across the entire application
├── layouts/            # Main application layouts (Header, Sidebar, Footer)
├── lib/                # External libraries/wrappers (e.g., configured axios instance, firebase init)
├── pages/              # Top-level components representing application routes
├── services/           # Shared business logic/API handling functions
├── store/              # Global state management (e.g., Zustand, Redux)
├── types/              # Shared TypeScript types/interfaces definitions
├── utils/              # Shared utility/helper functions
├── constants/          # Application constants (API endpoints, messages, etc.)
└── App.tsx             # Root component
```

### 2.2. Detailed Explanation

| Directory | Purpose | Principle |
| :--- | :--- | :--- |
| `features/` | Contains all code related to a specific feature. **Each subdirectory is an independent feature.** | High **Cohesion**, Low **Coupling**. Easy to remove or move features. |
| `components/` | Contains **Atomic UI Components** with no business logic, reusable anywhere. | **Single Responsibility Principle (SRP)**. Focuses only on UI. |
| `pages/` | Contains components directly mapped to application **routes**. They primarily handle routing logic and compose other components/layouts. | **Separation of Concerns**. Separates routing from core logic. |
| `hooks/` | Contains **Custom Hooks** shared across the application, not tied to a single feature. | **DRY (Don't Repeat Yourself)**. Reuses stateful logic. |
| `types/` | Defines global **Interfaces** and **Types**. | **Strict Typing**. Ensures data type safety. |

## 3. Tooling and Configuration Setup

To enforce **Clean Code** and a consistent code style, setting up ESLint, Prettier, and Path Aliases is essential.

### 3.1. Path Aliases

Using Path Aliases (e.g., `@/`) helps avoid long and hard-to-read relative paths (`../../../components`) [4].

**Update `tsconfig.json`:**

```json
{
  "compilerOptions": {
    // ... other options
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/features/*": ["src/features/*"],
      // Add other aliases as needed
    }
  }
}
```

**Update `vite.config.ts` (using `path` for resolution):**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### 3.2. ESLint and Prettier

**ESLint** helps find errors and enforces **Clean Code** rules. **Prettier** automatically formats the code.

1.  **Installation:**
    ```bash
    pnpm install -D eslint prettier eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier
    ```

2.  **Configure `.eslintrc.cjs`** (example):
    ```javascript
    module.exports = {
      root: true,
      env: { browser: true, es2020: true },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended', // Always keep this last
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      plugins: ['react-refresh', 'prettier'],
      rules: {
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
        // Add other Clean Code rules here
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'prettier/prettier': 'error',
      },
    };
    ```

## 4. Clean Code and TypeScript Principles

To maintain code quality, the project should adhere to the following principles:

### 4.1. Design Principles

*   **Single Responsibility Principle (SRP)**: Every component, hook, or module should have **only one reason to change**. Example: Separate data fetching logic from the UI component.
*   **DRY (Don't Repeat Yourself)**: Reuse code through **Custom Hooks** (for stateful logic) and **Components** (for UI).
*   **KISS (Keep It Simple, Stupid)**: Code must be as simple and understandable as possible. Avoid overly complex solutions.
*   **Composition over Inheritance**: Prioritize using **composition** (combining small components) over inheritance for code reuse.

### 4.2. Effective TypeScript Usage

*   **Strict Typing**: Always declare explicit types for props, state, and variables. **Strictly avoid using `any`** [5].
*   **Interface vs Type**: Use `interface` for object shapes and `type` for more complex data types (union, intersection, etc.).
*   **Props Typing**: Define component props clearly and in detail.

```typescript
// Example of Props Typing
interface ButtonProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', isLoading = false }) => {
  // ... implementation
};
```

---

## References

[1] React 19 Clean Architecture Guide (2025): Best Practices, Folder Structure, and Scalable Patterns for Modern Apps - *Medium*
[2] React Folder Structure in 5 Steps [2025] - *Robin Wieruch*
[3] React Project Folder Structure That Actually Scales (2025) - *JavaScript in Plain English*
[4] How to Build a Professional React Project Structure in 2025 - *Netguru*
[5] TypeScript + React: Best Practices for Clean, Maintainable Code - *Dev.co*