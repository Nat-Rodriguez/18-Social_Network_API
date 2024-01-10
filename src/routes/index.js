const router = require('express').Router();
const apiRoutes = require('./api');
const dateFormat = require('../../utils/dateFormat')



router.use('/api', apiRoutes);

router.use((req, res) => res.send('Something is wrong with the route!'));

module.exports = router;
