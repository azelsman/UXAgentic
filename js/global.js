// Load header, content, and footer from separate files
function loadSection(url, elementId, errorMsg, callback) {
  fetch(url)
    .then(r => {
      if (!r.ok) throw new Error(`Failed to load ${url}`);
      return r.text();
    })
    .then(t => {
      document.getElementById(elementId).innerHTML = t;
      if (callback) callback();
    })
    .catch(e => document.getElementById(elementId).innerHTML = errorMsg);
}

// Load reusable components
loadSection('header.html', 'header', '<div class="error">Header failed to load.</div>');
// Load footer and then run footer-specific initialization (year, breadcrumb)
loadSection('footer.html', 'footer', '<div class="error">Footer failed to load.</div>', function() {
  // Insert current year into footer after it's been injected
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Optional: update breadcrumb current item if present in the injected footer
  var current = document.getElementById("breadcrumb-current");
  if (current) {
    var pageName = document.title || '';
    var pageUrl = window.location.href || '';
    var nameEl = current.querySelector('[itemprop="name"]');
    var itemEl = current.querySelector('[itemprop="item"]');
    if (nameEl) nameEl.textContent = pageName;
    if (itemEl) itemEl.setAttribute('content', pageUrl);
  }
});


// Note: year insertion moved to footer callback because footer is loaded via fetch
