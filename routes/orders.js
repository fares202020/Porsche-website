const express = require('express');
const router = express.Router();
const { getAll, getMyOrders, create, updateStatus } = require('../controllers/orderController');

router.get('/', getAll);
router.get('/mine', getMyOrders);
router.post('/', create);
router.put('/:id/status', updateStatus);

module.exports = router;
