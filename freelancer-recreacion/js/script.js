
// MENÚ RESPONSIVE
// ------------------------------------------------------------------------

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("open");
});


// CERRAR MENÚ AL SELECCIONAR 
//  -------------------------------------------------------------------------

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("open");
    });
});


// MARCAR SECCIÓN ACTIVA
//  ------------------------------------------------------------------------

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "inicio";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

/* 
ANIMACIÓN DE ACERCA DE MÍ
 --------------------------*/

const aboutContent = document.querySelector(".about-content");
const aboutImage = document.querySelector(".about-image");

const aboutObserver = new IntersectionObserver(
(entries) => {


    entries.forEach(entry => {

        if (entry.isIntersecting) {

            aboutContent.classList.add("show");

            setTimeout(() => {
                aboutImage.classList.add("show");
            }, 150);

        } else {

            aboutContent.classList.remove("show");
            aboutImage.classList.remove("show");

        }

    });

},
{
    threshold: 0.20
}


);

if (aboutContent && aboutImage) {
aboutObserver.observe(aboutContent);
}


// ANIMACIÓN DE FORMACIÓN ACADÉMICA
//  ------------------------------------------------------------------------

const timelineItems = document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    },
    {
        threshold: 0.15
    }
);

timelineItems.forEach((item) => {
    timelineObserver.observe(item);
});


// CARRUSEL DE LOGROS ACADÉMICOS 
//  ------------------------------------------------------------------------

const achievements = [
   
    { img: "assets/noveno.jpeg",  title: "Diploma de primer lugar por haber obtenido los puntajes más altos en noveno",  text: "En el Complejo Educativo Ofelia Herrera" },
    { img: "assets/primer.jpeg",  title: "Diploma de primer lugar por haber obtenido los puntajes más altos en primer año de bachillerato",  text: "En el Complejo Educativo Ofelia Herrera" },
    { img: "assets/cuerso.jpeg",  title: "Diploma de lectoescritura y matemáticas",  text: "Impartido por el Instituto de la Juventud INJUVE." },
    { img: "assets/valores.jpeg",  title: "Diploma de reconocimiento como estrella ¡Supérate! GRUPO Q 2024",  text: "Por destacado desempeño y acciones académicas en la materia de valores." },
    { img: "assets/medalla1.jpeg",  title: "Medalla de bronce en la competencia de tecnología del programa empresarial ¡Supérate! Expo Tech", text:"Por proyecto EmerTech"},
    { img: "assets/html.jpeg", title: "Certificado digital en el curso  de HTML", text: "De SoloLearn" },
    { img: "assets/css.jpeg", title: "Certificado digital en el curso  de CSS", text: "De SoloLearn" },
    { img: "assets/java.jpeg", title: "Certificado digital en el curso  de JavaScript", text: "De SoloLearn" },
    { img: "assets/excel1.jpeg", title: "Certificación Excel experto", text: "En Certiport" },
    { img: "assets/excel2.jpeg", title: "Certificación Excel asociado", text: "En Certiport" },
    { img: "assets/geminis.jpeg", title: "Certificación de Domina la AI con Geminis", text: "En Santander|Open Academy" },
    { img: "assets/redes.jpeg", title: "Certificado en Conceptos básicos de redes", text: "Por Networking Academy" },
    { img: "assets/kinderdiploma.jpeg",  title: "Diploma de primer lugar por excelencia académica en Kinder",  text: "En el Complejo Educativo Ofelia Herrera" },
    { img: "assets/preparatoria.jpeg",  title: "Diploma de segundo lugar en preparatoria",  text: "En el Complejo Educativo Ofelia Herrera" },
    { img: "assets/medalla2.jpeg",  title: "Medalla de honor al mérito en preparatoria",  text: "En el Complejo Educativo Ofelia Herrera" },
    { img: "assets/cuartogrado.jpeg",  title: "Diploma de tercer lugar por rendimiento académico en cuarto grado",  text: "En el Complejo Educativo Ofelia Herrera" }
    
    ];

