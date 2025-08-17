import express from "express";
import { CONFIG } from "./config";

const app = express();

// Integrating modules



app.listen(CONFIG.PORT, () => {
    console.log(`Server active on http://localhost:${CONFIG.PORT}`)
});