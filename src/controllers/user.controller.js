const userMethods = {};
require("dotenv").config();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function getUser(param) {
    try {
        return User.findOne(param);
    } catch (error) {
        return false;
    }
}

userMethods.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await getUser({ email });
    if (user) {
        const verifyPassword = await user.verifyPassword(password);
        if (!verifyPassword) {
            return res.status(400).json({
                status: false,
                message: "Email or password incorrect.",
            });
        }

        try {
            const token = jwt.sign(
                user._id.toString(),
                process.env.PRIVATE_KEY
            );

            return res.status(200).json({
                status: true,
                token,
                message: "Login correct.",
            });
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: "There was a problem, please try again.",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "Email or password incorrect.",
        });
    }
};

userMethods.register = async (req, res) => {
    const { username, email, password, name } = req.body;
    if (username && email && password) {
        const verifyUsername = await getUser({ username });
        if (verifyUsername) {
            return res.status(400).json({
                status: false,
                message: "The username has already taken",
            });
        }
        const verifyEmail = await getUser({ email });
        if (verifyEmail) {
            return res.status(400).json({
                status: false,
                message: "The email has already taken",
            });
        }

        const user = new User({
            username,
            email,
            password,
            name,
        });
        user.password = await user.encryptPassword(user.password);

        if (await user.save()) {
            return res.status(200).json({
                status: true,
                message: "User created successfull.",
            });
        } else {
            return res.status(400).json({
                status: false,
                message: "There was a problem, please try again.",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "Fill all requered fields",
        });
    }
};

userMethods.authenticate = (req, res) => {
    try {
        const token = req.headers["authorization"];
        if (token) {
            const verify = jwt.verify(token, process.env.PRIVATE_KEY);
            if (verify) {
                return res.status(200).json({
                    status: true,
                    message: "The token is correct.",
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: "The token is incorrect.",
                });
            }
        } else {
            return res.status(400).json({
                status: false,
                message: "The token is required.",
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: "The token is invalid.",
        });
    }
};

module.exports = userMethods;