const track = document.getElementById("carouselTrack");
const dotsContainer = document.getElementById("carouselDots");
const counter = document.getElementById("carouselCounter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const carouselSection = document.getElementById("achievementsCarousel");

let currentPage = 0;
let itemsPerView = 4;
let totalPages = 1;
let autoPlayInterval;
let slides = [];
let dots = [];

// Cuántas tarjetas se ven según el ancho de pantalla
function getItemsPerView() {
    if (window.innerWidth <= 760) return 1;
    if (window.innerWidth <= 1000) return 2;
    return 4;
}

// Generar las slides en el HTML 
function renderSlides() {
    track.innerHTML = achievements.map(item => `
        <div class="carousel-slide">
            <div class="slide-card">
                <div class="slide-image">
                    <img src="${item.img}" alt="${item.title}">
                </div>
                <div class="slide-info">
                    <h3>${item.title}</h3>
                    <p>${item.text}</p>
                </div>
            </div>
        </div>
    `).join("");

    slides = document.querySelectorAll(".carousel-slide");
}

// Generar un punto por cada Pagina
function renderDots() {
    totalPages = Math.ceil(achievements.length / itemsPerView);

    dotsContainer.innerHTML = Array.from({ length: totalPages }, (_, index) =>
        `<span class="dot" data-index="${index}"></span>`
    ).join("");

    dots = document.querySelectorAll(".dot");

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            goToPage(Number(dot.dataset.index));
            resetAutoPlay();
        });
    });
}

function updateCarousel() {
    const offset = currentPage * itemsPerView * (100 / itemsPerView);
    track.style.transform = `translateX(-${currentPage * 100}%)`;

    slides.forEach(slide => slide.classList.add("active"));

    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentPage);
    });

    counter.textContent = `${currentPage + 1} / ${totalPages}`;
}

function goToPage(index) {
    currentPage = (index + totalPages) % totalPages;
    updateCarousel();
}

function nextPage() {
    goToPage(currentPage + 1);
}

function prevPage() {
    goToPage(currentPage - 1);
}

function startAutoPlay() {
    autoPlayInterval = setInterval(nextPage, 5000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Recalcular si cambia el tamaño de pantalla 
function handleResize() {
    const newItemsPerView = getItemsPerView();

    if (newItemsPerView !== itemsPerView) {
        itemsPerView = newItemsPerView;
        currentPage = 0;
        renderDots();
        updateCarousel();
    }
}

const carouselObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                carouselSection.classList.add("show");
                startAutoPlay();
            } else {
                clearInterval(autoPlayInterval);
            }
        });
    },
    { threshold: 0.3 }
);

// Inicialización
if (track && dotsContainer) {
    itemsPerView = getItemsPerView();
    renderSlides();
    renderDots();
    updateCarousel();

    nextBtn.addEventListener("click", () => {
        nextPage();
        resetAutoPlay();
    });

    prevBtn.addEventListener("click", () => {
        prevPage();
        resetAutoPlay();
    });

    window.addEventListener("resize", handleResize);

    carouselObserver.observe(carouselSection);
}



// VOLUNTARIADO 
// ------------------------------------------------------------------------

