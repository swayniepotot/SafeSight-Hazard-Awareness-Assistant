# SafeSight Hazard Awareness Assistant

SafeSight is an AI-powered hazard monitoring application designed to help individuals with **Congenital Insensitivity to Pain (CIP)** stay safe in their environment. Using real-time webcam analysis and AI detection, SafeSight alerts users to environmental and behavioral hazards that might otherwise go unnoticed.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Real-time hazard detection**: Monitors for thermal, sharp, pressure, repetitive, self-harm, and fall-risk hazards.
- **Behavioral analysis**: Detects risky actions like excessive force, repetitive scratching, or contact with hot surfaces.
- **Audio alerts**: Immediate text-to-speech notifications for detected hazards.
- **Dashboard and logs**: View current hazards and history of detected events.
- **Responsive UI**: Works on both desktop and mobile devices.

---

## Technologies

- **Frontend**: React, TypeScript, Tailwind CSS
- **Routing**: React Router
- **AI Integration**: Google Gemini AI API
- **Build Tools**: Vite
- **Deployment**: Vercel

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/SafeSight-Hazard-Awareness-Assistant.git
cd SafeSight-Hazard-Awareness-Assistant
```

2. Install dependencies:

npm install


Create a .env file in the root directory and add your API key:

VITE_GEMINI_API_KEY=your_api_key_here

Usage

Start the development server:

npm run dev


Open your browser at http://localhost:3000. The app supports mobile and desktop views.

Navigate between pages:

Home: Introduction and problem/solution overview

App: Real-time hazard monitoring dashboard

Contact: Send feedback or inquiries

To create a production build:

npm run build


Deploy to Replit or another hosting provider.

Project Structure
.
├── components/       # React components (CameraFeed, ControlPanel, SafetyLog, etc.)
├── pages/            # Page components (App.tsx, Home.tsx, Contact.tsx, MainApp.tsx)
├── services/         # AI service integrations (geminiService.ts)
├── src/              # Main source folder
├── assets/           # Images, logos, static assets
├── index.html        # Entry HTML
├── index.tsx         # React entry point
├── vite.config.ts    # Vite configuration
├── tsconfig.json     # TypeScript configuration
├── .env              # Environment variables
├── package.json
└── README.md


Contributing

Fork the repository.

Create a new branch: git checkout -b feature/YourFeature.

Make your changes.

Commit your changes: git commit -m "Add YourFeature".

Push to the branch: git push origin feature/YourFeature.

Open a Pull Request.

License

MIT License © 2025 SafeSight
