import express from "express";
import cors from "cors";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import session from "express-session";

const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "aryse_user",
    database: "aryse",
    password: "patwa426"
});

// middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: "aryse_secret", // This is a secret password your server uses to sign and lock the session cookie. It keeps hackers from tampering with the session data. 
    resave: false, // • This tells the server not to save the session back to the storage database if nothing inside the session changed during the request. It saves computer memory and speed.
    saveUninitialized: true, // • This tells the server not to create a blank session for new visitors until they actually log in or store data. It helps save server space and follows privacy rules.
    cookie: {
        // Date.now gives milliseconds
        maxAge: Date.now() + 7 * 24 * 60 * 60 * 1000,
        expires: ,
        httpOnly: true // to prevent CROSS scripting attacks
    }
}))


// signup route
app.post("/api/signup", async (req, res) => {
    
    const {username, email, password} = req.body;

    // 400 client send bad req
    // ! -> checks if its falsy + || 1 needs to be true 
    // "" are falsy so true is returned and code is executed.
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required."
        })
    }

    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO users (username, email, password)
                    VALUES (?, ?, ?);`;

        connection.query(sql, [username, email, hashedPassword], (error, result) => {

            if (error) {
                console.error("Signup Query Error: " + error);

                if (error.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({
                    message: "Username or email already exists."
                });
                }

                return res.status(500).json({
                    message: "Failed to create account."
                });
                
            }

            res.status(201).json({
                message: "Account created successfully."
            })
        })
        
    } catch (e) {

        console.error("Signup error: " + e);

        // The server hit an unexpected problem
        res.status(500).json({
            message: "Something went wrong."
        })
        
        
    }
    
});


// login 
// go absolute step by step

app.post("/api/login", async (req, res) => {

    const { email, password } = req.body;

    // 1. validate input
    if (!email || !password) {
        // 400 -> data sent is invalid
        return res.status(400).json({
            message: "All fields are required."
        })
    }

    // 2. find user query
    const sql = `SELECT email, password FROM users 
                WHERE email = ?;`;
    
    connection.query(sql, [email], async (error, result) => {


        // 3.  db error 
        if (error) {

            console.log("Login query error: " + error);
            return res.status(500).json({
                message: "Internal Server Error."
            });
        }

        // 4. user (email) not found
        if (result.length === 0) {
            return res.status(401).json({
                message: "Invalid Email or Password."
            })
        }

        // compare password
        const passwordMatch = await bcrypt.compare(password, result[0].password);

        // wrong password
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid Email or Password."
            })
        }

        req.session.user = {
            email: email
        }


        
        // sccessful
        return res.status(200).json({
                message: "Login Successful."
            })
});

});

// session working or not?
// bhudu ye backend hai (8080/api/session)
// o/p - Session {
//   cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true },
//   user: { email: 'prashantpatwa426@gmail.com' }
// }
app.get("/api/session", (req, res) => {
    console.log(req.session);

    res.status(200).json({
        session: req.session
    })
})

// checking login
app.get("/api/profile", (req, res) => {

    if(!req.session.user) {
        return res.status(401).json({
            message: "You aren't login."
        })
    }

    res.status(200).json({
        message: "Logged In",
        user: req.session.user
    })

});

// making logout
app.post("/api/logout", (req, res) => {

    req.session.destroy((error) => {

        if (error) {

            console.log("Logout error: " + error);

            return res.status(500).json({
                message: "Could not log out."
            })
        }

        res.status(200).json({
            message: "Logout Successful."
        })
    })
})

app.listen(8080, () => {
    console.log("server is running.")
});

// CREATE USER 'aryse_user'@'localhost' IDENTIFIED BY 'patwa426';

// | Type            |    Code | Meaning                              | Use in Aryse                        |
// | --------------- | ------: | ------------------------------------ | ----------------------------------- |
// | 🟢 Success      | **200** | Request succeeded                    | Login successful                    |
// | 🟢 Success      | **201** | New resource created                 | Signup successful                   |
// | 🟡 Client Error | **400** | Bad/invalid request data             | Missing email/password              |
// | 🟡 Client Error | **401** | Authentication failed                | Wrong/nonexistent login credentials |
// | 🟡 Client Error | **409** | Request conflicts with existing data | Duplicate username/email            |
// | 🔴 Server Error | **500** | Something went wrong on the server   | Database/server failure             |

// 4xx = client/request problem
// 5xx = server problem


// Why is cookie there if we never created req.cookie?
// express-session automatically creates req.session.cookie when it creates a session; you don't manually create it.
// What are these?
// _expires: null → cookie has no fixed expiration date.
// originalMaxAge: null → session doesn't have a configured maximum age.
// httpOnly: true → JavaScript running in the browser can't directly access the cookie, which helps protect the session ID.
// Why does the browser show JSON on that black screen?
// Because our /api/session route explicitly sends res.json(...); the browser is simply displaying the server's JSON response. It's an API endpoint, not a webpage.