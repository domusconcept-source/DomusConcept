// ================================
// LISTA FILLESTARE E PRONAVE
// ================================
const properties = [
    {
        id: 1,
        title: "93 Ari ne Suhadoll",
        price: "",
        city: "Lipjan",
        village: "Suhadoll",
        images: ["images/93arisuhadoll.jfif"],
        description: "Fletat poseduese te gateshme per ju."
    },
    {
        id: 2,
        title: "50 Ari ne Konjuh",
        price: "",
        city: "Lipjan",
        village: "Konjuh",
        images: ["images/50arikonjuh.jfif"],
        description: "Fletat poseduese te gateshme per ju."
    }
];

// ================================
// FUNKSIONI QË NGARKON PRONAT
// ================================
function loadProperties() {
    const list = document.getElementById('property-list');
    if (!list) return;

    const stored = localStorage.getItem('domusProperties');
    const allProps = stored ? JSON.parse(stored) : properties;

    const cityFilter = document.getElementById('city-filter');
    const searchInput = document.getElementById('search-input');

    const city = cityFilter ? cityFilter.value : "";
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";

    const filteredProps = allProps.filter(p => {
        // Filtrimi sipas qytetit
        const matchesCity = city ? (p.city === city) : true;

        // Filtrimi sipas search term (titull, description, qytet, fshat)
        const matchesSearch = searchTerm ? (
            p.title.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm) ||
            p.city.toLowerCase().includes(searchTerm) ||
            (p.village && p.village.toLowerCase().includes(searchTerm))
        ) : true;

        return matchesCity && matchesSearch;
    });

    // Pastro listën dhe shto pronat e filtruar
    list.innerHTML = '';

    filteredProps.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'property-card card';
        card.innerHTML = `
            ${prop.images.map(img => `<img src="${img}" alt="${prop.title}">`).join('')}
            <h3 class="card_title">${prop.title}</h3>
            <p>${prop.description}</p>
            <p><strong>${prop.price}</strong></p>
            <p><em>Qyteti: ${prop.city}</em></p>
            ${prop.village ? `<p><em>Fshati: ${prop.village}</em></p>` : ''}
        `;
        list.appendChild(card);
    });
}

// ================================
// SLIDER HERO
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
// EVENT LISTENER PËR FILTER DHE SEARCH
// ================================
const cityFilter = document.getElementById('city-filter');
const searchInput = document.getElementById('search-input');

if (cityFilter) cityFilter.addEventListener('change', loadProperties);
if (searchInput) searchInput.addEventListener('input', loadProperties);

// ================================
// NGARKO PRONAT KUR HAPET FAQJA
// ================================
document.addEventListener('DOMContentLoaded', () => {
    loadProperties();
});
