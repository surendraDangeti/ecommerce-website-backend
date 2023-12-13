const OrderModel = require('../models/Oders');

const saveOrders = async (req, res) => {
    try {
        const { clientId, order } = req.body;
        console.log("co",clientId, order)
        const clientIdValue = clientId ? clientId.clientId : null;
        for (const orderItem of order) {
            const { productid, quantity } = orderItem;
            console.log("orderItem", orderItem)
            await OrderModel.createOrder(clientIdValue, productid, quantity);
        }

        res.json({ message: 'Orders saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOrders = (req, res) => {
    OrderModel.getAllOrders()
        .then((orders) => {
            res.send(orders)
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

module.exports = { saveOrders, getOrders };