const volunteers = [
    {
        img: "assets/voluntariado1.jpeg",
        title: "Asistencia Docente y Apoyo Académico",
        subtitle: "Complejo Educativo Ofelia Herrera- 2025-2026 ",
        text: "Realicé 150 horas de servicio social en el Complejo Educativo Ofelia Herrera, apoyando a la encargada de bachillerato y al director de la institución, ayudando con la supervisión de estudiantes, revisión de cuadernos y exámenes, y registro de notas. Esta experiencia fortaleció mi organización, atención al detalle y gestión del tiempo, además de valores como la paciencia, el respeto y la responsabilidad."
    },
    {
        img: "assets/voluntariado2.jpeg",
        title: "Iniciativa Comunitaria en Parque de Santa Emilia",
        subtitle: "Complejo Educativo Ofelia Herrera-2024 ",
        text: "En noveno grado participé con mis compañeros en una campaña de limpieza en el parque de Santa Emilia. Esta experiencia fortaleció mis habilidades de planificación, coordinación y trabajo en equipo, además de fomentar la iniciativa y responsabilidad social. El proyecto contribuyó a convertir el parque en un espacio más limpio, seguro y agradable para la comunidad."
    },
    {
        img: "assets/integracion1.jpeg",
        title: "Mantenimiento Ambiental y del centro educativo",
        subtitle: "Integración-2026",
        text: "Como parte del proyecto de Integración del Gobierno de El Salvador, realicé 21 horas de servicio comunitario enfocadas en el mantenimiento y limpieza del interior y los alrededores del Complejo Educativo Ofelia Herrera. Esta experiencia me permitió contribuir al cuidado de mi institución y generar un ambiente más limpio, ordenado y adecuado para el bienestar de la comunidad educativa."
    },
    {
        img: "assets/acolitos1.jpeg",
        title: "Liderazgo Comunitario y Formación Espiritual",
        subtitle: "Parroquia Sagrada Familia ",
        text: "En mi Parroquia la Sagrada Familia fui seleccionada como subcoordinadora de la comunidad de San José del grupo de acólitos, apoyando en la coordinación durante las celebraciones y en la formación de niños mediante temas educativos y espirituales. Esta experiencia fortaleció mi liderazgo, comunicación y expresión en público, con aporte principal en orientar y motivar a otros niños y jóvenes a participar con amor."
    }
];

const volunteerGrid = document.getElementById("volunteerGrid");

function renderVolunteers() {
    volunteerGrid.innerHTML = volunteers.map(item => `
        <div class="volunteer-card">

            <img src="${item.img}" alt="${item.title}">

            <div class="volunteer-title-bar">
                <h3>${item.title}</h3>
                <span>${item.subtitle}</span>
            </div>

            <span class="volunteer-close-hint">&times;</span>

            <div class="volunteer-overlay">
                <h3>${item.title}</h3>
                <span class="volunteer-overlay-subtitle">${item.subtitle}</span>
                <p>${item.text}</p>
            </div>

        </div>
    `).join("");

    const cards = document.querySelectorAll(".volunteer-card");

    cards.forEach(card => {
        
        card.addEventListener("click", () => {
            card.classList.toggle("active");
        });

        
        card.addEventListener("mouseenter", () => {
            card.classList.add("active");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("active");
        });
    });
}

// Animación de entrada/salida al hacer scroll
const volunteerObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            const card = entry.target;

            if (entry.isIntersecting) {
                card.classList.add("show");
            } else {
                card.classList.remove("show");
                card.classList.remove("active");
            }
        });
    },
    { threshold: 0.2 }
);

if (volunteerGrid) {
    renderVolunteers();

    document.querySelectorAll(".volunteer-card").forEach(card => {
        volunteerObserver.observe(card);
    });
}


// PORTAFOLIO 
// ------------------------------------------------------------------------

