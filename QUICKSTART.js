#!/usr/bin/env node

/**
 * Nexus Operations - Quick Start Guide
 * 
 * This file provides a step-by-step guide to get the project running.
 */

const steps = [
  {
    step: 1,
    title: "Prerequisites",
    instructions: [
      "Node.js 20 or later",
      "pnpm 9 or later",
      "Git",
      "Code editor (VS Code recommended)"
    ]
  },
  {
    step: 2,
    title: "Clone Repository",
    command: "git clone https://github.com/bngomez98/Nexus-Operations-2.git",
    description: "Clone the repository from GitHub"
  },
  {
    step: 3,
    title: "Install Dependencies",
    command: "pnpm install",
    description: "Install all required npm packages"
  },
  {
    step: 4,
    title: "Start Development Server",
    command: "pnpm dev",
    description: "Start the development server with hot reload"
  },
  {
    step: 5,
    title: "Open Application",
    command: "Open http://localhost:3000",
    description: "Navigate to the application in your browser"
  },
  {
    step: 6,
    title: "Test Features",
    instructions: [
      "Try homeowner signup: john@example.com / password",
      "Try contractor signup: contractor@example.com / password",
      "Create a project from homeowner dashboard",
      "View and claim projects from contractor dashboard"
    ]
  }
];

const demoAccounts = {
  homeowner: {
    email: "john@example.com",
    password: "password"
  },
  contractor: {
    email: "contractor@example.com",
    password: "password"
  }
};

const projectStructure = {
  "app/": "Next.js App Router pages and API routes",
  "lib/": "Business logic and utilities",
  "components/": "Reusable React components",
  "middleware.ts": "Security headers and routing",
  "globals.css": "Design tokens and global styles",
  "tailwind.config.ts": "Tailwind CSS configuration",
  "tsconfig.json": "TypeScript configuration"
};

const commands = {
  dev: "pnpm dev - Start development server",
  build: "pnpm build - Build for production",
  start: "pnpm start - Start production server",
  lint: "pnpm lint - Run ESLint",
  test: "pnpm test - Run tests"
};

console.log(`
╔══════════════════════════════════════════════════════════════════╗
║         NEXUS OPERATIONS - QUICK START GUIDE v2.0               ║
║        A marketplace for homeowners & contractors                ║
╚══════════════════════════════════════════════════════════════════╝

📋 STEPS TO GET STARTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

steps.forEach(({ step, title, instructions, command, description }) => {
  console.log(`\n${step}. ${title}`);
  if (instructions) {
    instructions.forEach(instr => console.log(`   • ${instr}`));
  }
  if (command) {
    console.log(`\n   $ ${command}`);
  }
  if (description) {
    console.log(`   → ${description}`);
  }
});

console.log(`

🔑 DEMO ACCOUNTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Homeowner:
  Email:    ${demoAccounts.homeowner.email}
  Password: ${demoAccounts.homeowner.password}

Contractor:
  Email:    ${demoAccounts.contractor.email}
  Password: ${demoAccounts.contractor.password}

🗂️  PROJECT STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

Object.entries(projectStructure).forEach(([path, desc]) => {
  console.log(`  ${path.padEnd(20)} ${desc}`);
});

console.log(`

⚡ USEFUL COMMANDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

Object.values(commands).forEach(cmd => {
  console.log(`  ${cmd}`);
});

console.log(`

📚 DOCUMENTATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • README.md - Complete project overview
  • DEVELOPMENT.md - Development guidelines
  • DEPLOYMENT.md - Deployment instructions
  • RELEASE_NOTES.md - What's new in v2.0

🚀 DEPLOYMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Built for Vercel. One-click deployment available:
  1. Push to GitHub
  2. Import project in Vercel
  3. Deploy automatically

💡 TIPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✓ Use TypeScript for type safety
  ✓ Utilize the @/ import alias
  ✓ Check Design Mode in v0 for styling
  ✓ Test on mobile and tablet
  ✓ Use browser DevTools for debugging

📞 SUPPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Issues: GitHub Issues
  Email:  support@nexusops.com
  Docs:   https://nexusops.com/docs

═══════════════════════════════════════════════════════════════════════

Happy coding! 🎉
Ready to build something amazing?

Next command: pnpm dev

═══════════════════════════════════════════════════════════════════════
`);
