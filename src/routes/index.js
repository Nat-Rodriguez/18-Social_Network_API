const router = require('express').Router();
const apiRoutes = require('./api');



router.use('/api', apiRoutes);

router.use((req, res) => res.send('Something is wrong with the route!'));

module.exports = router;
