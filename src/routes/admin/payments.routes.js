// const router = require('express').Router();
// const { postPayments } = require('../controllers/payments.controllers');
// router.post('/payments', postPayments)
// router.post('*', postPayments)
// module.exports = router;

const router = require('express').Router();

const {postPayments, updatePayments, deletePayments} = require('../controllers/payments.controllers');
const { isTokenValid } = require('../../middlewares/verifyToken.middleware')
const validation = require('../../middlewares/validation.middleware')
const paymentsSchema = require('../../schemas/payments.schema')

router.post('/', isTokenValid('MEMBER'), postPayments)
router.put('/:id', isTokenValid('MEMBER'), updatePayments)
router.delete('/:id', isTokenValid('MEMBER'), deletePayments)

module.exports = router;
