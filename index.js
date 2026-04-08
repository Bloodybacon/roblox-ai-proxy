const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

const GROQ_API_KEY = "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";

app.post("/chat", async (req, res) => {
    const { message } = req.body;
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama3-70b-8192",
                messages: [
                    { role: "system", content: "You are a helpful Roblox scripting assistant. When asked to make a script, always wrap the code in ```lua and ```." },
                    { role: "user", content: message }
                ]
            })
        });
        const data = await response.json();
        res.json({ reply: data.choices[0].message.content });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(3000, () => console.log("Server running!"));
