import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
    // 1. Headers se token nikalna
    const token = req.headers.authorization;

    // 2. Check karna ki token available hai ya nahi
    if (!token) {
        return res.status(401).json({ message: "unauthorized" });
    }

    try {
        // 3. Token ko verify karna (Secret key ka use karke)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Decoded token se User ID nikal kar request object mein dalna
        // Yahi woh line hai jiske baare mein humne pehle baat ki thi
        req.userId = decoded.id;

        // 5. Agle function (Controller) par bhejna
        next();
    } catch (error) {
        // Agar token galat ya expired ho
        res.status(401).json({ message: "unauthorized" });
    }
};

export default protect;