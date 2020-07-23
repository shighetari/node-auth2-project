module.exports = department => {
    return function (req, res, next) {
        // if (department === req.jwt.department) {
            next();
        // } else {
        //     res.status(403).json({ you: "have no power here" });
        // }
    };
};
