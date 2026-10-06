// ============================================================
// ELVIS CLAIN NYAGA - PORTFOLIO
// File: server/server.js
// Purpose: Main Express server
// ============================================================

const express = require("express");
const path = require("path");

require("dotenv").config();

const {
    pool,
    testDatabaseConnection
} = require("./db");

const app = express();

const PORT = process.env.PORT || 3000;


// ============================================================
// MIDDLEWARE
// ============================================================

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(
    path.join(__dirname, "../public")
));


// ============================================================
// API STATUS
// ============================================================

app.get("/api/status", (req, res) => {

    res.json({
        success: true,
        message: "Elvis Portfolio API is running."
    });

});


// ============================================================
// PROFILE API
// ============================================================

app.get("/api/profile", async (req, res) => {

    try {

        const [rows] = await pool.query(
            "SELECT * FROM profile ORDER BY id ASC LIMIT 1"
        );

        if (rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Profile not found."
            });

        }

        res.json({
            success: true,
            profile: rows[0]
        });

    } catch (error) {

        console.error(
            "Error retrieving profile:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to retrieve profile."
        });

    }

});


// ============================================================
// PROJECTS API
// ============================================================

app.get("/api/projects", async (req, res) => {

    try {

        const [rows] = await pool.query(
            `
            SELECT
                id,
                title,
                slug,
                description,
                problem_statement,
                solution,
                technologies,
                features,
                image_url,
                github_url,
                live_url,
                featured,
                display_order,
                created_at,
                updated_at
            FROM projects
            ORDER BY display_order ASC, id ASC
            `
        );


        res.json({
            success: true,
            projects: rows
        });


    } catch (error) {

        console.error(
            "Error retrieving projects:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to retrieve projects."
        });

    }

});


// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, async () => {

    console.log(
        `Portfolio server running at http://localhost:${PORT}`
    );

    await testDatabaseConnection();

});