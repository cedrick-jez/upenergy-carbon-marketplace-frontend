#!/bin/bash

# UpEnergy Carbon Credit Platform - Demo Startup Script
echo "🚀 Starting UpEnergy Carbon Credit Platform Demo"
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Start Backend API
echo "🔧 Starting Backend API..."
cd carbon-forward-credit-api-main-2

# Install backend dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

# Start backend in background
echo "🚀 Starting backend server on http://localhost:3000"
npm start &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start Frontend
echo "🎨 Starting Frontend..."
cd ../market-place-frontend

# Install frontend dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Start frontend
echo "🚀 Starting frontend server on http://localhost:3001"
PORT=3001 npm start &
FRONTEND_PID=$!

echo ""
echo "🎉 Demo is starting up!"
echo "======================="
echo "📊 Backend API: http://localhost:3000"
echo "🎨 Frontend UI: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait
