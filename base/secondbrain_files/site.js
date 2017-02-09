$(document).ready (function() {

  var height = $(window).height();
  var width = $(window).width();


  // MOBILE JS
  function isMobile() {
    if(window.innerWidth <= 700 || screen.width <= 1024) {
     return true;
    } else {
     return false;
    }
  }


  // HEADER HIDE
  var headerHidden = $('.header-hidden');
  var header = $('.header');
  var whenToHide = (header.offset().top + header.height())/2;

  $(window).scroll(function () {
    var offset = headerHidden.offset();
    if (isMobile() == false) {
      if (offset.top <= whenToHide) {
        headerHidden.slideUp();
      } else {
        headerHidden.slideDown();
      };
    };
  });


  // EXPANDER ANIMATE
  $(window).scroll( function(){
    $('.sheet').each( function(i){
      bttm_of_object = $(this).offset().top + $(this).outerHeight();
      bttm_of_window = $(window).scrollTop() + $(window).height() + 1000;
      if( bttm_of_window > bttm_of_object ){
        $(this).css({'opacity':'1','top':'0px'},800);
      } else {
        $(this).css({'opacity':'0','top':'220px'},800);
      }
    });
  });

  $(window).scroll(function() {
     if($(window).scrollTop() > 500){
      $('.backgrd').css({'transform': 'scale(1.2)'});
     }else{
      $('.backgrd').css({'transform': 'scale(1)'});
     }
  });


  // JOIN US FADE
  $(window).scroll(function(){
    $('.darken').each( function(i){
      if (isMobile() == false) {
        bttm_of_object = $(this).offset().top + $(this).outerHeight();
        bttm_of_window = $(window).scrollTop() + $(window).height() + 700;
      } else {
        bttm_of_object = $(this).offset().top + $(this).outerHeight();
        bttm_of_window = $(window).scrollTop() + $(window).height() + 320;
      }
      if( bttm_of_window > bttm_of_object ){
        $(this).css({'opacity':'1'},200);
      }
    });
  });


  // JOIN US BUTTON CLICK
  $(".join, .close").click(function(){
    $(".listings").slideToggle();
    $(".secC-cont").css({'background':'rgba(0,0,0,0.9)'}, 300);
    $(".close").fadeToggle();
    $(".all-pos").fadeToggle();
    var position = $(window).scrollTop();  //your current position position on the page
    $("html, body").animate({ scrollTop: (position + 500) + "px" });
  });

  $(window).scroll( function(){
    $('.secC').each( function(i){
      if($(window).scrollTop() < $(this).offset().top - 200) {
        $(".listings").css({'display':'none'});
        $(".secC-cont").css({'background':'rgba(0,0,0,0.7)'});
        $(".close").css({'display':'none'});
        $(".all-pos").css({'display':'none'});
      }
    });
  });

  // LEADERSHIP SECTION
  $( window ).resize(function() {
    resizePeople();
  });

  function resizePeople() {
    var first = $('.people-cont').first().width()
    var last = $('.people-cont').last().width()
    if (last > (first + 5)) {
      $('#rishniw').css('width', first);
      $('.blurb').last().css({
        'width': '65%',
        'float': 'right',
        'padding': '35px 20px 20px 20px'
      });
    } else {
      $('#rishniw').css('width', '100%');
      $('.blurb').last().css({
        'width': '100%',
        'padding': '20px'
    });
    }
  }
  resizePeople();

  // PRIVACY POLICY & TERMS + SURVEY FORM

  function close() {
    $('.grayed, .m-privacy, .m-terms, .surveyForm').css('display', 'none');
    $('body').css('overflow-y', 'auto');
  };

  function surveyForm() {
    $('.grayed, .surveyForm').fadeToggle();
    $('body').css('overflow-y', 'hidden');
    $('.modal').trigger('click');
  };

  $('#surveyForm, #surveyForm2').click(function(e){
    if (isMobile() == false) {
      e.preventDefault();
      surveyForm();
    }
  });

  function privacy() {
    $('.grayed, .m-privacy').fadeToggle();
    $('body').css('overflow-y', 'hidden');
    $('.modal').trigger('click');
  };

  function terms() {
    $('.grayed, .m-terms').fadeToggle();
    $('body').css('overflow-y', 'hidden');
    $('.modal').trigger('click');
  };

  $('.m-privacy, .m-terms').click(function(e){
    e.stopPropagation();
    $('.grayed, .m-close').click(function(){
      close();
    });
  });
  $('#privacy').click(function(e){
    e.preventDefault();
    privacy();
  });
  $('#terms').click(function(e){
    e.preventDefault();
    terms();
  });

  $('.jump-terms').click(function(e){
    e.preventDefault();
    close();
    terms();
  });

  $('.jump-privacy').click(function(e){
    e.preventDefault();
    close();
    privacy();
  });

});


