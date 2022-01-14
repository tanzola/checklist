import express from 'express';
import cors from 'cors';
import checklists from "./api/checklists.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/checklists", checklists);
app.use("*", (req, res) => res.status(404).json({ error:"not found" }));

export default app;