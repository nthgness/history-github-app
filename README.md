# Git Commit History Viewer

A web application that displays the Git commit history of the repository where the source code lives.

## 🚀 Tech Stack

- **Next.js 15** (App Router)
- **React 19** with TypeScript
- **Tailwind CSS 4**
- **TanStack Query (React Query)** for data fetching
- **Octokit** for GitHub API integration
- **date-fns** for timestamp formatting

## 📋 Installation and Setup

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env.local` file and add your GitHub token:
```env
GITHUB_TOKEN=your_personal_access_token
GITHUB_OWNER=your_username
GITHUB_REPO=your_repo_name
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 🔑 Getting a GitHub Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (for private repositories) or `public_repo` (for public repositories)
4. Copy the token and add it to `.env.local`

## 📦 Deploy to Vercel

1. Push your project to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel settings:
   - `GITHUB_TOKEN`
   - `GITHUB_OWNER`
   - `GITHUB_REPO`
4. Deploy will happen automatically

## ✨ Features

- ✅ Display list of commits from main/master branch
- ✅ Auto-updating timestamps without page reload
- ✅ Refresh button with Server Actions
- ✅ Loading states without flickering
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Error handling for GitHub API
- ✅ React Query for efficient data management

## 🛠️ Development

```bash
# Development
pnpm dev

# Build
pnpm build

# Production
pnpm start

# Lint
pnpm lint
```

## 🏗️ Project Structure

```
app/
├── actions.ts          # Server Actions
├── providers.tsx       # React Query provider
├── page.tsx            # Main page
├── layout.tsx          # Root layout
└── globals.css         # Global styles

components/
├── commits/            # Commit-related components
│   ├── CommitItem.tsx
│   ├── CommitList.tsx
│   ├── CommitsContainer.tsx
│   └── RefreshButton.tsx
├── states/             # UI state components
│   ├── EmptyState.tsx
│   ├── ErrorMessage.tsx
│   └── LoadingSkeleton.tsx
├── icons/              # SVG icon components
│   ├── AlertIcon.tsx
│   ├── ClipboardIcon.tsx
│   ├── DocumentIcon.tsx
│   └── RefreshIcon.tsx
└── layout/             # Layout components
    ├── Header.tsx
    └── Footer.tsx

lib/
├── constants.ts        # App constants
├── hooks/              # Custom React hooks
│   └── useCommitsQuery.ts
└── utils/              # Utility functions
    └── formatters.ts

services/               # Business logic
└── github.service.ts   # GitHub API client

types/                  # TypeScript types
├── api.ts
├── github.ts
├── repository.ts
└── index.ts
```

## 🔒 Security

- GitHub token is stored in environment variables
- Token is never exposed to the client
- All GitHub API calls happen on the server side
- Environment variables are not committed to the repository

## 📊 Commit History

This app displays its own commit history - dogfooding at its finest! Every commit made to this repository will be visible in the deployed application.
