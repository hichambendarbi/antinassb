const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Advertising = require('../../models/Advertising');

//  @route    Post api/advertising
//  @disc     Advertising from users or visitors
//  @access   Public

router.post('/', [
    check('nameComp', 'المرجو إدخال الإسم').not().isEmpty(),
    check('emailComp', 'المرجو إدخال بريد إلكتروني صالح').isEmail(),
    check('textAdver', ' يجب أن يحتوي طلبكم على 50 حرف على الأقل').isLength({min: 50}),
    check('phoneComp', 'المرجو إدخال رقم الهاتف').not().isEmpty()
],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { nameComp, emailComp, textAdver, phoneComp, cityComp } = req.body;
    try {

     const newAdvertising = new Advertising({
           nameComp, emailComp, textAdver, phoneComp, cityComp
        })
        const msg = await newAdvertising.save();
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
    const advertisings = await Advertising.find().sort({ date: -1 });
    res.json(advertisings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;