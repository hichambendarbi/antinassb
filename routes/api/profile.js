const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post')
const { check, validationResult } = require('express-validator')
const multer = require('multer');
const path = require('path');

const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file , cb) => {
        // const fileName = file.originalname.toLowerCase().split(' ').join('-');
        // cb(null, uuidv4() + '-' + fileName)
        cb(null, 'congar' + '-' + Date.now() + path.extname(file.originalname))
    }
});



//  Eport upload as single file you can use

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

//  @route    Get api/profile/me
//  @disc     Get current users profile
//  @access   Private
router.get('/me',auth ,async (req, res) => {
      try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name']);
        if(!profile) {
            return res.status(400).json({ msg: 'لا يوجد بروفايل' })
        } 

        res.json(profile)
    } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
      }
});

//  @route    POST api/profile/me
//  @disc     Create or update user profile
//  @access   Private
router.post('/', auth, upload.single('image'),
async (req, res) => {
  // const url = req.protocol + '://' + req.get('host')
  // const url = req.protocol + '://' + '192.168.1.103:3000'
  const url = req.protocol + '://' + req.get('antinassb.com')
  var image = ''
  if(req.file) { 
    image = url + '/public/' + req.file.filename
  } else {
      image=''
  }
  
  var errors = []
  const {
    email,
    phone,
    location,
    activity,
    bio,
    age,
    skills,
    youtube,
    twitter,
    facebook,
    instagram,
    linkdin,
    website
  } = req.body;

//    Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(email) profileFields.email = email;
    if(phone) profileFields.phone = phone;
    if(location) profileFields.location = location;
    if(activity) profileFields.activity = activity;
    if(bio) profileFields.bio = bio;
    if(age) profileFields.age = age;
    if(image) profileFields.image = image;
    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    var ers = [
        'عدد الأرقام عشرة',
        'الإيميل حقل ضروري',
        'المدينة حقل ضروري',
        'النشاط حقل ضروري',
        'السن حقل ضروري' ,
        'حقل يوتيوب عبارة عن رابط',
        'حقل تويتر عبارة عن رابط',
        'حقل فيس بوك عبارة عن رابط',
        'حقل أنستاغرام عبارة عن رابط',
        'حقل لينكد إن عبارة عن رابط',
        'حقل الموقع الشخصي عبارة عن رابط'
      ];
        var testMsg = false;
       
          if(phone.length !== 10) {
            errors.push(ers[0])
            testMsg= true;
          }

          if(email.length < 15 || email.length > 50) {
            errors.push(ers[1])
            testMsg= true;
          }

          if(location === 'جميع المدن' || location.length < 1) {
            errors.push(ers[2])
            testMsg= true;
          }

          if(activity.length < 5 || activity.length > 20) {
            errors.push(ers[3])
            testMsg= true;
          }

          if(age.length !== 2) {
            errors.push(ers[4])
            testMsg= true;
          }


    // Build social object
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(instagram) profileFields.social.instagram = instagram;
    if(linkdin) profileFields.social.linkdin = linkdin;
    if(website) profileFields.social.website = website;
    
    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        // return !!pattern.test(str);
        return pattern.test(str)
      }

      if(youtube.length!==0) { 
        if(!validURL(youtube)) {
            errors.push(ers[5])
            testMsg= true;
        }
      }

      if(twitter.length!==0) { 
          if(!validURL(twitter)) {
            errors.push(ers[6])
            testMsg= true;
          }
      }

      if(facebook.length!==0) { 
          if(!validURL(facebook)) {
            errors.push(ers[7])
            testMsg= true;
          }
      }

     if(instagram.length!==0) { 
         if(!validURL(instagram)) {
            errors.push(ers[8])
            testMsg= true;
         }
      }

      if(linkdin.length!==0) { 
          if(!validURL(linkdin)) {
            errors.push(ers[9])
            testMsg= true;
          }
      }

      if(website.length!==0) { 
        if(!validURL(website)) {
           errors.push(ers[10])
           testMsg= true;
        }
     }
      

    if(testMsg) {
        testMsg=false
        if(errors.length!==0) {
            return res.status(400).json(errors)
        }
        errors= []
    }

    try {
    let profile = await Profile.findOne({ user: req.user.id });
    if(profile) {
    // Update

    profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
        );

    return res.json(profile);
    }
    // Create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);

    } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
    }
 }
);

