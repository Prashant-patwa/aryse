# Aryse — Student Ideas. Real-World Impact.

## About the Project

**Aryse** is a free, student-focused community support platform designed to help Indian college students turn their ideas into real-world projects that benefit society.

Students can share their projects, explain their goals, and receive support from the community. Projects may include websites, mobile apps, startup ideas, products, college events, blood donation drives, environmental programs, and other social initiatives.

Aryse aims to connect students with people who can support their ideas through financial assistance, skills, mentorship, materials, and useful connections.

## Features

- **Create Projects:** Students can publish projects with descriptions, categories, locations, funding goals, and project stories.
- **Explore Projects:** Users can browse, search, and filter projects.
- **Project Details:** View project information, creator details, funding goals, progress, and rewards.
- **Community Support:** Demonstrate how people can support projects through different forms of assistance.
- **User Authentication:** Sign-up and login functionality.
- **Rewards:** Projects can offer a simple reward, such as recognition or a thank-you message.
- **Free Platform:** The MVP is designed without commissions, premium memberships, or paid promotions.

> **Note:** Aryse is a college project prototype. Financial contributions are simulated, and the application does not process real payments. Sample projects and funding amounts are for demonstration purposes only.

## Tech Stack

### Frontend
- React.js
- JavaScript
- Tailwind CSS
- React Router
- React Icons
- Browser localStorage for project data

### Backend
- Node.js
- Express.js
- MySQL for database-related functionality, depending on the current configuration

## How It Works

1. A student creates a project using the project submission form.
2. The project is saved in the browser's localStorage.
3. The project appears on the Explore Projects page.
4. Users can click a project to view its details.
5. Visitors can explore the project's goals, progress, rewards, and simulated support options.

## Data Storage

The current MVP uses **localStorage** to store project data.

- Project data can remain available after refreshing the same browser.
- Data is stored separately in each browser and device.
- Projects created by one visitor do not automatically appear for other visitors.
- Clearing browser storage may remove saved projects.
- Real payments and financial transactions are not supported.

## Installation and Setup

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)
- A code editor, such as Visual Studio Code

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
cd <your-project-folder>
```

Replace the placeholders with your actual GitHub repository URL and project folder name.

### 2. Run the Frontend

Open a terminal in your frontend folder and run:

```bash
npm install
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173`.

### 3. Run the Backend

If your project uses the Express backend, open another terminal in the backend folder and run:

```bash
npm install
npm run dev
```

If the `dev` script is not configured, check the scripts in the backend's `package.json` and use the appropriate command.

Configure any required environment variables before starting the backend.

**Security:** Never upload database passwords, session secrets, or other private credentials to GitHub.

## Deployment

The application can be deployed using:

- **Frontend:** [Vercel](https://vercel.com/)
- **Backend:** [Render](https://render.com/)

Before deployment, update any local API URLs, configure CORS, and add the required environment variables.

Because project data is stored in localStorage, it is not shared across different users or devices.

## Future Improvements

- Shared project storage using a backend database
- Improved project validation and error handling
- Production-ready authentication and security
- Real payment integration, if appropriate and legally compliant
- Additional community support features

## Project Purpose

Aryse is developed as a **Community Engagement Project (CEP)** to encourage student innovation, collaboration, and social responsibility.

The goal is to help students move beyond ideas and take practical steps toward creating projects that can make a positive difference in their communities.

---

**Aryse — Student ideas. Real-world impact.**
