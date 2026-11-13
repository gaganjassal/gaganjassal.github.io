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

(function () {
  var group = document.querySelector(".tl-group[data-start]");
  if (!group) return;
  var parts = group.dataset.start.split("-");
  var now = new Date();
  var months = (now.getFullYear() - Number(parts[0])) * 12 + (now.getMonth() + 1 - Number(parts[1])) + 1;
  if (months < 1) return;
  var y = Math.floor(months / 12);
  var m = months % 12;
  var text = [];
  if (y) text.push(y + (y === 1 ? " yr" : " yrs"));
  if (m) text.push(m + (m === 1 ? " mo" : " mos"));
  group.querySelector(".tenure").textContent = text.join(" ");
})();
