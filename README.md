# GDC Zoology Department Website

The official website for the Department of Zoology at Government Degree College (Autonomous), Siddipet. Built with Next.js (App Router), Prisma, Neon (Serverless Postgres), NextAuth v5, and Cloudinary.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Database:** PostgreSQL (Neon Serverless)
- **ORM:** Prisma
- **Authentication:** NextAuth v5 (Auth.js)
- **Media Storage:** Cloudinary
- **Styling:** Tailwind CSS

## Getting Started

### 1. Prerequisites
- Node.js 18+
- npm or yarn
- A PostgreSQL database (Neon recommended)
- A Cloudinary account

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Variables
Copy the example environment file and fill in your details:
```bash
cp .env.example .env
```

**Required Variables:**
- `DATABASE_URL`: Neon pooled connection string (used by Prisma Client).
- `DIRECT_DATABASE_URL`: Direct TCP connection string (used by Prisma migrations).
- `AUTH_SECRET`: Generate using `openssl rand -base64 32`.
- `AUTH_URL`: Typically `http://localhost:3000` in development.
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: From your Cloudinary dashboard.

### 4. Database Setup
Push the schema to your database:
```bash
npx prisma db push
```

### 5. Seeding the Admin User
You can seed your first super admin user directly via Prisma Studio:
1. Run `npx prisma studio`
2. Open `http://localhost:5555`
3. Navigate to the **User** model and add a new row:
   - `email`: Your email
   - `name`: Your name
   - `role`: `SUPER_ADMIN`
   - `password`: A secure bcrypt hash of your chosen password. (You can generate one using an online bcrypt generator or a local node script, e.g., `node -e "console.log(require('bcryptjs').hashSync('yourpassword', 10))"`).

### 6. Development Server
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com).
1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. Add all the environment variables from your `.env` file into the Vercel project settings.
4. Vercel will automatically build and deploy your Next.js application.

## Folder Structure
- `/src/app`: Next.js App Router (Public pages & API routes).
- `/src/app/admin`: Protected admin dashboard (Requires Authentication).
- `/src/components`: Reusable UI components (Events, Faculty, Layout).
- `/src/lib`: Utility functions, Prisma singleton, and Auth config.
- `/src/types`: TypeScript definitions.
- `/prisma`: Prisma schema definition.
- `/public`: Static assets.
