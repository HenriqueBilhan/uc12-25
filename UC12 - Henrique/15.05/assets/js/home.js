
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

 
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const estaAberto = item.classList.contains('ativo');

       
        navItems.forEach(i => i.classList.remove('ativo'));

        
        if (!estaAberto) item.classList.add('ativo');

        e.stopPropagation();
      });
    });

    
    document.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('ativo'));
    });

    
    const btnMenu = document.getElementById('btn-menu');
    const navMenu = document.getElementById('nav-menu');
    const iconMenu = btnMenu.querySelector('i');

    btnMenu.addEventListener('click', () => {
      navMenu.classList.toggle('open');

      if (navMenu.classList.contains('open')) {
        iconMenu.classList.replace('fa-bars', 'fa-xmark');
      } else {
        iconMenu.classList.replace('fa-xmark', 'fa-bars');
      }
    });

    const filhos = document.querySelectorAll('.container-filho');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visivel');
        }
      });
    }, { threshold: 0.2 }); 

    filhos.forEach(filho => observer.observe(filho));
 