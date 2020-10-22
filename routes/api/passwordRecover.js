const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const express = require('express');
const router = express.Router();
const config = require('config');
const nodemailer = require('nodemailer');

/*** Calling this function with a registered user's email sends an email IRL ***/
/*** I think Nodemail has a free service specifically designed for mocking ***/
let transporter = nodemailer.createTransport({
service: "gmail",
type: 'oauth2',
port: 25,
secure: false,
requireTLS: true,
auth: {
user: "antinassb@gmail.com",
pass: "antinassb@4555666"
}, tls: { 
    rejectUnauthorized: false
}
})

const getPasswordResetURL = (user, token) =>
`https://antinassb.com/password/${user._id}/${token}`
// `https://192.168.1.11:3000/password/${user._id}/${token}`
// `http://localhost:3000/password/${user._id}/${token}`

const resetPasswordTemplate = (user, url) => {
const from = "Antinassb" 
const to = user.email
const subject = "récupération mot de passe"
const html = `
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Simple Transactional Email</title>
    <style>
    * {
        margin: 0;
        padding: 0;
    }
    
    * {
        font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    }
    
    img {
        max-width: 100%;
    }
    
    .collapse {
        margin: 0;
        padding: 0;
    }
    
    body {
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: none;
        width: 100%!important;
        height: 100%;
    }
    
    
    /* ------------------------------------- 
            ELEMENTS 
    ------------------------------------- */
    a {
        color: #c31a45;
    }
    
    .btn {
        text-decoration: none;
        color: #FFF;
        background-color: #666;
        padding: 10px 16px;
        font-weight: bold;
        margin-right: 10px;
        text-align: center;
        cursor: pointer;
        display: inline-block;
    }
    
    .callout {
    padding: 15px;
    border-color: #ccc !important;
    margin-bottom: 15px;
      
    border-top:1px dashed;
      border-bottom:1px dashed;
    }
    .callout h1 {color:#532d42 !important;font-weight:bold}
    
    .callout a {
        font-weight: bold;
       
    }
    
    table.social {
    /* 	padding:15px; */
        background-color: #F4F5F6;
      border-bottom: 1px solid #ccc;
    }
    
    .social .soc-btn {
        padding: 3px 7px;
        font-size: 12px;
        margin-bottom: 10px;
        text-decoration: none;
        color: #FFF;
        font-weight: bold;
        text-align: center;
    }
    
    a.fb {
        background-color: #3B5998!important;
    }
    
    a.tw {
        background-color: #1daced!important;
    }
    
    a.gp {
        background-color: #DB4A39!important;
    }
    
    a.ms {
        background-color: #000!important;
    }
    
    .inline-button {padding: 5px 10px;
      text-decoration:none;
      cursor:pointer;
    font-size: 12px;
    line-height: 1.5;
      border-radius: 3px;
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    white-space: nowrap;
    padding: 8px 20px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    -webkit-user-select: none;
      color: #e66e07;
    background-color: #343a402e;
    border-color: #512f40;
      font-weight:normal !important
    }
    
    .sidebar .soc-btn {
        display: block;
        width: 100%;
    }
    
    /* ------------------------------------- 
            HEADER 
    ------------------------------------- */
    table.head-wrap {
        width: 100%;
      border-bottom:1px solid #ccc;
    }
    
    .header.container table td.logo {
        padding: 15px;
    }
    
    .header.container table td.label {
        padding: 15px;
        padding-left: 0px;
    }
    
    
    /* ------------------------------------- 
            BODY 
    ------------------------------------- */
    table.body-wrap {
        width: 100%;
    }
    
    
    /* ------------------------------------- 
            FOOTER 
    ------------------------------------- */
    table.footer-wrap {
        width: 100%;
        clear: both!important;
    }
    
    .footer-wrap .container td.content  p {
        border-top: 1px solid rgb(215,215,215);
        padding-top: 15px;
    }
    
    .footer-wrap .container td.content p {
        font-size: 10px;
        font-weight: bold;
    }
    
    
    /* ------------------------------------- 
            TYPOGRAPHY 
    ------------------------------------- */
    h1,h2,h3,h4,h5,h6 {
        font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
        line-height: 1.1;
        margin-bottom: 15px;
        color: #777;
    }
    
    h1 small, h2 small, h3 small, h4 small, h5 small, h6 small {
        font-size: 60%;
        color: #6f6f6f;
        line-height: 0;
        text-transform: none;
    }
    
    h1 {
        font-weight: 200;
        font-size: 30px;
    }
    
    h2 {
        font-weight: 200;
        font-size: 26px;
    }
    
    h3 {
        font-weight: 500;
        font-size: 22px;
    }
    
    h4 {
        font-weight: 500;
        font-size: 20px;
    }
    
    h5 {
        font-weight: 900;
        font-size: 16px;
    }
    
    h6 {
        font-weight: 900;
        font-size: 12px;
        text-transform: uppercase;
        color: #444;
    }
    
    .collapse {
        margin: 0!important;
    }
    
    p, ul {
        margin-bottom: 10px;
        font-weight: normal;
        font-size: 14px;
        line-height: 1.6;
        color:#7f8c8d
    }
    
    p.lead {
        font-size: 17px;
      margin-bottom:30px
    }
    
    p.last {
        margin-bottom: 0px;
    }
    
    ul li {
        margin-left: 5px;
        list-style-position: inside;
    }
    
    /* ------------------------------------- 
            SIDEBAR 
    ------------------------------------- */
    ul.sidebar {
        background: #ebebeb;
        display: block;
        list-style-type: none;
    }
    
    ul.sidebar li {
        display: block;
        margin: 0;
    }
    
    ul.sidebar li a {
        text-decoration: none;
        color: #666;
        padding: 10px 16px;
    /* 	font-weight:bold; */
        margin-right: 10px;
    /* 	text-align:center; */
        cursor: pointer;
        border-bottom: 1px solid #777777;
        border-top: 1px solid #FFFFFF;
        display: block;
        margin: 0;
    }
    
    ul.sidebar li a.last {
        border-bottom-width: 0px;
    }
    
    ul.sidebar li a h1,ul.sidebar li a h2,ul.sidebar li a h3,ul.sidebar li a h4,ul.sidebar li a h5,ul.sidebar li a h6,ul.sidebar li a p {
        margin-bottom: 0!important;
    }
    
    
    
    /* --------------------------------------------------- 
            RESPONSIVENESS
            Nuke it from orbit. It's the only way to be sure. 
    ------------------------------------------------------ */
    
    /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
    .container {
        display:block!important;
        max-width:600px!important;
        margin:0 auto!important; /* makes it centered */
        clear:both!important;
    }
    
    /* This should also be a block element, so that it will fill 100% of the .container */
    .content {
        padding:15px;
        max-width:600px;
        margin:0 auto;
        display:block; 
    }
    
    /* Let's make sure tables in the content area are 100% wide */
    .content table {
        width: 100%;
    }
    
    
    /* Odds and ends */
    .column {
        width: 300px;
        float: left;
    }
    
    .column tr td {
        padding: 15px;
    }
    
    .column-wrap {
        padding: 0!important;
        margin: 0 auto;
        max-width: 600px!important;
    }
    
    .column table {
        width: 100%;
    }
    
    .social .column {
        width: 280px;
        min-width: 279px;
        float: left;
    }

    .title-logo {
        color: #e66e07;
        font-size: 20px;
        font-weight: 600;
    }
    
    /* Be sure to place a .clear element after each set of columns, just to be safe */
    .clear {
        display: block;
        clear: both;
    }
    
    
    /* ------------------------------------------- 
            PHONE
            For clients that support media queries.
            Nothing fancy. 
    -------------------------------------------- */
    @media only screen and (max-width: 600px) {
        
        a[class="btn"] {
            display: block!important;
            margin-bottom: 10px!important;
            background-image: none!important;
            margin-right: 0!important;
        }
    
        div[class="column"] {
            width: auto!important;
            float: none!important;
        }
    
        table.social div[class="column"] {
            width: auto!important;
        }
    }
    </style>
  </head>
  <body class="">
  <!-- HEADER -->
  <table class="head-wrap" bgcolor="#F4F5F6">
      <tr>
          <td></td>
          <td class="header container">
              
                  <div class="content">
                      <table bgcolor="#F4F5F6">
                      <tr>
                          <td class="title-logo">antinassb</td>
                         <!-- <img src="http://192.168.1.103:3000/public/logotest.png" width="100" alt="logo antinassb"/> -->
                      </tr>
                  </table>
                  </div>
                  
          </td>
          <td></td>
      </tr>
  </table><!-- /HEADER -->
  
  
  <!-- BODY -->
  <table class="body-wrap">
      <tr>
          <td></td>
          <td class="container" bgcolor="#FFFFFF">
  
              <div class="content">
              <table>
                  <tr>
                      <td>
                          
                          <h3>Bonjour, ${user.name}</h3>
                          <p class="lead">
                          Demande de recuperation mot de passe, 
                          Nous sommes très heureux de vous envoyer ce courrier, afin de vous aider à récupérer le mot de passe de 
                          votre compte sur l'application antinassb, vous pouvez maintenant cliquer sur le lien ci-dessous.
                          </p>
             
                             <table style="margin-bottom:20px">
       <tr>
         <td>
           <div class="callout" style="text-align:center;margin:0 auto">
             <h5>Veuillez cliquer sur le bouton ci-dessous</h5>
             <p>Une nouvelle page s'ouvrira</p>
             <a href=${url} class="inline-button">récupération</a>
           </div></td>
       </tr>
     </table>         
              
  
                          
              
  <!-- /Callout Panel -->
<p style="text-align:left">Meilleurs vœux,	<br/>antinassb team</p>
                                              
                          <!-- social & contact -->
                          <table class="social" width="100%">
                <tr><td>									
                                     <tr>
                                              <td>				
                                                  
                                                  <h5 class="">Contactez-nous :</h5>
                                                  <p class=""><a href="#" class="soc-btn fb">Facebook</a> <a href="#" class="soc-btn tw">Twitter</a> <a href="#" class="soc-btn gp">Google+</a></p>
                                              </td>
                                          </tr>
                                      </table><!-- /column 1 -->	
                                      
                                      <!--- column 2 -->
                                      <table align="left" class="column">
                                          <tr>
                                              <td>				
                                                                              
                                                  <h5 class="">Vous avez des questions ?</h5>												
                                                  <p>Telephone et whatsapp: <strong>+212 657962008</strong><br/>
                  Email: <strong><a href="emailto:antinassb@support.com">antinassb@support.com</a></strong></p>
                  
                                              </td>
                                          </tr>
                                      </table><!-- /column 2 -->
                                      
                                      <span class="clear"></span>	
                                      
                                  </td>
                              </tr>
                          </table><!-- /social & contact -->
                      
                      
                      </td>
                  </tr>
              </table>
              </div>
                                      
          </td>
          <td></td>
      </tr>
  </table><!-- /BODY -->
  
  <!-- FOOTER -->
  <table class="footer-wrap">
      <tr>
          <td></td>
          <td class="container">
              
                  <!-- content -->
                  <div class="content">
                  <table>
                  <tr>
                      <td align="center">
                          <p>
                              <a href="#">Terms</a> |
                              <a href="#">Privacy</a> |
                              <a href="#"><unsubscribe>Unsubscribe</unsubscribe></a>
                          </p>
                      </td>
                  </tr>
              </table>
                  </div><!-- /content -->
                  
          </td>
          <td></td>
      </tr>
  </table><!-- /FOOTER -->
  </body>
</html>
`
//    <h1>أهلا ${user.name}</h1>
//         <p><a href=${url}>${url}</a></p>
return { from, to, subject, html }
}

