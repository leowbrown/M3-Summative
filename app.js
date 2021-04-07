/* 

    Table of contents 

    *line numbers* 

    10  - 24        Importing modules
    27  - 34        Access for static files
    38  - 45        Mongoose schemas
    49  - 57        Setting views
    62  - 69        Connecting Database
    73  - 87        Connecting Seesion and Passport
    90  - 99        Connecting Body-parser
    103 - 117       Starting Server
    121 - 131       Rendering pages
    131 - 156       Creating a post function
    160 - 170       Login authentication
    179 - 194       Check if User is logged in - Displaying all posts
    198 - 216       Delete post function
    221 - 247       Comment on post function
    251 - 272       Register Function
    276 - 291       Login Function
    296 - 317       Edit post function
    321 - 349       Update post function

*/


/////////////////////////
///                   ///
/// importing modules ///
///                   ///
/////////////////////////

const express  =  require('express');
const app = express();
const mongoose =  require("mongoose");
const passport =  require("passport");
const bodyParser =  require("body-parser");
const LocalStrategy =  require("passport-local");
const passportLocalMongoose =  require("passport-local-mongoose"); ////simplifies the integration between Mongoose and Passport for local authentication
const twig = require('twig');


///////////////////////////////////////////////
///                                         ///
/// giving our app access to static folders ///
///                                         ///
///////////////////////////////////////////////

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/js'));


////////////////////////
///                  ///
/// mongoose schemas ///
///                  ///
////////////////////////

const User = require("./models/user");
const Post = require("./models/post");


/////////////////////
///               ///
/// setting views ///
///               ///
/////////////////////

app.set('view engine', 'html');
app.engine('html', twig.__express);
app.set('views','views');


//////////////////////////
///                    ///
/// connecting mongoDB ///
///                    ///
//////////////////////////

const mongourl = 'mongodb+srv://leoAdmin:Placeholder12_@cluster0.t6qcs.mongodb.net/newLook?retryWrites=true&w=majority';
mongoose.connect(mongourl, { useUnifiedTopology: true });


///////////////////////////////////
///                             ///
/// adding session and passport ///
///                             ///
///////////////////////////////////

app.use(require("express-session")({
    secret:"any normal word", 
    resave: false,             
    saveUninitialized:false    
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 
passport.use(new LocalStrategy(User.authenticate()));


//////////////////////////
///                    ///
/// adding body-parser ///
///                    ///
//////////////////////////

app.use(bodyParser.urlencoded({ extended:true }))
app.use(passport.initialize());
app.use(passport.session());


///////////////////////
///                 ///
/// Starting server ///
///                 ///
///////////////////////

const port = 3000;

app.listen(port ,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("Server Started At Port " + port);
    } 
})


///////////////////////
///                 ///
/// Rendering pages ///
///                 ///
///////////////////////

app.get('/', (req, res) => {
    res.render('home');
})


/////////////////////
///               ///
/// Post creation ///
///               ///
/////////////////////

app.post('/dashboard', (req, res) => {
    new Post({
        item_name:req.body.item_name,
        size:req.body.size,
        price:req.body.price,       
        description:req.body.description,
        photo:req.body.photo
    })
    .save()
    .then(result => {
        
        res.redirect('/dashboard');
    })
    .catch(err => {
        if (err) throw err;
    });
});


///////////////////////////
///                     ///
/// authenticate login  ///
///                     ///
///////////////////////////

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) 
                return next();
            res.redirect('/');     
}


///////////////////////////////////////////////////
///                                             ///
/// display all posts and checking if logged in ///
///                                             ///
///////////////////////////////////////////////////

app.get('/dashboard', isLoggedIn, (req, res) => {
    
    Post.find()
    .sort({createdAt: 'descending'})
    .then(result => {
        if(result){

            res.render('dashboard',{    
                allpost:result
            });
        }
    })
    .catch(err => {
        if (err) throw err;
    }); 
});


///////////////////////
///                 ///
/// delete function ///
///                 ///
///////////////////////

app.get('/delete/:id', (req, res) => {
    
    Post.findByIdAndDelete(req.params.id)
    
    .then(result => {
        res.redirect('/dashboard');
    })

    .catch(err => {
        console.log(err);
        res.redirect('/dashboard');
    })
});



////////////////////////////////
///                          ///
/// Comment on post function ///
///                          ///
////////////////////////////////

app.post('/comment/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(result => {
        if(result){
            const new_comment = " " + req.body.comment;
            Post.findByIdAndUpdate(req.params.id, { $push: { comment:new_comment } }, { returnOriginal: false}).exec();
            console.log(Post.comment);
        }
        else {
            console.log(err);
            res.redirect('/');
            
        }
    })
    .then(update => {
        res.redirect('/dashboard');
    })
    .catch(err => {
        res.redirect('/dashboard');
    });
});


/////////////////////////
///                   ///
/// register function ///
///                   ///
/////////////////////////

app.post("/",(req,res)=>{ 
    User.register(new User({            
    	username: req.body.username,
        email:req.body.email,
    	}),
    	req.body.password,function(err,user){
        if(err){
            console.log(err);
        }s
        passport.authenticate("local")(req,res,function(){ 
            console.log(req);
            res.redirect("/");
        })    
    })

});


///////////////////////
///                 ///
/// login functions ///
///                 ///
///////////////////////

app.post("/login", passport.authenticate("local",{
    successRedirect:"/dashboard",
    failureRedirect:"/"
}));

app.get("/logout",(req,res)=>{  // logout function
    req.logout();
    res.redirect("/");
});



/////////////////
///           ///
/// edit post ///
///           ///
/////////////////

app.get('/edit/:id', (req, res) => {

    Post.findById(req.params.id)
    .then(result => {
        if(result){
            res.render('edit',{
                post:result
            });
        }
        else{
            res.redirect('/');
        }
    })
    .catch(err => {
        res.redirect('/');
    });
});


///////////////////
///             ///
/// update post ///
///             ///
///////////////////

app.post('/edit/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(result => {
        if(result){
            result.item_name = req.body.item_name;
            result.size = req.body.size;
            result.price = req.body.price;
            result.description = req.body.description;
            result.photo = req.body.photo;
            return result.save();
        }
        else{
            console.log(err);
            res.redirect('/');
        }
    })
    .then(update => {
        res.redirect('/dashboard');
    })
    .catch(err => {
        res.redirect('/');
    });
});