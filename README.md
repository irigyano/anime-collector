# Anime Collector

## Features

- **Browse** Anime works based on released year and season
- **Search** works in Japanese
- **Watchlist** management according watching status
- **Responsive Design** that support all devices from mobile up to 4K monitors
- **OAuth** with Google / GitHub stategy
- **Dark Mode Support**

## Tech Stack

- **[Next.js](https://nextjs.org/)**: Using App Directory, React Server Components, API Routes Handler.
- **[Tailwind CSS](https://tailwindcss.com)**: Styling, RWD, and dark mode toggle.
- **[GraphQL](https://graphql.org/)**: Query data from **[Annict.com](https://developers.annict.com/)** with desired data format.
- **[MongoDB](https://www.mongodb.com/)**, **[Prisma](https://www.prisma.io/)**: Storing user data in **Documents** format, and ORM makes interacting with database like a breeze.
- **[NextAuth.js](https://next-auth.js.org)**: OAuth sign in with GitHub/Google strategy.
- **[TanStack Query v5](https://tanstack.com/query/latest/docs/framework/react/overview)**: Manage application states on client side.

## Running Locally

Create a `.env` file following `.env.example`

```bash
pnpm install
pnpm prisma generate
pnpm prisma db push
pnpm run dev
```