const projects = [
    {
        category: "tecnologico",
        title: "EmerTech",
        subtitle: "Aplicación de Primeros Auxilios",
        event: "Expo Tech 2026",
        img1: "assets/expo1.jpg",
        img2: "assets/expo2.jpeg",
        description: "Es una aplicación móvil orientada a guiar a los usuarios paso a paso sobre cómo actuar durante situaciones de emergencia médica, ayudando a mantener con vida a la persona afectada mientras acuden los servicios de salud correspondientes. Incluye un botón de SOS para llamadas de emergencia inmediatas, información sobre las diferentes instituciones de ayuda y salud, y un asistente de inteligencia artificial entrenado en situaciones de emergencia básica para responder dudas al instante.",
        role: "Investigadora de información verídica y coordinadora de equipo, liderando la organización general, la asignación de tareas, la gestión de la app y la comunicación del grupo para asegurar la entrega del proyecto en la Expo Tech."
    },
    {
        category: "tecnologico",
        title: "EduMotion",
        subtitle: "Experiencia Educativa Inmersiva en 3D",
        event: "Expo de Logros 2025",
        img1: "assets/logros3.jpg",
        img2: "assets/logro2.jpeg",
        description: "Son videos educativos diseñados para reproducirse y visualizarse a través de lentes 3D. El proyecto aborda tres ejes formativos clave: Inglés de Negocios (Business English), Lógica Informática y Valores, creados para ofrecer una forma dinámica e interactiva de aprendizaje.",
        role: "Coordinadora de equipo y desarrolladora de contenido. Estuve a cargo de la gestión del equipo de trabajo y de la creación del video enfocado en la enseñanza de Valores."
    },
    {
        category: "tecnologico",
        title: "Hangzone ",
        subtitle: "App de Navegación e Información",
        event: "Hackatón 2024",
        img1: "assets/proyecto1.jpeg",
        img2: "assets/proyecto2.jpeg",
        description: "Es una aplicación interactiva diseñada para facilitar a las personas la ubicación dentro del centro comercial Garden Mall, San Miguel, ya que posee todos los establecimientos del centro comercial como también información de ellos. Esto permite a los visitantes explorar las tiendas disponibles, descubrir puntos de interés y calcular rutas para saber exactamente dónde se encuentran y cómo llegar a su destino.",
        role: "Investigadora de información y diseñadora. Me encargué de investigar y verificar datos sobre los establecimientos del centro comercial y sus ubicaciones, y de ayudar a crear la interfaz visual de la app para que la experiencia del usuario fuera intuitiva."
    },
    {
        category: "personal",
        title: "Dibujo digital",
        subtitle: "Arte digital",
        event: "",
        img1: "assets/dibujo1.jpeg",
        img2: "assets/dibujo2.jpeg",
        description: "Utilizando herramientas tecnológicas de arte digital, creo dibujos como una forma de expresión donde puedo combinar mi atención al detalle, el color y la creatividad. Esta faceta artística se relaciona directamente con mi capacidad para diseñar interfaces web atractivas e intuitivas.",
        role: ""
    },
    {
        category: "personal",
        title: "Creación de poemas",
        subtitle: "Escritura",
        event: "",
        img1: "assets/poema1.jpeg",
        img2: "assets/poema2.jpeg",
        description: "Realizar esta actividad de escribir poesía me permite conectar con las emociones, ordenar mis ideas y transmitir mensajes. Para mí, este es un espacio de reflexión que fortalece mi comunicación por medio de letras y mi sensibilidad hacia las experiencias humanas que los demás y yo misma experimento.",
        role: ""
    },
    {
        category: "personal",
        title: "Recitar poesia",
        subtitle: "Expresión oral",
        event: "",
        img1: "assets/recitar2.jpeg",
        img2: "assets/recitar1.jpeg",
        description: "Relacionado con la creacion de poemas, me gusta expresar la poesía en voz alta, ya sea para mí misma o para un público, como se demuestra en las actividades en las que he participado, ya que me permite trabajar en la expresión emocional con la audiencia. Esta práctica fortalece mi seguridad al hablar en público y me ayuda a transmitir ideas con fuerza y claridad.",
        role: ""
    },
    {
        category: "personal",
        title: "Fotografía",
        subtitle: "Arte visual",
        event: "",
        img1: "assets/fotografia2.jpeg",
        img2: "assets/fotografia1.jpeg",
        description: "Como parte de mis intereses personales, he desarrollado habilidades en fotografía, aprendiendo a utilizar la cámara del celular, manejar la iluminación, cuidar el encuadre y capturar diferentes momentos y escenarios. Esta experiencia me ha permitido fortalecer mi creatividad, atención al detalle y capacidad de observación, además de encontrar en la fotografía una forma de expresar ideas, emociones y mi manera de apreciar el entorno.",
        role: ""
    }
];

