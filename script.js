document.addEventListener('DOMContentLoaded', function () {
	const toggle = document.querySelector('.nav-toggle');
	const navLinks = document.querySelector('.nav-links');
	if (toggle && navLinks) {
		toggle.addEventListener('click', function () {
			navLinks.classList.toggle('open');
		});
	}

	// highlight active link (simple): mark link whose href matches current file name
	const links = document.querySelectorAll('.nav-links a');
	const current = location.pathname.split('/').pop() || 'Dashboard.html';
	links.forEach(a => {
		const hrefFile = (a.getAttribute('href') || '').split('/').pop();
		if (hrefFile && hrefFile === current) {
			a.classList.add('active');
		}
		a.addEventListener('click', () => {
			links.forEach(x => x.classList.remove('active'));
			a.classList.add('active');
			// close menu on small screens
			if (navLinks.classList.contains('open')) navLinks.classList.remove('open');
		});
	});
});

