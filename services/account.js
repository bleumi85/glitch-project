const env = process.env.NODE_ENV || 'development';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const { Op } = require('sequelize');
const Role = require("../helpers/role");

require("dotenv").config();
const secret = process.env.APP_SECRET;

const { Account, RefreshToken } = require("../models");

module.exports = {
    authenticate,
    register,
    getAll,
}

async function authenticate({ email, password, ipAddress }) {
    const account = await Account.scope("withHash").findOne({ where: { email } });

    if (
        !account ||
        !account.isVerified ||
        !(await bcrypt.compare(password, account.passwordHash))
    ) {
        throw "Email or password is incorrect";
    }

    // authentication successful so generate jwt and refresh tokens
    const jwtToken = generateJwtToken(account);
    const refreshToken = generateRefreshToken(account, ipAddress);

    // save refresh token
    await refreshToken.save();

    // return basic details and tokens
    return {
        ...basicDetails(account),
        jwtToken,
        refreshToken: refreshToken.token,
    };
}

async function register(params, origin) {
    // validate
    if (await Account.findOne({ where: { email: params.email } })) {
        return await sendAlreadyRegisteredEmail(params.email, origin);
    }

    const account = new Account(params);

    account.role = Role.Visitor;
    account.verificationToken = randomTokenString();
    account.created = new Date();

    // hash password
    account.passwordHash = await hash(params.password)

    // save account
    await account.save();

    // send email
    await sendVerificationEmail(account, origin);
}

async function getAll() {
    const accounts = await Account.findAll();
    return accounts.map(account => basicDetails(account));
}

// helper functions

async function hash(password) {
    return await bcrypt.hash(password, 10);
}

function generateJwtToken(account) {
    // create a jwt token containing the account id that expires in 15 minutes
    return jwt.sign(
        {
            sub: account.id,
            id: account.id,
            name: `${account.firstName} ${account.lastName}`,
            admin: account.role === Role.Admin,
        },
        secret,
        {
            expiresIn: "15m",
        }
    );
}

function generateRefreshToken(account, ipAddress) {
    // create a refresh token that expires in 7 days
    return new RefreshToken({
        accountId: account.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdByIp: ipAddress
    })
}

function randomTokenString() {
    return crypto.randomBytes(40).toString("hex");
}

function basicDetails(account) {
    const { id, firstName, lastName, email, role, created, updated, isVerified } =
        account;
    return { id, firstName, lastName, email, role, created, updated, isVerified };
}

async function sendVerificationEmail(account, origin) {
    if (env !== 'production') {
        console.log(`Stage=${env}. No E-Mail will be sent!`);
        return;
    }
}

async function sendAlreadyRegisteredEmail(email, origin) {
    if (env !== 'production') {
        console.log(`Stage=${env}. No E-Mail will be sent!`);
        return;
    }
}