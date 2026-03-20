#!/bin/bash

# Nexus Operations - Development Setup Script
# This script configures the development environment

set -e

echo "🚀 Nexus Operations - Setup Script"
echo "=================================="
echo ""

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20 or later."
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Check pnpm
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm@9
fi

echo "✅ pnpm $(pnpm --version) detected"
echo ""

# Install dependencies
echo "📥 Installing dependencies..."
pnpm install
echo "✅ Dependencies installed"
echo ""

# Build
echo "🏗️  Building project..."
pnpm build
echo "✅ Build complete"
echo ""

echo "🎉 Setup complete!"
echo ""
echo "To start development:"
echo "  pnpm dev"
echo ""
echo "Demo Credentials:"
echo "  Homeowner: john@example.com / password"
echo "  Contractor: contractor@example.com / password"
echo ""
