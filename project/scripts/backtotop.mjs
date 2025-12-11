if (window.innerWidth <= 768) { 
  const backToTop = document.createElement("button");
  backToTop.id = "backToTop";
  backToTop.textContent = "↑";
  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 200 ? "block" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