router.post('/:email', async (req, res) => {
const { email } = req.params
let user
try {
user = await User.findOne({ email }).exec()
} catch (err) {
res.status(404).json("No user with that email")
}
// const token = usePasswordHashToMakeToken(user)

const payload = {
user : {
id : user.id
}
}

const token = jwt.sign(payload, config.get('jwtSecret'), {
expiresIn: 3600 // 1 hour
})

const url = getPasswordResetURL(user, token)
const emailTemplate = resetPasswordTemplate(user, url)

transporter.sendMail(emailTemplate)
.then(function (email) {
res.status(200).json({ success: true, msg: 'Mail sent' });
}).catch(function (exception) {
res.status(200).json({ success: false, msg: exception });
});
})

router.post('/:userId/:token', (req, res) => {
const { userId, token } = req.params
const { password } = req.body
User.findOne({ _id: userId })
.then(user => {
console.log(user)
const secret = user.password + "-" + user.createdAt
const payload = jwt.decode(token, config.get('jwtSecret'))
console.log(payload)
if (payload.user.id === user.id) {
bcrypt.genSalt(10, function(err, salt) {
if (err) return
bcrypt.hash(password, salt, function(err, hash) {
if (err) return
User.findOneAndUpdate({ _id: userId }, { password: hash })
.then(() => res.status(202).json("Password changed accepted"))
.catch(err => res.status(500).json(err))
})
})
}
})

.catch(() => {
res.status(404).json("Invalid user")
})
})

module.exports = router;