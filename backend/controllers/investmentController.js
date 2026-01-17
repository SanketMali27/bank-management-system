import Investment from "../models/Investment.js";

/**
 * @desc    Get all investment options
 * @route   GET /api/investments
 * @access  Public (for now)
 */
export const getInvestments = async (req, res) => {
    try {
        const investments = await Investment.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: investments.length,
            investments,
        });
    } catch (error) {
        console.error("Investment fetch error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch investments",
        });
    }
};
