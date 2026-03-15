# Next.js Starter

An opinionated starter template for building full-stack Next.js apps.

## Stack

- **[Next.js 16](https://nextjs.org/)**
- **[React 19](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind 4](https://tailwindcss.com/)**
- **[Shadcn + Base UI](https://base-ui.com/)**
- **[Zod](https://zod.dev/)**
- **[TanStack Query](https://tanstack.com/query)**
- **[TanStack Form](https://tanstack.com/form)**
- **[Drizzle ORM](https://orm.drizzle.team/) + [Neon](https://neon.tech/)**
- **[Better Auth](https://www.better-auth.com/)**
- **[Resend](https://resend.com/)**
- **[Lucide React](https://lucide.dev/)**
- **[ESLint + Prettier](https://prettier.io/)**

## Features

- **Authentication** - email/password sign-up and sign-in
- **Email flows** - forgot password and email verification
- **Account management** - update display name and password from a profile page
- **Protected routes** - authenticated route group
- **Dark mode** - system-aware theme switching
- **Linting and formatting on save** - including import sorting and Tailwind class sorting
- **Pre-commit hooks** - run formatting and linting checks on staged files

**NOTE**: For a basic starter project without authentication, check out to the `basic` branch.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment

Create a `.env` file with the following values:

| Variable             | Description                                                               |
| -------------------- | ------------------------------------------------------------------------- |
| `DATABASE_URL`       | Create a [Neon](https://neon.tech) project and copy the connection string |
| `BETTER_AUTH_SECRET` | Secret for auth (generate with `openssl rand -base64 32`)                 |
| `BETTER_AUTH_URL`    | App URL (`http://localhost:3000` in development)                          |
| `RESEND_API_KEY`     | Create a [Resend](https://resend.com) API key and copy the string         |

```
DATABASE_URL=neon_connection_string
BETTER_AUTH_SECRET=auth_secret
BETTER_AUTH_URL=http://localhost:3000
RESEND_API_KEY=api_key
```

### 3. Push database schema

```bash
npm run db:push
```

### 4. Run the dev server

```bash
npm run dev
```

## Deployment

The project is optimized for [Vercel](https://vercel.com). Push to a connected repo and Vercel will pick up the build automatically. Make sure to add all environment variables from the `.env` table above to your Vercel project settings.
