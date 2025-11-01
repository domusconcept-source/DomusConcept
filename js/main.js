// ================================
// LISTA FILLESTARE E PRONAVE
// ================================
const properties = [
    {
        id: 1,
        title: "Tokë bujqësore në Gjakovë",
        price: "25,000 €",
        city: "Gjakovë",
        images: ["images/toka1.jpg"],
        description: "10 ari, afër rrugës kryesore."
    },
    {
        id: 2,
        title: "Parcelë ndërtimore në Pejë",
        price: "40,000 €",
        city: "Pejë",
        images: ["images/toka2.jpg"],
        description: "7 ari, me leje ndërtimi."
    },
    {
        id: 3,
        title: "Parcelë ndërtimore në Prishtinë",
        price: "60,000 €",
        city: "Prishtinë",
        images: ["images/toka3.jpg"],
        description: "2 hekter, me leje ndërtimi, 15KM larg rrethit me flamur."
    },
    {
        id: 4,
        title: "Parcelë ndërtimore në Malishevë",
        price: "10,000 €",
        city: "Malishevë",
        images: ["images/toka4.jpg"],
        description: "10 ari, me leje ndërtimi."
    }
];

// ================================
// FUNKSIONI QË NGARKON PRONAT
// ================================
function loadProperties(city = "") {
    const list = document.getElementById('property-list');
    if (!list) return;

    // Merr pronat nga localStorage ose nga lista fillestare
    const stored = localStorage.getItem('domusProperties');
    const allProps = stored ? JSON.parse(stored) : properties;

    // Filtro sipas qytetit nëse është zgjedhur
    const filteredProps = city ? allProps.filter(p => p.city === city) : allProps;

    // Pastro listën para se të shtosh pronat
    list.innerHTML = '';

    // Shto çdo pronë si “card”
    filteredProps.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'property-card card';
        card.innerHTML = `
            ${prop.images.map(img => `<img src="${img}" alt="${prop.title}">`).join('')}
            <h3 class="card_title">${prop.title}</h3>
            <p>${prop.description}</p>
            <p><strong>${prop.price}</strong></p>
            <p><em>Qyteti: ${prop.city}</em></p>
        `;
        list.appendChild(card);
    });
}

// ================================
// FILTRIMI SIPAS QYTETIT
// ================================
const cityFilter = document.getElementById('city-filter');
if (cityFilter) {
    cityFilter.addEventListener('change', () => loadProperties(cityFilter.value));
}

// ================================
// SLIDER HERO (ndërron fotot automatikisht)
// ================================
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

if (slides.length > 0) {
    slides[currentSlide].classList.add('active');
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

// ================================
// NGARKO PRONAT KUR HAPET FAQJA
// ================================
document.addEventListener('DOMContentLoaded', () => {
    loadProperties();
});
