const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../../middleware/auth');

//  @route    Post api/users
//  @disc     Register user
//  @access   Public
router.post('/', [
    check('name', 'المرجو إدخال الإسم الكامل').not().isEmpty(),
    check('email', 'المرجو إدخال بريد إلكتروني صالح').isEmail(),
    check('password', 'يجب أن تتجاوز كلمة المرور ثمانية أحرف').isLength({min: 6})
],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
    // See if user exists
        let user = await User.findOne({email});
        if(user) {
            res.status(400).json({errors: [ {msg: 'تم إستعمال هذا البريد من قبل '} ]})
        }

        user = new User({
            name, email,password
        })
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return Jsonwebtoken
    const payload = {
        user: {
            id: user.id
        }
    }

    jwt.sign(payload,
            config.get('jwtSecret'),
            {expiresIn: 360000},
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            } 
        );

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error')
    }
});


//  @route    UPDATE pai/users/update-password
//  @disc     Update password from user
//  @access   Private
router.post('/update-password', auth, async(req, res) => {
    const {
        password
    } = req.body;
  
    try {
        const user = await User.findById(req.user.id);
        if(!user) {
          return res.status(404).json({ msg: 'مستعمل غير متصل أو غير موجود'});
        }

            // Encrypt password
                const salt = await bcrypt.genSalt(10);
                // user.password = await bcrypt.hash(password, salt);
  
          const fieldsUser = {};
          if(user.name) fieldsUser.name = user.name;  
          if(user.email) fieldsUser.email = user.email;
          if(user.admin) fieldsUser.admin = user.admin;
          if(user.role) fieldsUser.role = user.role;
          if(user.createdat) fieldsUser.createdat = user.createdat;
          fieldsUser.password = await bcrypt.hash(password, salt);
          const userres = await User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: fieldsUser},
          { new: true}
            ) 
      //   await post.save()
        res.json(userres); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  })


module.exports = router;