// SMOOTH ANCHOR TAG

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});


// RECRUITER BOX AJAX CALL
var postings

$.ajax({
  url: 'https://api.lever.co/v0/postings/secondbrain.com/?mode=json',
  success: function(response) {
    postings = response;
    dataObject();
  }
});


function dataObject() {
  var jobArray = postings;
  var availStr = "<ul class='avail-pos'>";
  for (i = 0; i < jobArray.length; i++) {
    availStr = availStr + "<li><a href='#pos" + i + "'>" + jobArray[i].text + "</a></li>";
  }
  availStr = availStr + "</ul>";

  $('.posting-cont').append(
        "<div class='hide col span-1-t span-3-d empty debug'>kitty</div>" +
        "<div class='posting-opening span-10-t span-6-d debug' id='all-jobs'><h2>" +
        "Available Positions" +
        "</h2><p>" +
        "We are rapidly expanding to bring in new engineers to help us scale our global internet analysis " +
        "platform, with an emphasis on full-stack developers, data engineers, UI/UX engineers, DevOps engineers, " +
        "and anyone with deep professional experience in analyzing rare protocols and other kinds of device " +
        "communications." +
        "</p><p>" +
        "At secondbrain, you\'ll work with a talented team of software engineers and algorithms experts from " +
        "research groups at Stanford, Caltech, and MIT. We also draw on a deep pool of experience at top " +
        "Internet companies, algorithmic trading groups, and national security bureaucracies." +
        "</p>" + availStr + "</div>" +
        "<div class='col span-1-t span-3-d empty debug'>kitty</div>"
    );


  var listOfItems = []
  for (i = 0; i < jobArray.length; i++) {

    for (k = 0; k < jobArray[i].lists.length; k++) {
      listOfItems.push(
        "<p class='sub-header'>" +
        jobArray[i].lists[k].text + "</p><ul>" +
        jobArray[i].lists[k].content + "</ul>"
      )
    }

  $('.posting-cont').append(
    "<div class='job row' id='pos" + i + "'>" +
    "<div class='col span-1-t span-3-d empty debug'>kitty</div>" +
      "<div class='job-inner span-10-t span-6-d debug'>" +
        "<div class='title job-title'>" +
            jobArray[i].text +
        "</div>" +
        "<div class='location'>" +
            jobArray[i].categories.location +
        "</div>" +
        "<div class='description'><p>" +
            jobArray[i].descriptionPlain + "</p><p>" +
            jobArray[i].additionalPlain +
            listOfItems.join("").toString() +
        "</p></div>" +
        "<div class='btn-cont-apply'><a href=" +
        jobArray[i].applyUrl +
        " target='_blank'><div class='gen-button apply'>" +

        // THIS IS TO SEND EMAIL TO secondbrain AS AN APPLICANT
        // "<div class='btn-cont-apply'><a href='mailto:careers@secondbrain.com?Subject=Hire%20Me%20as%20a%20" +
        // jobArray[i].title + "!' target='_top'><div class='gen-button apply'>" +

            "Apply" +
         "</div></div></a></div>" +
         "<div class='col span-1-t span-3-d empty debug'>kitty</div>" +
     "</div>"
    );
  listOfItems = [];
  }
}