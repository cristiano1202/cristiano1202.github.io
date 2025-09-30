(function () {
  const STORAGE_KEY = 'pref-theme';
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      btn?.setAttribute('aria-pressed', 'true');
    } else if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      btn?.setAttribute('aria-pressed', 'false');
    } else {
      root.removeAttribute('data-theme');
      btn?.setAttribute('aria-pressed', 'false');
    }
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  applyTheme(saved);

  btn?.addEventListener('click', () => {
    const cur = root.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  btn?.addEventListener('dblclick', () => {
    localStorage.removeItem(STORAGE_KEY);
    applyTheme(null);
    btn.textContent = 'Tema (auto)';
    setTimeout(() => (btn.textContent = 'Alternar tema'), 800);
  });
})();

(function () {
  const links = [...document.querySelectorAll('.snav a[href^="#"]')];
  const sections = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const byTop = () => {
    const y = window.scrollY + 100;
    let current = sections[0]?.id;
    for (const sec of sections) {
      if (sec.offsetTop <= y) current = sec.id;
    }
    links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${current}`));
  };

  window.addEventListener('scroll', byTop, { passive: true });
  byTop();
})();