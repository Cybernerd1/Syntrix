import dedent from "dedent";

export default {
  SUGGSTIONS: ['Create ToDo App in React', 'Create Budget Track App', 'Create Gym Managment Portal Dashboard', 'Create Quizz App On History', 'Create Login Signup Screen'],
  HERO_HEADING: 'What do you want to build?',
  HERO_DESC: 'Prompt, run, edit, and deploy full-stack web apps.',
  INPUT_PLACEHOLDER: 'What you want to build?',
  SIGNIN_HEADING: 'Continue With SyntriX',
  SIGNIN_SUBHEADING: 'To use Syntrix you must log into an existing account or create one.',
  SIGNIn_AGREEMENT_TEXT: 'By using Syntrix, you agree to the collection of usage data for analytics.',


DEFAULT_FILE: {
'/App.css': {
  code: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}`
},
  '/index.js': {
    code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`
  },
  '/public/index.html': {
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>App</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
  }
},
  // DEPENDANCY: {

  //   "postcss": "^8",
  //   "tailwindcss": "^3.4.1",
  //   autoprefixer: "^10.0.0",
  //   "tailwind-merge": "^2.4.0",
  //   "tailwindcss-animate": "^1.0.7",
  //   "lucide-react": "^0.469.0",
  //   "react-router-dom": "^7.1.1",
  //   "firebase": "^11.1.0",
  //   "@google/generative-ai": "^0.21.0",
  //   "date-fns": "^4.1.0",
  //   "react-chartjs-2": "^5.3.0",
  //   "chart.js": "^4.4.7",
  // },
  DEPENDANCY: {
    "lucide-react": "^0.469.0",
    "react-router-dom": "6.22.3",
    "date-fns": "^4.1.0",
    "chart.js": "^4.4.7",
    "react-chartjs-2": "^5.3.0"
  },
  PRICING_DESC: 'Start with a free account to speed up your workflow on public projects or boost your entire team with instantly-opening production environments.',
  PRICING_OPTIONS: [
    {
      name: 'Basic',
      tokens: '50K',
      value: 50000,
      desc: 'Ideal for hobbyists and casual users for light, exploratory use.',
      price: 4.99
    },
    {
      name: 'Starter',
      tokens: '120K',
      value: 120000,
      desc: 'Designed for professionals who need to use Syntrix a few times per week.',
      price: 9.99
    },
    {
      name: 'Pro',
      tokens: '2.5M',
      value: 2500000,
      desc: 'Designed for professionals who need to use Syntrix a few times per week.',
      price: 19.99
    },
    {
      name: 'Unlimted (License)',
      tokens: 'Unmited',
      value: 999999999,
      desc: 'Designed for professionals who need to use Syntrix a few times per week.',
      price: 49.99
    }
  ]


}