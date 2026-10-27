const aiService = require("../services/ai.service")

module.exports.getReview = async (req, res) => {
    const code = req.body.code;

    if (!code || !code.trim()) {
        return res.status(400).send("Code is required");
    }

    try {
        const response = await aiService(code);
        res.send(response);
    } catch (error) {
        console.error("Review failed:", error.message);
        res.status(500).send("Failed to generate review. Please try again.");
    }
}
