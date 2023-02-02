const btn = document.getElementById("show-more-btn");
  if (btn) {
    btn.addEventListener("click", function() {
      const moreCards = document.getElementById("more-cards");
      if (moreCards) {
        moreCards.classList.toggle("d-none");
        btn.innerText = moreCards.classList.contains("d-none") ? "Show More" : "Show Less";
        
        if (!moreCards.classList.contains("d-none")) {
          moreCards.style.display = "flex";
          moreCards.style.right = "-100%";

          requestAnimationFrame(function() {
            moreCards.style.right = "0";
            moreCards.style.opacity = "1";
          });
        } else {
          moreCards.style.opacity = "0";
          
          requestAnimationFrame(function() {
            moreCards.style.right = "-100%";

            setTimeout(function() {
              moreCards.style.display = "none";
            }, 500);
          });
        }
      }
    });
  }
// Typer Script

var typed = new Typed(".typer-animation", {
  strings: ["Jacky", "Jacky Liu 👋", "Jacky Liu 🦍"],
  typeSpeed: 150,
  backSpeed: 150,
  loop: true
})