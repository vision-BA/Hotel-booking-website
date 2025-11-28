// Small include loader: finds elements with data-include and loads the file into them
document.addEventListener('DOMContentLoaded', () => {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(async el => {
    const url = el.getAttribute('data-include');
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch ' + url);
      const text = await res.text();
      el.outerHTML = text;
    } catch (err) {
      console.error(err);
    }
  });
});
