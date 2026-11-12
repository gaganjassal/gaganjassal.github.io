(function () {
  var root = document.documentElement;
  document.getElementById("theme").addEventListener("click", function () {
    var next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
  });
  document.getElementById("year").textContent = new Date().getFullYear();
})();

(function () {
  var btn = document.getElementById("copy-email");
  if (!btn) return;
  var label = btn.textContent;
  function done() {
    btn.textContent = "Copied";
    setTimeout(function () { btn.textContent = label; }, 1800);
  }
  function fallback(email) {
    var t = document.createElement("textarea");
    t.value = email;
    t.setAttribute("readonly", "");
    t.style.position = "absolute";
    t.style.left = "-9999px";
    document.body.appendChild(t);
    t.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(t);
    if (ok) { done(); } else { window.prompt("Copy this email address:", email); }
  }
  btn.addEventListener("click", function () {
    var email = btn.dataset.email;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(done, function () { fallback(email); });
    } else {
      fallback(email);
    }
  });
})();