const portfolioGrid = document.getElementById("portfolioGrid");
const portfolioFilters = document.getElementById("portfolioFilters");
const portfolioModal = document.getElementById("portfolioModal");
const portfolioModalBody = document.getElementById("portfolioModalBody");
const portfolioModalClose = document.getElementById("portfolioModalClose");
const portfolioModalOverlay = document.getElementById("portfolioModalOverlay");


function renderProjects() {
    portfolioGrid.innerHTML = projects.map((item, index) => `
        <div class="portfolio-card" data-category="${item.category}" data-index="${index}">
            <img src="${item.img1}" alt="${item.title}">
            <div class="portfolio-card-info">
                <span class="portfolio-tag ${item.category === "personal" ? "personal" : ""}">
                    ${item.category === "tecnologico" ? "Tecnológico" : "Personal"}
                </span>
                <h3>${item.title}</h3>
                ${item.event ? `<span class="event">${item.event}</span>` : ""}
            </div>
        </div>
    `).join("");

    document.querySelectorAll(".portfolio-card").forEach(card => {
        card.addEventListener("click", () => {
            openModal(Number(card.dataset.index));
        });

        portfolioObserver.observe(card);
    });
}

// Abre el modal con la información completa del proyecto
function openModal(index) {
    const item = projects[index];

    portfolioModalBody.innerHTML = `
        <div class="portfolio-modal-images">
            <img src="${item.img1}" alt="${item.title} - imagen 1">
            <img src="${item.img2}" alt="${item.title} - imagen 2">
        </div>

        <span class="portfolio-modal-tag ${item.category === "personal" ? "personal" : ""}">
            ${item.category === "tecnologico" ? "Tecnológico" : "Personal"}
        </span>

        <h3>${item.title}</h3>
        ${item.event ? `<span class="portfolio-modal-event">${item.subtitle} · ${item.event}</span>` : `<span class="portfolio-modal-event">${item.subtitle}</span>`}

        <span class="portfolio-modal-label">Descripción</span>
        <p>${item.description}</p>

        ${item.role ? `
            <span class="portfolio-modal-label">Mi rol</span>
            <p>${item.role}</p>
        ` : ""}
    `;

    portfolioModal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    portfolioModal.classList.remove("active");
    document.body.style.overflow = "";
}

portfolioModalClose.addEventListener("click", closeModal);
portfolioModalOverlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

// Filtros (Todos / Tecnológicos / Personales)
portfolioFilters.addEventListener("click", (e) => {
    if (!e.target.classList.contains("filter-btn")) return;

    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    const filter = e.target.dataset.filter;

    document.querySelectorAll(".portfolio-card").forEach(card => {
        const matches = filter === "todos" || card.dataset.category === filter;
        card.classList.toggle("hide", !matches);
    });
});

// Animación de entrada/salida al hacer scroll
const portfolioObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    },
    { threshold: 0.15 }
);

if (portfolioGrid) {
    renderProjects();
}


// ANIMACIÓN DE CURRICULUM 
//------------------------------------------------------------------------

const cvText = document.querySelector(".cv-text");
const cvImage = document.querySelector(".cv-image");

const cvObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                cvText.classList.add("show");

                setTimeout(() => {
                    cvImage.classList.add("show");
                }, 150);

            } else {

                cvText.classList.remove("show");
                cvImage.classList.remove("show");

            }
        });
    },
    { threshold: 0.2 }
);

if (cvText && cvImage) {
    cvObserver.observe(cvText);
}

const footerYear = document.getElementById("footerYear");
if (footerYear) footerYear.textContent = new Date().getFullYear();
