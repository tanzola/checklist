import express from 'express';
import cors from 'cors';
import users from "./api/users.route.js";
import cookieSession from 'cookie-session';
import passport from 'passport';
import passportSetup from './passport.js';
import authRoute from './routes/auth.js';

const app = express();
app.use(express.json());

app.use(cookieSession({ name: "session", keys: ["key"] }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}));

app.use("/auth", authRoute);
app.use("/users", users);

app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
