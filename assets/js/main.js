
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.setAttribute('role', 'button')
        toggle.setAttribute('tabindex', '0')
        toggle.setAttribute('aria-label', 'Open menu')
        toggle.setAttribute('aria-controls', navId)
        toggle.setAttribute('aria-expanded', 'false')

        toggle.addEventListener('click', (e)=>{
            e.stopPropagation()
            setMenu(!nav.classList.contains('show'))
        })
        toggle.addEventListener('keydown', (e)=>{
            if(e.key === 'Enter' || e.key === ' '){
                e.preventDefault()
                setMenu(!nav.classList.contains('show'))
            }
        })
        // tap outside the menu, or press Escape, to close it
        document.addEventListener('click', (e)=>{
            if(nav.classList.contains('show') && !nav.contains(e.target)) setMenu(false)
        })
        document.addEventListener('keydown', (e)=>{
            if(e.key === 'Escape') setMenu(false)
        })
    }
}

// open/close the mobile menu and swap the hamburger icon for an X
function setMenu(open){
    const nav = document.getElementById('nav-menu'),
    toggle = document.getElementById('nav-toggle')
    if(!nav || !toggle) return
    nav.classList.toggle('show', open)
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    const icon = toggle.querySelector('i')
    if(icon){
        icon.classList.toggle('bx-menu', !open)
        icon.classList.toggle('bx-x', open)
    }
}
showMenu('nav-toggle','nav-menu')


const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    // When we click on each nav__link, close the menu
    setMenu(false)
}
navLink.forEach(n => n.addEventListener('click', linkAction))


const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

// Same slide-down + fade reveal, tuned to keep up with fast scrolling:
// shorter animations, reveal as soon as an element peeks into view,
// and a small stagger per section instead of one long page-wide chain.
const sr = ScrollReveal({
    origin: 'top',
    distance: '40px',
    duration: 800,
    delay: 0,
    easing: 'cubic-bezier(.2, .7, .2, 1)',
    viewFactor: 0.05,
    mobile: true,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {delay: 100});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', {delay: 200});
sr.reveal('.home__social-icon', {interval: 80});
sr.reveal('.about__highlights span', {interval: 60});
sr.reveal('.experience__item', {interval: 80});
sr.reveal('.skills__category', {interval: 60});
sr.reveal('.skills__data', {interval: 40});
sr.reveal('.work__img', {interval: 70});
sr.reveal('.contact__input', {interval: 60});
