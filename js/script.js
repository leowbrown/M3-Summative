console.log("hello");
 
$('.second-nav').hide();
 
$( document ).ready(function() {
   // console.log( "document loaded" );
$('.menu').click(function(){
   $('.second-nav').toggle();
})
});

$('.menu').click(function(){
    $('#latest-posts').toggle();
});
