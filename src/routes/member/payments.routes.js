const validation = require('../../middlewares/validation.middleware')
const createPaymentSchema = require('../../schemas/createpayment.schema');
const router = require('express').Router();
const { isTokenValid } = require('../../middlewares/verifyToken.middleware')
const { postPayments, updatePayments, deletePayments } = require('../../controllers/payments.controllers');


router.post('/', isTokenValid('MEMBER'),  validation(createPaymentSchema), postPayments);
router.put('/:id', isTokenValid('MEMBER'), updatePayments);
router.delete('/:id', isTokenValid('MEMBER'), deletePayments)

module.exports = router;