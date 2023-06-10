const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { requiresAuth } = require('express-openid-connect');


// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(swaggerDocument));
router
  .use((req, res, next) => {
    res.removeHeader('Content-Type');
    next();
  })
  .use('/api-docs', requiresAuth(), swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports = router;