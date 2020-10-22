const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Message = require('../../models/Message');

//  @route    Post api/message
//  @disc     Message from users or visitors
//  @access   Public
router.post('/', [
    check('nameUser', 'المرجو إدخال الإسم الكامل').not().isEmpty(),
    check('emailUser', 'المرجو إدخال بريد إلكتروني صالح').isEmail(),
    check('textUser', ' يجب أن تحتوي رسالتكم على 50 حرف على الأقل').isLength({min: 50})
],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { nameUser, emailUser, textUser, phoneUser, cityUser } = req.body;
    try {

     const newMessgae = new Message({
            nameUser, emailUser, textUser, phoneUser, cityUser 
        })
        const msg = await newMessgae.save();
        res.json(msg);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error')
    }
});


//  @route    Get api/message
//  @disc     Get all messages
//  @access   Private admins
router.get('/',async (req, res) => {
    try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;