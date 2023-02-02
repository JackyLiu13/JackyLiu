
const navBarHeight = $("#navbar").height();
$(document).ready(function() {
  $(window).scroll(function() {

    // if the top of the screen is above skills but lower than the top of the window
    //if the top of the screen is within the skills

    if ($(window).scrollTop() <= 10) {
      $(".navbar").attr("id", "halfBar");
    }
    else {
      $(".navbar").attr("id", "fullBar");

    }

  });
});