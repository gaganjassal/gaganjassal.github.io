(function () {
  var root = document.documentElement;

  document.getElementById("theme").addEventListener("click", function () {
    var next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
  });

  document.querySelectorAll(".tl-head").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement;
      var open = item.dataset.open === "true";
      item.dataset.open = String(!open);
      btn.setAttribute("aria-expanded", String(!open));
    });
  });

  var targets = document.querySelectorAll(".tl-item, .card, .skills > div, .cert");
  targets.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("in"); });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
