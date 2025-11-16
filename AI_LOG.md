# AI Usage Log

## Overview

This project was developed with AI assistance (Claude/Cursor), but the focus was primarily on **architectural decisions and system design** rather than just generating code. AI was used as a collaborative partner to validate design choices, discuss trade-offs, and accelerate implementation.

## Development Approach

### 1. Architecture-First Mindset

Rather than asking AI to "build the app," I focused on:
- Designing proper folder structure (`components/commits`, `components/states`, `components/icons`, `lib/hooks`)
- Separating concerns: services, actions, hooks, and UI components
- Discussing naming conventions (e.g., renaming `feedback` → `states`)
- Avoiding index files for clearer imports

**AI Role:** Validation of architectural decisions, suggesting best practices for Next.js 15 and React 19.

### 2. Technology Stack Decisions

Made conscious choices about:
- **React Query (TanStack Query)** for client-side state management
- **Server Actions** for data mutations and cache invalidation
- **date-fns** for timestamp formatting with auto-refresh
- **pnpm** as package manager

**AI Role:** Helped with configuration and setup after technology choices were made.

### 3. Component Design

Focused on creating reusable, single-responsibility components:
- Split monolithic components into smaller pieces
- Separated icon components into individual files
- Created dedicated state components (Loading, Error, Empty)
- Implemented proper TypeScript typing throughout

**AI Role:** Code generation for repetitive tasks, suggesting component API design patterns.

### 4. Git History Strategy

Created a clean, logical commit history by:
- Resetting git history and rebuilding from scratch
- Making 10 incremental commits showing progression
- Organizing commits by feature/layer (types → services → hooks → UI → app)

**AI Role:** Executing git commands and file operations systematically.

## Where AI Helped

✅ **Rapid prototyping** of component structures
✅ **Code generation** for repetitive patterns (icons, types)
✅ **Configuration** of React Query and Next.js setup
✅ **Documentation** generation (README structure)
✅ **Validation** of architectural decisions

## Where AI Didn't Help (and Why)

❌ **Technology selection** - Decision to use React Query was mine, based on project requirements for auto-updating timestamps, efficient caching, and real-time data management. AI only helped with configuration after the decision was made.
❌ **Architectural decisions** - These required human judgment about scalability, maintainability, and trade-offs
❌ **Naming conventions** - Had to manually decide on folder/component names that make sense
❌ **Project structure** - AI suggested standard patterns, but custom structure required iteration and discussion
❌ **Design choices** - Decisions like "should we use index files?" or "where should actions live?" needed human input

## Key Takeaways

1. **AI as a Partner, Not a Replacement**: Used AI to accelerate implementation of well-defined architectural decisions, not to make those decisions for me.

2. **Focus on System Design**: Spent more time thinking about structure, scalability, and maintainability than writing code.

3. **Iterative Refinement**: When AI generated code, I reviewed and refined it to match project conventions and requirements.

4. **Clear Communication**: The more specific and architectural the questions, the better AI assistance. Vague prompts lead to generic solutions.

## Tools Used

- **Cursor AI (Claude)**: Primary development assistant
- **AI capabilities utilized**:
  - Code generation for boilerplate
  - File operations and refactoring
  - Git operations automation
  - Documentation writing
  - Architectural discussion and validation

## Time Distribution

- **~40%** - Architecture and design decisions
- **~30%** - Implementation with AI assistance
- **~20%** - Git history creation and organization
- **~10%** - Documentation and polish

The result is a well-structured, scalable application with clean commit history that demonstrates incremental development and thoughtful system design.

