import User from '../models/User.js';

const adminMiddleware = async (req, res, next) => {
    try {
        // req.userId is set by authMiddleware
        const user = await User.findById(req.userId);

        if (user && user.isAdmin) {
            req.user = user; // Attach full user object to request
            next();
        } else {
            res.status(403).json({ message: 'Not authorized as admin' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error checking admin status' });
    }
};

export default adminMiddleware;
