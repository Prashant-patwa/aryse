
import "dotenv/config";
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import session from "express-session";

const app = express();
const PORT = process.env.PORT || 8080;
const isProduction = process.env.NODE_ENV === "production";

// Trust the hosting platform's reverse proxy in production.
if (isProduction) {
    app.set("trust proxy", 1);
}

// ---------------- DATABASE ----------------

const connection = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "aryse_user",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "aryse",
    waitForConnections: true,
    connectionLimit: 10
});

// ---------------- MIDDLEWARE ----------------

const allowedOrigins = [
    "http://localhost:5173",
    "https://crowdfunding-seven-green.vercel.app"
];

app.use(cors({
    origin(origin, callback) {
        // Allow requests without an Origin header, such as local tools.
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Origin not allowed by CORS."));
    },
    credentials: true
}));

app.use(express.json({ limit: "1mb" }));

app.use(session({
    name: "connect.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}));

// ---------------- SIGNUP ----------------

app.post("/api/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (
        typeof username !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        !username.trim() ||
        !email.trim() ||
        !password ||
        password.length > 72
    ) {
        return res.status(400).json({
            message: "Valid username, email and password are required."
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.execute(
            `INSERT INTO users (username, email, password)
             VALUES (?, ?, ?)`,
            [username.trim(), email.trim().toLowerCase(), hashedPassword]
        );

        return res.status(201).json({
            message: "Account created successfully."
        });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Username or email already exists."
            });
        }

        console.error("Signup error:", error);

        return res.status(500).json({
            message: "Failed to create account."
        });
    }
});

// ---------------- LOGIN ----------------

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    if (
        typeof email !== "string" ||
        typeof password !== "string" ||
        !email.trim() ||
        !password
    ) {
        return res.status(400).json({
            message: "Email and password are required."
        });
    }

    try {
        const [users] = await connection.execute(
            `SELECT id, username, email, password
             FROM users
             WHERE email = ?`,
            [email.trim().toLowerCase()]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const user = users[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        req.session.regenerate((error) => {
            if (error) {
                console.error("Session regeneration error:", error);

                return res.status(500).json({
                    message: "Could not start your session."
                });
            }

            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email
            };

            req.session.save((saveError) => {
                if (saveError) {
                    console.error("Session save error:", saveError);

                    return res.status(500).json({
                        message: "Could not save your session."
                    });
                }

                return res.status(200).json({
                    message: "Login successful.",
                    user: req.session.user
                });
            });
        });
    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Internal server error."
        });
    }
});

// ---------------- CHECK SESSION ----------------

app.get("/api/session", (req, res) => {
    return res.status(200).json({
        loggedIn: Boolean(req.session.user),
        user: req.session.user || null
    });
});

// ---------------- CHECK PROFILE ----------------

app.get("/api/profile", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            message: "You are not logged in."
        });
    }

    return res.status(200).json({
        message: "Logged in.",
        user: req.session.user
    });
});

// ---------------- LOGOUT ----------------

app.post("/api/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("Logout error:", error);

            return res.status(500).json({
                message: "Could not log out."
            });
        }

        res.clearCookie("connect.sid", {
            path: "/",
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        });

        return res.status(200).json({
            message: "Logout successful."
        });
    });
});

// ---------------- CREATE PROJECT ----------------

