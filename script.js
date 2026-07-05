document.addEventListener('DOMContentLoaded', function () {
	var menuPrincipal = document.getElementById('menuPrincipal');
	var boutonHamburger = document.getElementById('boutonHamburger');
	var menuOverlay = document.getElementById('menuOverlay');
	var menuFermer = document.getElementById('menuFermer');

	function ouvrirMenu() {
		if (menuPrincipal) menuPrincipal.classList.add('menu-ouvert');
		if (menuOverlay) menuOverlay.classList.add('visible');
		document.body.classList.add('menu-mobile-ouvert');
		if (boutonHamburger) boutonHamburger.setAttribute('aria-expanded', 'true');
	}

	function fermerMenu() {
		if (menuPrincipal) menuPrincipal.classList.remove('menu-ouvert');
		if (menuOverlay) menuOverlay.classList.remove('visible');
		document.body.classList.remove('menu-mobile-ouvert');
		if (boutonHamburger) boutonHamburger.setAttribute('aria-expanded', 'false');
	}

	if (boutonHamburger) {
		boutonHamburger.addEventListener('click', function () {
			var ouvert = boutonHamburger.getAttribute('aria-expanded') === 'true';
			if (ouvert) {
				fermerMenu();
			} else {
				ouvrirMenu();
			}
		});
	}

	if (menuOverlay) menuOverlay.addEventListener('click', fermerMenu);
	if (menuFermer) menuFermer.addEventListener('click', fermerMenu);

	// Fermer le menu quand on clique sur un lien (mobile)
	if (menuPrincipal) {
		var liens = menuPrincipal.querySelectorAll('a.lien-menu, .menu-item-cta-mobile a');
		liens.forEach(function (l) {
			l.addEventListener('click', function () {
				// seul utile en mode mobile, mais sans effet en desktop
				fermerMenu();
			});
		});
	}

	// Échap pour fermer
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') fermerMenu();
	});
});
