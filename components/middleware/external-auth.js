module.exports = function (req, res, next) {
    const apiKey = req.headers["x-api-key"];
    const clientId = req.headers["x-client-id"];

    // তোমার আসল secret
    const VALID_API_KEY = "1234567890"; 
    const VALID_CLIENT_ID = "myapp";

    if (!apiKey || !clientId) {
        return res.status(401).json({
            success: false,
            message: "Missing required headers"
        });
    }

    if (apiKey !== VALID_API_KEY || clientId !== VALID_CLIENT_ID) {
        return res.status(503);
        /*json({
            success: false,
            message: "Invalid authentication headers"
        });*/
    }

    // সব ঠিক থাকলে → API চলবে
    next();
};