//  @route    GET api/profile/me
//  @disc     Get all profiles
//  @access   Public
router.get('/', async(req, res) => {
 try {
     const profiles = await Profile.find().populate('user', ['name']);
     res.json(profiles);
 } catch (err) {
     connsole.error(err.message);
     res.status(500).send('Server Error');
 }
}) 

//  @route    GET api/profile/user/:user_id
//  @disc     Get profile by user ID
//  @access   Public
router.get('/:user_id', async(req, res) => {    
    try {
        const profile = await Profile.findOne({user: req.params.user_id});
        if(!profile) 
        return res.status(400).json({ msg: 'لا يوجد بروفايل'}) 
        res.json(profile);
    } catch (err) {
        connsole.error(err.message);
        if(err.kind == 'ObjectId') {
           return res.status(400).json({ msg: 'لا يوجد بروفايل'})
        }
        res.status(500).send('Server Error');  
    }
   })

//  @route    DELETE api/profile/me
//  @disc     Delete profile, user & posts
//  @access   Private
router.delete('/',auth, async(req, res) => {
    try {
        // remove users posts
        //  await Post.deleteMany({ user: req.user.id})
        // Remove profile
         await Profile.findOneAndRemove({ user: req.user.id});
         // Remove user
        //  await User.findOneAndRemove({ _id: req.user.id });
         res.json({ msg: 'تم مسح الملف الشخصي بنجاح' });
    } catch (err) {
        connsole.error(err.message);
        res.status(500).send('Server Error');
    }
   })

//  @route    PUT api/profile/activitys
//  @disc     Add profile activitys
//  @access   Private
router.put('/activity',[auth, [
    check('title', 'الخدمة حقل ضروري').not().isEmpty(),
    check('from', 'تاريخ البدئ حقل ضروري').not().isEmpty(),
    check('description', 'المرجو شرح الخدمة').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const {
      title,
      from,
      to,
      current,
      description
  } = req.body;

  const newExp = {
    title,
    from,
    to,
    current,
    description
  }

  try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.activitys.unshift(newExp);
      await profile.save()
      res.json(profile);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
})

//  @route    DELETE api/activity/:act_id
//  @disc     Delete activity from profile
//  @access   Private
router.delete('/activity/:act_id', auth, async (req, res) => {
      try {
        const profile = await Profile.findOne({ user: req.user.id });

        //  Get remove index
        const removeIndex = 
        profile.activitys.map(item => item.id).indexOf
        (req.params.act_id);

        profile.activitys.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');  
      }
})


//  @route    POST api/profile/activitys/:cat_id
//  @disc     Update profile activitys
//  @access   Private
router.put('/activity/:act_id',[auth, [
    check('title', 'الخدمة حقل ضروري').not().isEmpty(),
    check('from', 'تاريخ البدئ حقل ضروري').not().isEmpty(),
    check('description', 'المرجو شرح الخدمة').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const {
      title,
      from,
      to,
      current,
      description
  } = req.body;

  try {
      const profile = await Profile.findOne({ user: req.user.id });
      var acti;
      for( var i=0; i<profile.activitys.length; i++) {
          if(profile.activitys[i]._id==req.params.act_id) { 
            acti =  profile.activitys[i];
              
          }
        }

        const fieldsActivity = {};
        if(acti.title) acti.title = title; 
        if(acti.from) acti.from = from;
        if(acti.to) acti.to = to;
        if(acti.current) acti.current = current;
        if(acti.description) acti.description = description; 
        
         await Profile.updateOne(
        { user: req.user.id },
        { $set: fieldsActivity},
        { new: true }
          ) 
 

      await profile.save()
      res.json(profile);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
})


module.exports = router;