# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern portfolio website built with Astro and Tailwind CSS, featuring GitHub Sponsors integration and dark/light mode support. The site is optimized for performance with server-side rendering and static generation.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes TypeScript checking)
- `npm run preview` - Preview production build
- `npm run astro` - Run Astro CLI commands

## Environment Setup

Create a `.env` file with:
```
GITHUB_TOKEN=your_github_token_here
```

The GitHub token is used server-side to fetch sponsors data via GraphQL API. The token should have `read:user` scope (and `read:org` for organization sponsors).

## Architecture

### Core Structure
- **Astro Framework**: Static site generation with component-based architecture
- **TypeScript**: Strict type checking enabled via `tsconfig.json`
- **Tailwind CSS**: Utility-first styling with dark mode support via class strategy
- **Server-side Rendering**: GitHub Sponsors data fetched at build time for security and performance

### Key Components
- `src/layouts/Layout.astro` - Main layout with theme persistence and system preference detection
- `src/pages/index.astro` - Homepage with tabbed content (Projects, Experience, Tools)
- `src/components/GitHubSponsors.astro` - Server-side component fetching sponsors via GitHub GraphQL API
- `src/components/ThemeToggle.astro` - Dark/light mode toggle
- `src/components/Header.astro` - Navigation header

### Build Configuration
- `astro.config.mjs` - Static output mode with Tailwind integration
- `tailwind.config.mjs` - Dark mode enabled via class strategy
- `tsconfig.json` - Strict TypeScript with path aliases (`@/*` maps to `./src/*`)

### Data Flow
1. GitHub Sponsors data fetched at build time using GraphQL API
2. Theme preference stored in localStorage with system preference fallback
3. Tab navigation handled via client-side JavaScript
4. All styling handled via Tailwind CSS classes

### Security Considerations
- GitHub token accessed server-side only (never exposed to client)
- Environment variables prefixed without `PUBLIC_` to keep them server-side
- Static site generation reduces client-side JavaScript surface area

### Customization Points
- Update GitHub username in `src/components/GitHubSponsors.astro:20`
- Modify personal info in `src/pages/index.astro`
- Add projects/experience in respective sections
- Customize color scheme via Tailwind classes