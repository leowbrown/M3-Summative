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