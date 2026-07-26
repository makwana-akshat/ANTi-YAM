# ANTi-YAM Project

Welcome to the ANTi-YAM project repository! This is a modern React/Vite application managed as a monorepo containing two distinct versions of the app.

## Project Structure

This project uses an `apps/` monorepo structure:

- **`apps/anti-yum`**: The **Normal version** of the application. It includes standard health tracking features and a "Premium" purchase page. 
- **`apps/superpower`**: The **Premium version** of the application. It features a bespoke, high-fidelity design system and advanced dashboards (unlocked when a user "subscribes").

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (comes with Node.js)

## Getting Started

1. **Install Dependencies**
   From the root of the project, run:
   ```bash
   npm install
   ```
   *(This will install dependencies for the root and both apps via npm workspaces)*

2. **Run the Normal App (`anti-yum`)**
   ```bash
   npm run dev -w apps/anti-yum
   ```
   This will start the development server for the standard version (usually on `http://localhost:5173` or `5174`).

3. **Run the Premium App (`superpower`)**
   ```bash
   npm run dev -w apps/superpower
   ```
   This is hardcoded to run on `http://localhost:3000`.

## Testing the "Checkout Flow"

To see how the two apps interact:
1. Start **both** dev servers.
2. Open the Normal app (`anti-yum`) in your browser.
3. Click "Upgrade Now" in the sidebar to go to the Premium page.
4. Click "Subscribe Now".
5. After a simulated payment process, you will automatically be redirected to `http://localhost:3000`, dropping you right into the glorious `superpower` premium experience!

## Tech Stack
- React
- Vite
- Tailwind CSS
- GSAP & Framer Motion (for animations)
- Recharts
- TypeScript
