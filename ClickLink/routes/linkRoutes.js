const express = require('express');
const linkController = require('../controllers/linkController');

const router = express.Router();

router.post('/links', linkController.createLink);
router.get('/links', linkController.getAllLinks); // נתיב חדש לקבלת כל הקישורים
router.get('/links/:id', linkController.getLink);
router.get('/links/:id/clicks', linkController.getLinkClicks);
router.get('/:id', linkController.redirectLink);
router.patch('/links/:id', linkController.updateLink);
router.delete('/links/:id', linkController.deleteLink);
// router.put('/links/updateAll', linkController.updateAllLinks);






module.exports = router;