app.post("/api/projects", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            message: "Please sign in to create a project."
        });
    }

    const {
        title,
        short_description,
        category,
        city,
        state,
        banner_image,
        start_date,
        duration_months,
        goal_amount,
        funding_description,
        story_title,
        story_content,
        story_image,
        reward_title,
        reward_description,
        reward_image,
        creator_url
    } = req.body;

    const requiredFields = {
        title,
        short_description,
        category,
        city,
        state,
        start_date,
        duration_months,
        goal_amount,
        funding_description,
        story_title,
        story_content
    };

    for (const [field, value] of Object.entries(requiredFields)) {
        if (
            value === undefined ||
            value === null ||
            (typeof value === "string" && !value.trim())
        ) {
            return res.status(400).json({
                message: `${field} is required.`
            });
        }
    }

    const textFields = [
        title,
        short_description,
        category,
        city,
        state,
        funding_description,
        story_title,
        story_content
    ];

    const duration = Number(duration_months);
    const goal = Number(goal_amount);

    if (
        textFields.some(value => typeof value !== "string") ||
        !Number.isSafeInteger(duration) ||
        duration < 1 ||
        !Number.isFinite(goal) ||
        goal <= 0 ||
        !/^\d{4}-\d{2}-\d{2}$/.test(start_date) ||
        (banner_image != null && typeof banner_image !== "string") ||
        (story_image != null && typeof story_image !== "string") ||
        (reward_title != null && typeof reward_title !== "string") ||
        (reward_description != null && typeof reward_description !== "string") ||
        (reward_image != null && typeof reward_image !== "string") ||
        (creator_url != null && typeof creator_url !== "string")
    ) {
        return res.status(400).json({
            message: "Some project fields have invalid values."
        });
    }

    const hasReward = Boolean(
        reward_title?.trim() ||
        reward_description?.trim() ||
        reward_image?.trim()
    );

    if (
        hasReward &&
        (!reward_title?.trim() || !reward_description?.trim())
    ) {
        return res.status(400).json({
            message: "A reward needs both a title and description."
        });
    }

    const userId = req.session.user.id;
    const creatorName = req.session.user.username;
    const creatorEmail = req.session.user.email;

    try {
        const [result] = await connection.execute(
            `INSERT INTO projects (
                user_id,
                title, short_description, category, city, state,
                banner_image, start_date, duration_months,
                goal_amount, funding_description,
                story_title, story_content, story_image,
                reward_title, reward_description, reward_image,
                creator_name, creator_email, creator_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                title.trim(),
                short_description.trim(),
                category.trim(),
                city.trim(),
                state.trim(),
                banner_image?.trim() || "",
                start_date,
                duration,
                goal,
                funding_description.trim(),
                story_title.trim(),
                story_content.trim(),
                story_image?.trim() || null,
                reward_title?.trim() || null,
                reward_description?.trim() || null,
                reward_image?.trim() || null,
                creatorName,
                creatorEmail,
                creator_url?.trim() || null
            ]
        );

        return res.status(201).json({
            message: "Project created successfully.",
            projectId: result.insertId
        });
    } catch (error) {
        console.error("Create project error:", error);

        return res.status(500).json({
            message: "Failed to create project."
        });
    }
});

// ---------------- EXPLORE PROJECTS ----------------

app.get("/api/projects", async (req, res) => {
    try {
        const [projects] = await connection.execute(
            `SELECT id, title, short_description, category,
                    city, state, banner_image, goal_amount,
                    creator_name, created_at
             FROM projects
             ORDER BY created_at DESC`
        );

        return res.status(200).json({ projects });
    } catch (error) {
        console.error("Fetch projects error:", error);

        return res.status(500).json({
            message: "Failed to fetch projects."
        });
    }
});

// ---------------- PROJECT DETAILS ----------------

app.get("/api/projects/:id", async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id < 1) {
        return res.status(400).json({
            message: "Invalid project ID."
        });
    }

    try {
        const [projects] = await connection.execute(
            "SELECT * FROM projects WHERE id = ?",
            [id]
        );

        if (projects.length === 0) {
            return res.status(404).json({
                message: "Project not found."
            });
        }

        return res.status(200).json({
            project: projects[0]
        });
    } catch (error) {
        console.error("Project details error:", error);

        return res.status(500).json({
            message: "Failed to fetch project."
        });
    }
});

// ---------------- DEMO CONTRIBUTION ----------------

app.post("/api/projects/:id/demo-payment", async (req, res) => {
    const projectId = Number(req.params.id);
    const amount = Number(req.body.amount);

    if (
        !Number.isSafeInteger(projectId) ||
        projectId <= 0 ||
        !Number.isFinite(amount) ||
        amount <= 0 ||
        Math.round(amount * 100) !== amount * 100
    ) {
        return res.status(400).json({
            message: "Enter a valid project ID and amount."
        });
    }

    let db;

    try {
        db = await connection.getConnection();
        await db.beginTransaction();

        const [projects] = await db.execute(
            "SELECT id FROM projects WHERE id = ? FOR UPDATE",
            [projectId]
        );

        if (projects.length === 0) {
            await db.rollback();

            return res.status(404).json({
                message: "Project not found."
            });
        }

        // This is a simulated contribution, not a real payment.
        await db.execute(
            `INSERT INTO contributions
                (project_id, amount, payment_status)
             VALUES (?, ?, 'success')`,
            [projectId, amount.toFixed(2)]
        );

        await db.execute(
            `UPDATE projects
             SET raised_amount = raised_amount + ?
             WHERE id = ?`,
            [amount.toFixed(2), projectId]
        );

        const [updatedProjects] = await db.execute(
            "SELECT raised_amount FROM projects WHERE id = ?",
            [projectId]
        );

        await db.commit();

        return res.status(201).json({
            message: "Demo contribution successful.",
            projectId,
            amount,
            raisedAmount: Number(updatedProjects[0].raised_amount),
            demo: true
        });
    } catch (error) {
        if (db) {
            await db.rollback().catch(() => {});
        }

        console.error("Demo payment error:", error);

        return res.status(500).json({
            message: "Unable to process the demo contribution."
        });
    } finally {
        if (db) db.release();
    }
});

// ---------------- START SERVER ----------------

async function startServer() {
    if (!process.env.SESSION_SECRET || !process.env.DB_PASSWORD) {
        throw new Error(
            "Set SESSION_SECRET and DB_PASSWORD environment variables."
        );
    }

    await connection.query("SELECT 1");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}.`);
    });
}

startServer().catch((error) => {
    console.error("Server startup failed:", error);
    process.exit(1);
});
