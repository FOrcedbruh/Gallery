const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('./../config');

const generateAccessToken = (_id, username, email) => {
    const payload = {
        _id, username, email
    };

    return jwt.sign(payload, secret, {expiresIn: 86400});
}



class controller {
    async registration(req, res) {
        try {
            const { username, email, password } = req.body;

            const UsernameCandidate = await User.findOne({username});
            const EmailCandidate = await User.findOne({email});

            if (UsernameCandidate) {
                return res.json({message: `Пользователь ${username} уже существует`});
            }
            if (EmailCandidate) {
                return res.json({message: `Пользователь с почтой ${email} уже существует`});
            }

            const hashPassword = bcrypt.hashSync(password, 7);

            const user = new User({
                username,
                email,
                password: hashPassword
            });

            await user.save();

            return res.json({message: 'Вы успешно зарегистрировались'});
        } catch (e) {
            console.log(error);
            res.status(400).json({message: 'Ошибка регистрации'});
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({email});

            if (!user) {
                return res.json({message: `Пользователя с почтой ${email} не существует`})
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.json({message: 'Неверный пароль'})
            }
            
            const token = generateAccessToken(user._id, user.username, user.email);

            return res.json({
                token: token,
                message: 'Вы успешено авторизировались'
            })


        } catch(e) {
            console.log(e);
            res.status(400).json({message: 'Ошибка авторизации'});
        }
    }

    async decodeToken(req, res) {
        try {
            const { token } = req.body;

            jwt.verify(token, secret, (err, decoded) => {
                const data = decoded;

                res.json(data);
            })




        } catch(e) {
            console.log(e);
        }



    }
}

module.exports = new controller();