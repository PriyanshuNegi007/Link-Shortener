import express from "express";
import router from "./routes/shortner.routes.js";
import { env } from "./config/env.js";
import { dbClient } from "./config/db-client.js";

const PORT = env.PORT;

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.set("view engine", "ejs");

try {
    await dbClient.connect();
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`);
    });
} catch (err) {
    console.error("Failed to start application:", err);
    process.exit(1);
}
