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


