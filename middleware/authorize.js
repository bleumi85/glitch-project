const jwt = require("jsonwebtoken");
const { Account } = require("../models");

require("dotenv").config();
const secret = process.env.APP_SECRET;

module.exports = authorize;

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User')
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === "string") {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        async (req, res, next) => {
            try {
                const token = req.header("Authorization").replace("Bearer ", "");
                const decoded = jwt.verify(token, secret, { algorithms: ["HS256"] });
                req.user = decoded;
                next();
            } catch (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
        },

        // authorize based on user role
        async (req, res, next) => {
            const account = await Account.findByPk(req.user.id);

            if (!account || (roles.length && !roles.includes(account.role))) {
                // account no longer exists or role not authorized
                return res.status(401).json({ message: "Unauthorized" });
            }

            // authentication and authorization successful
            req.user.role = account.role;
            const refreshTokens = await account.getRefreshTokens();
            req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token);
            next();
        }
    ]
}