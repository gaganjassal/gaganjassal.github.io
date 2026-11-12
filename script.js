(function () {
  var root = document.documentElement;
  document.getElementById("theme").addEventListener("click", function () {
    var next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
  });
  document.getElementById("year").textContent = new Date().getFullYear();
})();
