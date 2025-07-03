##  Getting Started:
This section outlines the requirements and steps to set up and run the Sports Leagues App locally, as well as how to build and deploy it.
You can view the deployed project live at: https://vitalybesk.github.io/sporty/
## Requirements:

`Node.js (LTS version recommended, 20.x)
`

`npm (Node Package Manager).
`
## Installation:

1. Clone the repository
2. Install dependencies:

`npm install`

This command will install all necessary project dependencies listed in package.json. 
3. Running the Project Locally:

`npm run dev
`

The application will typically open in your browser.

4. Building for Production:

`npm run build
`

This command compiles the TypeScript code and bundles the application into the dist/ directory.

5. Deployment (to GitHub Pages):
To deploy the application to GitHub Pages:

`npm run deploy
`

This script first runs `npm run build` and then pushes the dist folder content to the `gh-pages` branch.

## Design Decisions:

1. Responsive UI: `Tailwind CSS` was chosen for its utility-first approach, allowing for rapid development of responsive layouts.
2. Clear State Management: `React Context API` was implemented for global state management related to leagues, search terms, selected sports, loading states, and errors. 
3. Caching for Performance: A `Map` was integrated into the `LeagueContext` to cache API responses. This prevents redundant network requests and reducing API calls. 
4. Modular Component Structure: The application is broken down into small, reusable components (e.g., SearchBar, Dropdown, LeagueCard, SeasonBadgeModal). 
5. JavaScript/TypeScript: The project uses modern `React` and `TypeScript` for type safety. 
6. Deployment Strategy: `GitHub Pages` was selected for simple site hosting. 
7. Code Quality: `ESLint` and `Prettier` are configured for code style and identify potential issues.

## AI Tools Used:

1. Rapid Styling and Markup Structure: `Gemini` was utilized to quickly generate a markup and apply styles using `Tailwind CSS` classes. This significantly accelerated the initial UI development process.
2. Content Generation and Description: `Gemini` assisted in generating descriptive content including explanations at `README.md`, component descriptions. 
3. Partial AI Assistance in IDE: AI capabilities were partially leveraged within the `PHP Storm IDE` to aid in various development tasks.