const {
  register,
  login,
  refreshToken,
  confirm,
} = require('../controllers/auth.controller');

const router = require('express').Router();
const validation = require('../middlewares/validation.middleware');
const registerSchema = require('../schemas/register.schema');
const loginSchema = require('../schemas/login.schema');

router.post('/register', validation(registerSchema), register);
router.post('/login', validation(loginSchema), login);
router.post('/refresh_token', refreshToken);
router.get('/confirm/:confirmationCode', confirm);

module.exports = router;
