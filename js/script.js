console.log("hello");
$('.second-nav').hide();
 
$( document ).ready(function() {
   // console.log( "document loaded" );
$('.menu').click(function(){
   $('.second-nav').toggle();
})
});

$('.menu').click(function(){
    $('#banner-img').toggle();
    $('#latest-posts').toggle();
    $('#profile').toggle();
});

// leos js

///////////////////////
///                 ///
/// Selecting HTML  ///
///                 ///
///////////////////////

const modalBtn = document.querySelectorAll('.modal-btn');
const modal = document.querySelectorAll('.modal');
const closeBtn = document.querySelectorAll('.close-btn');


///////////////////////////
///                     ///
/// Open modal function ///
///                     ///
///////////////////////////

function cardModal() {
    for (var i = 0; i < modalBtn.length; i++) {
        modalBtn[i].addEventListener('click', function() {
            
            for (var i = 0; i < modal.length; i++) {
                
                if(this.id === modal[i].id) {
                    modal[i].classList.add('open');
            
                }  
            }
        
        })
    }
}

cardModal();


////////////////////////////
///                      ///
/// close modal function ///
///                      ///
////////////////////////////

function closeModal() {
    for(var i = 0; i < closeBtn.length; i++) {
        closeBtn[i].addEventListener('click', function(){
            for (var i = 0; i < modal.length; i++) {
                modal[i].classList.remove('open');
            }
        })
    }
}

closeModal()


/////////////////////////
///                   ///
/// fade in on scroll ///
///                   ///
/////////////////////////

const postSection = document.querySelector('#latest-posts');
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    })
},
appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
})


///////////////////////
///                 ///
/// Login Hide/Show ///
///                 ///
///////////////////////

const homePage = document.querySelector('.home-page');
const loginPage = document.querySelector('.login-page');
const registerPage = document.querySelector('.register-page');
const loginBtn = document.querySelector('.login-btn');
const registerBtn = document.querySelector('.register-btn');
const listBtn = document.querySelector('.listBtn');
const listModal= document.querySelector('.listModal');

$(loginPage).hide();
$(registerPage).hide();

$(loginBtn).click(function(){
    $(loginPage).show(300, 'swing');
    $(registerPage).hide(300, 'swing');
    $(homePage).hide(300, 'swing');
})

$(registerBtn).click(function(){
    $(registerPage).show(300, 'swing');
    $(loginPage).hide(300, 'swing');
    $(homePage).hide(300, 'swing');
})

$(listModal).hide();


$(listBtn).click(function(){
    $(listModal).show();
})