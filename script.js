/* =========================================================================
   DARREN SERVICE Sarl — Script principal (JavaScript Vanilla)
   Aucune dépendance externe. Toutes les variables sont nommées en français.
   ========================================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. En-tête collant (sticky) au défilement ---------- */
  const enTete = document.getElementById('enTete');
  function gererDefilementEnTete() {
    if (window.scrollY > 40) {
      enTete.classList.add('en-tete-scroll');
    } else {
      enTete.classList.remove('en-tete-scroll');
    }
  }
  gererDefilementEnTete();
  window.addEventListener('scroll', gererDefilementEnTete, { passive: true });

  /* ---------- 2. Menu hamburger (mobile) ---------- */
  const boutonHamburger = document.getElementById('boutonHamburger');
  const menuPrincipal = document.getElementById('menuPrincipal');
  const menuOverlay = document.getElementById('menuOverlay');

  function fermerMenuMobile() {
    menuPrincipal.classList.remove('menu-ouvert');
    menuOverlay.classList.remove('visible');
    document.body.classList.remove('menu-mobile-ouvert');
    boutonHamburger.setAttribute('aria-expanded', 'false');
  }

  function ouvrirMenuMobile() {
    menuPrincipal.classList.add('menu-ouvert');
    menuOverlay.classList.add('visible');
    document.body.classList.add('menu-mobile-ouvert');
    boutonHamburger.setAttribute('aria-expanded', 'true');
  }

  boutonHamburger.addEventListener('click', function () {
    const estOuvert = menuPrincipal.classList.contains('menu-ouvert');
    if (estOuvert) {
      fermerMenuMobile();
    } else {
      ouvrirMenuMobile();
    }
  });

  const menuFermer = document.getElementById('menuFermer');
  if (menuFermer) {
    menuFermer.addEventListener('click', fermerMenuMobile);
  }

  menuOverlay.addEventListener('click', fermerMenuMobile);

  document.addEventListener('keydown', function (evenement) {
    if (evenement.key === 'Escape') {
      fermerMenuMobile();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) {
      fermerMenuMobile();
    }
  });

  // Ferme le menu mobile après le clic sur un lien
  document.querySelectorAll('.lien-menu').forEach(function (lien) {
    lien.addEventListener('click', fermerMenuMobile);
  });

  /* ---------- 3. Défilement doux vers les ancres ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (lien) {
    lien.addEventListener('click', function (evenement) {
      const cible = document.querySelector(lien.getAttribute('href'));
      if (cible) {
        evenement.preventDefault();
        const decalageEnTete = 90;
        const position = cible.getBoundingClientRect().top + window.scrollY - decalageEnTete;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
    });
  });

  /* ---------- 4. Animations au défilement (Intersection Observer) ---------- */
  const elementsAnimes = document.querySelectorAll('.reveal');
  const observateurDefilement = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (entree) {
      if (entree.isIntersecting) {
        entree.target.classList.add('reveal-visible');
        observateurDefilement.unobserve(entree.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  elementsAnimes.forEach(function (element) {
    observateurDefilement.observe(element);
  });

  /* ---------- 5. Compteurs animés (statistiques du héro) ---------- */
  const compteurs = document.querySelectorAll('.statistique-chiffre');
  let compteursDejaLances = false;

  function lancerCompteurs() {
    if (compteursDejaLances) return;
    compteursDejaLances = true;

    compteurs.forEach(function (compteur) {
      const valeurFinale = parseInt(compteur.getAttribute('data-compte'), 10);
      const dureeAnimation = 1600;
      const tempsDepart = performance.now();

      function animerCompteur(tempsActuel) {
        const progression = Math.min((tempsActuel - tempsDepart) / dureeAnimation, 1);
        const progressionAdoucie = 1 - Math.pow(1 - progression, 3);
        compteur.textContent = Math.floor(progressionAdoucie * valeurFinale);
        if (progression < 1) {
          requestAnimationFrame(animerCompteur);
        } else {
          compteur.textContent = valeurFinale;
        }
      }
      requestAnimationFrame(animerCompteur);
    });
  }

  const zoneStatistiques = document.getElementById('statistiques');
  if (zoneStatistiques) {
    const observateurStatistiques = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (entree.isIntersecting) {
          lancerCompteurs();
          observateurStatistiques.unobserve(entree.target);
        }
      });
    }, { threshold: 0.4 });
    observateurStatistiques.observe(zoneStatistiques);
  }

  /* ---------- 6. Accordéon FAQ ---------- */
  const questionsAccordeon = document.querySelectorAll('.accordeon-question');
  questionsAccordeon.forEach(function (question) {
    question.addEventListener('click', function () {
      const reponse = question.nextElementSibling;
      const estOuverte = question.getAttribute('aria-expanded') === 'true';

      // Ferme les autres réponses ouvertes (accordéon exclusif)
      questionsAccordeon.forEach(function (autreQuestion) {
        if (autreQuestion !== question) {
          autreQuestion.setAttribute('aria-expanded', 'false');
          autreQuestion.nextElementSibling.style.maxHeight = null;
        }
      });

      if (estOuverte) {
        question.setAttribute('aria-expanded', 'false');
        reponse.style.maxHeight = null;
      } else {
        question.setAttribute('aria-expanded', 'true');
        reponse.style.maxHeight = reponse.scrollHeight + 'px';
      }
    });
  });

  /* ---------- 7. Bouton retour en haut ---------- */
  const boutonRetourHaut = document.getElementById('boutonRetourHaut');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      boutonRetourHaut.classList.add('visible');
    } else {
      boutonRetourHaut.classList.remove('visible');
    }
  }, { passive: true });

  boutonRetourHaut.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 8. Formulaire de contact ---------- */
  const formulaireContact = document.getElementById('formulaireContact');
  const formulaireMessage = document.getElementById('formulaireMessage');

  formulaireContact.addEventListener('submit', function (evenement) {
    evenement.preventDefault();

    const nom = document.getElementById('champNom').value.trim();
    const email = document.getElementById('champEmail').value.trim();
    const message = document.getElementById('champMessage').value.trim();

    if (!nom || !email || !message) {
      formulaireMessage.textContent = 'Merci de renseigner au minimum votre nom, votre email et votre message.';
      formulaireMessage.classList.remove('succes');
      return;
    }

    // Simulation d'envoi : à remplacer par un véritable appel API / service d'emailing.
    formulaireMessage.textContent = 'Merci ' + nom + ', votre message a bien été enregistré. Nous vous recontacterons rapidement.';
    formulaireMessage.classList.add('succes');
    formulaireContact.reset();
  });

  /* ---------- 9. Année dynamique dans le pied de page ---------- */
  const anneeCourante = document.getElementById('anneeCourante');
  if (anneeCourante) {
    anneeCourante.textContent = new Date().getFullYear();
  }

});

