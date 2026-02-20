# Next.js Starter

An opinionated starter template for building full-stack Next.js apps.

## Stack

- **[Next.js 16](https://nextjs.org/)**
- **[React 19](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind 4](https://tailwindcss.com/)**
- **[Shadcn + Base UI](https://base-ui.com/)**
- **[TanStack Query](https://tanstack.com/query)**
- **[Drizzle ORM](https://orm.drizzle.team/) + [Neon](https://neon.tech/)**
- **[Lucide React](https://lucide.dev/)**
- **[ESLint + Prettier](https://prettier.io/)**

## Features

- **Dark mode** - system-aware theme switching
- **Linting and formatting on save** - including import sorting and Tailwind class sorting
- **Pre-commit hooks** - run formatting and linting checks on staged files

## Development

### 1. `.env` setup

Create a `.env` file with the following values:

```
DATABASE_URL=neon_connection_string
```

### 2. Database setup

Create a Neon project and add the database connection string to your `.env`.

### 3. Project setup

Install dependencies and run dev server:

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```
