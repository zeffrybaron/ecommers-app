require('dotenv').config()
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const { Users, Roles, Verifikasi, sequelize } = require('../models')
const sendEmail = require('../helpers/email.helper')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    try {
        const { role, name, no_telephone, email, alamat, user_name, password } =
            req.body
        const [isRoleExist, isUserNameExist, isEmailExist] = await Promise.all([
            Roles.findOne({ where: { role: role } }),
            Users.findOne({ where: { user_name: user_name } }),
            Users.findOne({ where: { email: email } }),
        ])

        if (!isRoleExist) {
            return res.status(409).json({
                message: 'Role not exist',
            })
        }

        if (isUserNameExist) {
            return res.status(409).json({
                message: 'User name already exist',
            })
        }

        if (isEmailExist) {
            return res.status(409).json({
                message: 'Email already exist',
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const generateToken = crypto
            .createHash('md5')
            .update(Math.random().toString().substring(2))
            .digest('hex')
        const expiredToken = new Date()
        expiredToken.setDate(expiredToken.getDate() + 1)
        try {
            const result = await sequelize.transaction(async (t) => {
                const user = await Users.create(
                    {
                        role_id: isRoleExist.id,
                        name,
                        no_telephone,
                        email,
                        alamat,
                        user_name,
                        password: hashPassword,
                    },
                    { transaction: t }
                )

                await Verifikasi.create(
                    {
                        id_users: user.id,
                        kode_verifikasi: generateToken,
                        expired_date: expiredToken,
                        status: 'Pending',
                    },
                    { transaction: t }
                )

                return user
            })

            if (result) {
                sendEmail(name, email, generateToken, req)

                return res.status(201).json({
                    message:
                        'User registration has successful, please check your email for activation account',
                    data: result,
                })
            } else {
                throw (
                    (500, 'User registration not successful, please try again')
                )
            }
        } catch (error) {
            next(error)
        }
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { user_name, password } = req.body
        const user = await Users.findOne({
            where: { user_name },
            include: [
                {
                    model: Roles,
                    as: 'role',
                    attributes: ['role'],
                },
                {
                    model: Verifikasi,
                    as: 'verifikasi',
                    attributes: ['status'],
                },
            ],
        })
        if (!user) {
            return res.status(404).json({
                message: 'User not exist',
            })
        }
        if (
            user?.verifikasi?.length === 0 ||
            user?.verifikasi[0]['status'] === 'Pending'
        ) {
            return res.status(401).json({
                message: 'Pending account, Please verify Your email',
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(404).json({
                message: 'Password not valid',
            })
        }

        const token = jwt.sign(
            { email: user.email, user_id: user.id, role: user.role },
            process.env.JWT_SECRET,
            {
                expiresIn: '10m',
            }
        )

        const refresh = jwt.sign(
            { email: user.email, user_id: user.id, role: user.role },
            process.env.JWT_REFRESH,
            {
                expiresIn: '60m',
            }
        )

        return res.status(200).json({
            message: 'Login success',
            data: {
                token,
                refresh,
                user: {
                    id_users: user.id_users,
                    user_name: user.user_name,
                    name: user.name,
                    email: user.email,
                    no_telephone: user.no_telephone,
                    alamat: user.alamat,
                    role: user.role.role,
                },
            },
        })
    } catch (error) {
        next(error)
    }
}

const refreshToken = async (req, res, next) => {
    const { email, token } = req.body
    const isTokenValid = refreshToken(email, token)
    if (!isTokenValid) {
        return res.status(401).json({
            message: 'Invalid token',
        })
    }

    const accessToken = jwt.sign(
        { email: email, user_id: isTokenValid.user_id },
        process.env.JWT_SECRET,
        {
            expiresIn: '2m',
        }
    )

    return res.status(200).json({
        message: 'Token refreshed',
        accessToken: accessToken,
    })
}

const confirm = async (req, res, next) => {
    const code = req.params.confirmationCode
    const expiredToken = new Date()

    const verifyCode = await Verifikasi.findOne({
        where: {
            kode_verifikasi: code,
        },
    })

    if (!verifyCode) {
        return res.status(400).json({
            message: 'Activation code not found',
        })
    }

    if (verifyCode?.status === 'Active') {
        return res.status(400).json({
            message: 'Your account has actived',
        })
    }

    if (verifyCode?.expired_date < expiredToken) {
        return res.status(400).json({
            message:
                'Your activation token has expired, please resend email activation',
        })
    }

    await verifyCode.update({
        status: 'Active',
    })
    return res.status(200).json({
        message: 'Congratulation activation account successful',
    })
}
module.exports = {
    register,
    login,
    refreshToken,
    confirm,
}
