const express = require('express');
const router = express.Router();
const Post = require("../../models/Post");
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
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





// const type = upload.single('image');
//  @route    Get api/post
//  @disc     Create a post
//  @access   Private 

router.post('/', [auth], upload.array('image', 5), async (req, res) => {
    // const errors = validationResult(req);
    // if(!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
    // const url = req.protocol + '://' + `192.168.43.182:3000`
    // const url = req.protocol + '://' + `192.168.2.4:3000`
    // req.get('host')
    // const image = url + '/public/' + req.file.filename; 
    try {
        const user = await User.findById(req.user.id).select('-password');
        const reqFiles = [];
        // const url = req.protocol + '://' + req.get('host')
        // const url = req.protocol + '://' + '192.168.0.185:3000'
        const url = req.protocol + '://' + req.get('antinassb.com')
        for (var i = 0; i < req.files.length; i++) {
            reqFiles.push(url + '/public/' + req.files[i].filename)
        } 

        const newPost = new Post (
            {
                text: req.body.text, 
                nameSpam: req.body.nameSpam,
                nameUser: user.name, 
                category: req.body.category,
                user: req.user.id, 
                country: req.body.country, 
                status: "OFFLINE",
                statusUser: "visible",
                facebook: req.body.facebook,
                instagram: req.body.instagram,
                website: req.body.website,
                telephone: req.body.telephone,
                image: reqFiles
            }
        )

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        res.status(500).send('Server Error')
    }
}); 

//  @route    Get api/posts
//  @disc     Get all posts BY STATUS
//  @access   Public 
router.get('/',async (req, res) => {
    try {
    const posts = await Post.find({status: "ONLINE"}).sort({ date: -1 });
    res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//  @route    Get api/posts
//  @disc     Get all posts
//  @access   Public 
router.get('/all-posts',async (req, res) => {
    try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


//  @route    Get api/posts/:id
//  @disc     Get post by ID
//  @access   Private 
router.get('/:id', async (req, res) => {
    try {
    const post = await Post.findById(req.params.id);
    if(!post) {
        return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
})

//  @route    DELETE api/posts/:id
//  @disc     Delete a post
//  @access   Private 
router.delete('/:id',auth, async (req, res) => {

    try {
     const post = await Post.findById(req.params.id);

    if(!post) {
        return res.status(401).json({ msg: 'User not authorized'});
      }

    // Check user
    if(post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized'});
    }

    await post.remove();
    res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not authorized'});
          }
        res.status(500).send('Server Error');
    }
})

//  @route    PUT api/post/like/:id
//  @disc     Like a post
//  @access   Private 
router.post('/like/:id', auth, async (req, res) => {
     try {
         const post = await Post.findById(req.params.id);

        //  Check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
          return res.status(400).send({ msg: 'Post already liked' });
        }
        post.likes.unshift({ user: req.user.id });

        await post.save();
        res.json(post.likes);
     } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
     }
})

//  @route    PUT api/post/unlike/:id
//  @disc     Like a post
//  @access   Private 
router.post('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

       //  Check if the post has already been liked
       if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
         return res.status(400).send({ msg: 'Post has not yet been liked' });
       }

       //  Get remove index
       const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
       post.likes.splice(removeIndex, 1);
       await post.save();
       res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//  @route    POST api/posts/comment/:id
//  @disc     Comment on a post
//  @access   Private 
router.post('/comment/:id',[auth, [
    check('text', 'المرجو كتابة تعليقك').not().isEmpty()
 ]], async (req, res) => {
     const errors = validationResult(req);
     if(!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }
 
     try {
         const user = await User.findById(req.user.id).select('-password');
         const post = await Post.findById(req.params.id);

         const newComment = 
             {
                 text: req.body.text,
                 name: user.name,
                 user: req.user.id,
             }

             post.comments.unshift(newComment);
 
             await post.save();
             res.json(post.comments);
     } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error')
     }
 });

//  @route    POST api/posts/comment/:id/:comment_id
//  @disc     Delete comment
//  @access   Private 
router.delete('/comment/:id/:comment_id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        // Make sure comment exists
        if(!comment) {
            return res.status(404).json({ msg: 'Comment does not exist'});
        }

        // Check user
        if(comment.user.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'User not authorized'});
        }

       //  Get remove index
       const removeIndex = post.comments.map
       (comment => comment.user.toString()).indexOf(req.user.id);
       post.comments.splice(removeIndex, 1);
       await post.save();
       res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    } 
})

//  @route    POST api/post/update/:id
//  @disc     Update post from admin for Verif
//  @access   Private
router.post('/update/:id', auth, async(req, res) => {
  const {
    status
  } = req.body;

  try {
      const post = await Post.findById(req.params.id);
      if(!post) {
        return res.status(404).json({ msg: 'هذا المنشور لم يعد متوفر'});
      }

        const fieldsPost = {};
        if(post.text) fieldsPost.text = post.text;  
        if(post.nameSpam) fieldsPost.nameSpam = post.nameSpam;
        if(post.nameUser) fieldsPost.nameUser = post.nameUser;
        if(post.category) fieldsPost.category = post.category;
        if(post.country) fieldsPost.country = post.country; 
        fieldsPost.status = status;
        if(post.facebook) fieldsPost.facebook = post.facebook;
        if(post.instagram) fieldsPost.instagram = post.instagram;
        if(post.website) fieldsPost.website = post.website;
        if(post.image) fieldsPost.image = post.image;
        if(post.user) fieldsPost.user = post.user;
        if(post.telephone) fieldsPost.telephone = post.telephone;
        
        const postres = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $set: fieldsPost},
        { new: true}
          ) 
    //   await post.save()
      res.json(postres); 
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
})

//  @route    Get api/posts
//  @disc     Get all posts
//  @access   Public 
router.get('/post-user/test',auth, async (req, res) => {
    try {
    const posts = await Post.find({user: req.user.id});
    res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//  @route    POST api/post/update/:id
//  @disc     Update post from user for deleting from list public
//  @access   Private
router.post('/update-delete/:id', auth, async(req, res) => {
    const {
        statusUser
    } = req.body;
  
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
          return res.status(404).json({ msg: 'هذا المنشور لم يعد متوفر'});
        }

        // if(post.user!==req.user.id) {
        //     return res.status(404).json({ msg: 'هذا المنشور لم يعد متوفر'});
        //   }
  
          const fieldsPost = {};
          if(post.text) fieldsPost.text = post.text;  
          if(post.nameSpam) fieldsPost.nameSpam = post.nameSpam;
          if(post.nameUser) fieldsPost.nameUser = post.nameUser;
          if(post.category) fieldsPost.category = post.category;
          if(post.country) fieldsPost.country = post.country;
          if(post.status=="ONLINE") fieldsPost.status = "OFFLINE";
          fieldsPost.statusUser = statusUser;
          if(post.facebook) fieldsPost.facebook = post.facebook;
          if(post.instagram) fieldsPost.instagram = post.instagram;
          if(post.website) fieldsPost.website = post.website;
          if(post.image) fieldsPost.image = post.image;
          if(post.user) fieldsPost.user = post.user;
          if(post.telephone) fieldsPost.telephone = post.telephone;
          
          const postres = await Post.findOneAndUpdate(
          { _id: req.params.id },
          { $set: fieldsPost},
          { new: true}
            ) 
      //   await post.save()
        res.json(postres); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  })


module.exports = router;