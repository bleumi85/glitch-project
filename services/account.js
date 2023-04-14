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
    register
}

async function register(params, origin) {
    // validate
    if (await Account.findOne({ where: { email: params.email } })) {
        return await sendAlreadyRegisteredEmail(params.email, origin);
    }

    const account = new Account(params);

    account.role = Role.Visitor;
    account.verificationToken = randomStringToken();
    account.created = new Date();

    // hash password
    account.passwordHash = await hash(params.password)
    
    // save account
    await account.save();

    // send email
    await sendVerificationEmail(account, origin);
}

// helper functions

async function hash(password) {
    return await bcrypt.hash(password, 10);
}

function randomStringToken() {
    return crypto.randomBytes(40).toString("hex");
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