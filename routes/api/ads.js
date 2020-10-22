const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const Ads = require('../../models/Ads')
const User = require('../../models/User')
const auth = require('../../middleware/auth');

//  @route    Post api/ads
//  @disc     New ads
//  @access   Private admin
router.post('/',[auth, [
    check('from', 'المرجو إدخال الإسم الكامل').not().isEmpty(),
    check('description', 'المرجو إدخال بريد إلكتروني صالح').isEmail(),
    check('link', 'يجب أن تتجاوز كلمة المرور ثمانية أحرف').isLength({min: 6}),
    check('current', 'المرجو إدخال بريد إلكتروني صالح').isEmail(),
    check('place', 'المرجو إدخال بريد إلكتروني صالح').isEmail()
]],async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
    // See if user exists
        const user = await User.findById(req.user.id).select('-password');
        if(!user) {
            res.status(400).json({errors: [ {msg: 'تم إستعمال'} ]})
        }

        const newAds = new Ads (
            {
                from: req.body.from,
                description: req.body.description,
                nameUser: user.name,
                timeStart: req.body.timeStart,
                user: req.user.id,
                timeEnd: req.body.timeEnd,
                budget: req.body.budget,
                link: req.body.link,
                current: req.body.current,
                place: req.body.place,
                image: req.body.place
            }
        )

    const ads = await newAds.save();
    res.json(ads);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error')
    }
});

//  @route    POST api/ads/:id
//  @disc     Update ads
//  @access   Private admin
router.put('/activity/:act_id',[auth, [
    check('from', 'المرجو إدخال الإسم الكامل').not().isEmpty(),
    check('description', 'المرجو إدخال بريد إلكتروني صالح').isEmail(),
    check('link', 'يجب أن تتجاوز كلمة المرور ثمانية أحرف').isLength({min: 6}),
    check('current', 'المرجو إدخال بريد إلكتروني صالح').isEmail(),
    check('place', 'المرجو إدخال بريد إلكتروني صالح').isEmail()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const {
    from,
    description,
    nameUser,
    timeStart,
    timeEnd,
    budget,
    link,
    current,
    place,
    image
  } = req.body;

  try {
      const ads = await Ads.findById( req.params._id );

        const fieldsAds = {};
        if(ads.timeStart) ads.timeStart = timeStart; 
        if(ads.timeEnd) ads.timeEnd = timeEnd; 
        if(ads.budget) ads.budget = budget; 
        if(ads.link) ads.link = link; 
        if(ads.place) ads.place = place; 
        if(ads.image) ads.image = image; 
        if(ads.from) ads.from = from;
        if(ads.nameUser) ads.nameUser = nameUser;
        if(ads.current) ads.current = current;
        if(ads.description) ads.description - description; 
        
         await Ads.updateOne(
        { ads: req.params._id },
        { $set: fieldsAds},
        { new: true }
          ) 
 

      await ads.save()
      res.json(ads);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
})

//  @route    POST api/ads
//  @disc     GET all ads
//  @access   Public all user
router.get('/', async(req, res)=> {
    try {
        const allAds = await Ads.find().sort({ date: -1 });
        res.json(allAds);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
})


//  @route    POST api/ads/:id
//  @disc     GET ads by ID
//  @access   Private admin

router.get('/:id', auth, async(req, res)=> {
    try {
        const ads = await Ads.findById(req.params.id);
        if(!ads) {
            return res.status(404).json({ msg: 'Ads not found' });
        }
        res.json(ads);
        } catch (err) {
            console.error(err.message);
            if(err.kind === 'ObjectId') {
                return res.status(404).json({ msg: 'Ads not found' });
            }
            res.status(500).send('Server Error');
        }
})

module.exports = router;