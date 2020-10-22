const express = require('express');
const router = express.Router();
const Conflict = require('../../models/Conflict');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

//  @route    Get api/conflict
//  @disc     Send Conflict
//  @access   Private 

router.post('/',[auth, [
    check('textConflict', 'المرجو كتابة موضوع النزاع').not().isEmpty(),
    check('linkPost', 'رابط النزاع حقل ضروري').not().isEmpty(),
    check('phone', 'الهاتف حقل ضروري').not().isEmpty()
]], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');

        const newConflict = new Conflict (
            {
                textConflict: req.body.textConflict, 
                nameConflict: user.name, 
                linkPost: req.body.linkPost,
                user: req.user.id, 
                phone: req.body.phone,
                email: user.email
            } 
        )

        const conflict = await newConflict.save(); 
        res.json(conflict);
    } catch (err) {
        res.status(500).send('Server Error')
    }
}); 

//  @route    Get api/conflict
//  @disc     Get all conflicts
//  @access   Private admins and users
router.get('/',auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); 
        if(!user) {
            return res.status(400).json({ msg: 'مستعمل غير موجود'})
        }
    const conflicts = await Conflict.find().sort({ date: -1 });
    res.json(conflicts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;