/*==========================================================
                    LOADER
==========================================================*/

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }, 1200);
    }
});


/*==========================================================
                    AOS INITIALIZATION
==========================================================*/

if (typeof AOS !== "undefined") {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}


/*==========================================================
                    TYPING EFFECT
==========================================================*/

const roles = [
    "Data Analyst",
    "Power BI Developer",
    "Business Intelligence Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;

const rotatingText = document.querySelector(".rotating-text");

const typingSpeed = 90;
const eraseSpeed = 50;
const delay = 1800;

function typeRole() {
    if (!rotatingText) return;

    if (charIndex < roles[roleIndex].length) {
        rotatingText.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeRole, typingSpeed);
    } else {
        setTimeout(eraseRole, delay);
    }
}

function eraseRole() {
    if (charIndex > 0) {
        rotatingText.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseRole, eraseSpeed);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 400);
    }
}

window.addEventListener("load", () => {
    if (rotatingText) {
        typeRole();
    }
});


/*==========================================================
                HERO FADE ANIMATION
==========================================================*/

window.addEventListener("load", () => {
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
        heroContent.style.opacity = "1";
        heroContent.style.transform = "translateY(0)";
    }
});


/*==========================================================
                HERO IMAGE HOVER
==========================================================*/

const heroImage = document.querySelector(".hero-image");

if (heroImage) {
    heroImage.addEventListener("mousemove", (e) => {
        const rect = heroImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = (x - rect.width / 2) / 25;
        const rotateX = -(y - rect.height / 2) / 25;

        heroImage.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    });

    heroImage.addEventListener("mouseleave", () => {
        heroImage.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
}


/*==========================================================
            FLOATING ICON PARALLAX
==========================================================*/

const floatingIcons = document.querySelectorAll(".floating-icon");

document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    floatingIcons.forEach((icon, index) => {
        const speed = (index + 1) * 8;
        icon.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});


/*==========================================================
                ACTIVE NAV LINKS
==========================================================*/

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 180;
        const height = section.clientHeight;

        if (window.scrollY >= top && window.scrollY < top + height) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


/*==========================================================
                SMOOTH SCROLL
==========================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: "smooth"
            });
        }
    });
});


/*==========================================================
                MOBILE MENU
==========================================================*/

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-links");

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("show");
        menuBtn.classList.toggle("open");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("show");
            menuBtn.classList.remove("open");
        });
    });
}


/*==========================================================
                SCROLL INDICATOR
==========================================================*/

const scrollIndicator = document.querySelector(".scroll-indicator");

if (scrollIndicator) {
    window.addEventListener("scroll", () => {
        scrollIndicator.style.opacity = window.scrollY > 150 ? "0" : "1";
    });
}


/*==========================================================
                BACK TO TOP BUTTON
==========================================================*/

const topBtn = document.getElementById("topBtn");

if (topBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/*==========================================================
                ANIMATED COUNTERS
==========================================================*/

const counters = document.querySelectorAll(".stat-card h3");

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = parseInt(counter.innerText);
        let current = 0;
        const increment = Math.ceil(target / 40);

        function updateCounter() {
            current += increment;

            if (current >= target) {
                counter.innerText = target + "+";
            } else {
                counter.innerText = current + "+";
                requestAnimationFrame(updateCounter);
            }
        }

        updateCounter();
        counterObserver.unobserve(counter);
    });
}, {
    threshold: .5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});


/*==========================================================
                SKILL CARD ANIMATION
==========================================================*/

const skillCards = document.querySelectorAll(".skill-card");

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: .2
});

skillCards.forEach(card => {
    skillObserver.observe(card);
});


/*==========================================================
                SCROLL REVEAL
==========================================================*/

const revealElements = document.querySelectorAll(
    ".about-card,.skill-card,.project-card,.certificate-card,.education-card"
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: .15
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});


/*==========================================================
                PROJECT CARD TILT
==========================================================*/

const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = -(y - rect.height / 2) / 18;
        const rotateY = (x - rect.width / 2) / 18;

        card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
});


/*==========================================================
                RIPPLE EFFECT
==========================================================*/

const buttons = document.querySelectorAll(
    ".primary-btn,.secondary-btn,.project-btn,.github-btn,.send-btn"
);

buttons.forEach(button => {
    button.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        ripple.className = "ripple";

        const rect = this.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});


/*==========================================================
                CURSOR GLOW
==========================================================*/

const glow = document.createElement("div");
glow.className = "cursor-glow";
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});


/*==========================================================
            PERFORMANCE OPTIMIZATION
==========================================================*/

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});


/*==========================================================
            VIEW MORE PROJECTS
==========================================================*/

const viewMoreBtn = document.getElementById("view-more-btn");
const moreProjects = document.getElementById("more-projects");

if (viewMoreBtn && moreProjects) {
    viewMoreBtn.addEventListener("click", () => {
        moreProjects.classList.toggle("visible");

        if (moreProjects.classList.contains("visible")) {
            viewMoreBtn.textContent = "View Less Projects";

            setTimeout(() => {
                moreProjects.after(viewMoreBtn.parentElement);
                viewMoreBtn.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }, 300);
        } else {
            const projectsSection = document.querySelector("#projects");
            projectsSection.appendChild(viewMoreBtn.parentElement);
            viewMoreBtn.textContent = "View More Projects";
            projectsSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}


/*==========================================================
                PROJECT MODAL DATA
==========================================================*/
/*  Replace the "demo" and "github" URLs below with your
    actual live demo links and GitHub repository links.
    If a project has no live demo, set demo: "" (empty
    string) and the Live Demo button will auto-hide.       */

const projectData = {
    intern: {
        title: "Intern Performance Analytics Dashboard",
        tools: "Python • Flask • Pandas • Power BI • Excel",
        problem: "Manual tracking of intern performance was time-consuming and difficult for managers.",
        solution: "Built an interactive dashboard to analyze attendance, performance, project completion and productivity.",
        outcome: "Reduced manual reporting time and improved performance tracking.",
        image: "assets/Intern.png",
        demo: "https://app.powerbi.com/groups/me/reports/95900a17-9238-49df-8cf5-596d5c3aa292/9eb69314b1a247030a47?experience=power-bi",
        github: "https://github.com/Shamaanjum-26/Rynixsoft-intern_performance_analytics.git"
    },
    hr: {
        title: "HR Analytics Dashboard",
        tools: "Tableau • Excel",
        problem: "HR team struggled to monitor attrition and employee performance.",
        solution: "Developed interactive dashboards with workforce KPIs.",
        outcome: "Improved HR decision-making.",
        image: "assets/HR_db.png",
        demo: "https://public.tableau.com/app/profile/shama.anjum1763/viz/HR-ANALYTICSDASHBOARD/HR-DASHBOARD",
        github: "https://github.com/Shamaanjum-26/HR-Analytics_Dashboard.git"
    },
    sales: {
        title: "Sales Dashboard",
        tools: "Power BI • SQL • Excel",
        problem: "Sales data was spread across multiple Excel sheets.",
        solution: "Created an interactive Power BI dashboard with KPIs and sales trends.",
        outcome: "Enabled faster sales analysis.",
        image: "assets/Coffee_db.png",
        demo: "https://app.powerbi.com/groups/me/reports/4917443d-b0b5-46fa-99e7-bdaebec9d223/ff46e2237e9be4b569f9?experience=power-bi",
        github: "https://github.com/Shamaanjum-26/Sales-Dashboard-MySQL-Powerbi.git"
    },
    hospital: {
        title: "Hospital Performance Dashboard",
        tools: "Power BI • SQL • Excel",
        problem: "Hospital management lacked KPI visibility.",
        solution: "Designed dashboard to monitor patients and hospital KPIs.",
        outcome: "Improved operational monitoring.",
        image: "assets/hospital_db.png",
        demo: "https://app.powerbi.com/groups/me/reports/0c6a71c1-b6c5-4b01-be56-724b79533bf9/7deb79427e9ed908b144?experience=power-bi",
        github: "https://github.com/Shamaanjum-26/Hospitality-Dashboard-Power-BI.git"
    },
    weather: {
        title: "Weather Forecast Dashboard",
        tools: "Power BI • API • Excel",
        problem: "Weather information was scattered across sources.",
        solution: "Integrated APIs and created real-time visualizations.",
        outcome: "Centralized weather insights.",
        image: "assets/weather_db.png",
        demo: "https://app.powerbi.com/groups/me/reports/9d3b34a9-3b3e-412d-9e9c-8dc790045818/48ab3e5090de3358b8eb?experience=power-bi",
        github: "https://github.com/Shamaanjum-26/Weather-Dashboard-Power-BI.git"
    },
    finance: {
        title: "Financial Complaints Dashboard",
        tools: "Tableau • Excel",
        problem: "Complaint analysis was manual and slow.",
        solution: "Created Tableau dashboard for complaint tracking.",
        outcome: "Faster complaint analysis.",
        image: "assets/Finance_db.png",
        demo: "https://your-live-demo-link.com",
        github: "https://public.tableau.com/app/profile/shama.anjum1763/viz/Financial_Complaints_Dashboard_17525076664230/FCOVERVIEW"
    }
};


/*==========================================================
            OPEN PROJECT MODAL
==========================================================*/

const projectButtons = document.querySelectorAll(".view-project-btn");
const projectModal = document.getElementById("projectModal");

projectButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const project = projectData[btn.dataset.project];
        if (!project) return;

        document.getElementById("modalTitle").textContent = project.title;
        document.getElementById("modalTools").textContent = project.tools;
        document.getElementById("modalProblem").textContent = project.problem;
        document.getElementById("modalSolution").textContent = project.solution;
        document.getElementById("modalOutcome").textContent = project.outcome;
        document.getElementById("modalImage").src = project.image;

        // Live Demo button
        const liveBtn = document.getElementById("modalLiveBtn");
        if (liveBtn) {
            if (project.demo) {
                liveBtn.href = project.demo;
                liveBtn.style.display = "flex";
            } else {
                liveBtn.style.display = "none";
            }
        }

        // GitHub button
        const githubBtn = document.getElementById("modalGithubBtn");
        if (githubBtn) {
            if (project.github) {
                githubBtn.href = project.github;
                githubBtn.style.display = "flex";
            } else {
                githubBtn.style.display = "none";
            }
        }

        projectModal.classList.add("show");
        document.body.style.overflow = "hidden";
    });
});


/*==========================================================
                CLOSE MODAL
==========================================================*/

const closeModal = document.querySelector(".close-modal");

if (closeModal) {
    closeModal.addEventListener("click", () => {
        projectModal.classList.remove("show");
        document.body.style.overflow = "auto";
    });
}


/*==========================================================
            CLOSE WHEN CLICK OUTSIDE
==========================================================*/

window.addEventListener("click", (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove("show");
        document.body.style.overflow = "auto";
    }
});


/*==========================================================
                ESC KEY CLOSE
==========================================================*/

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectModal) {
        projectModal.classList.remove("show");
        document.body.style.overflow = "auto";
    }
});


/*==========================================================
                NAVBAR SCROLL EFFECT
==========================================================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


/*==========================================================
                SECTION REVEAL ANIMATION
==========================================================*/

const revealSections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("section-show");
        }
    });
}, {
    threshold: 0.15
});

revealSections.forEach(section => {
    sectionObserver.observe(section);
});


/*==========================================================
                BUTTON HOVER SCALE
==========================================================*/

const allButtons = document.querySelectorAll(
    ".primary-btn,.secondary-btn,.project-btn,.github-btn"
);

allButtons.forEach(button => {

    button.addEventListener("mouseenter", () => {
        button.style.transform = "translateY(-5px)";
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "translateY(0)";
    });

});


/*==========================================================
                IMAGE HOVER ZOOM
==========================================================*/

const images = document.querySelectorAll(
    ".project-image img,.certificate-card img,.hero-image img"
);

images.forEach(image => {
    image.addEventListener("mouseenter", () => {
        image.style.transform = "scale(1.08)";
        image.style.transition = ".4s";
    });

    image.addEventListener("mouseleave", () => {
        image.style.transform = "scale(1)";
    });
});


/*==========================================================
                COPY EMAIL
==========================================================*/

const emailLink = document.querySelector(".email-copy");

if (emailLink) {
    emailLink.addEventListener("click", (e) => {
        e.preventDefault();
        navigator.clipboard.writeText("yourmail@gmail.com");
        alert("Email copied!");
    });
}


/*==========================================================
                CURRENT YEAR
==========================================================*/

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


/*==========================================================
                DISABLE RIGHT CLICK (OPTIONAL)
==========================================================*/

// Uncomment if required
/*
document.addEventListener("contextmenu", e => {
    e.preventDefault();
});
*/


/*==========================================================
                KEYBOARD SHORTCUT
==========================================================*/

document.addEventListener("keydown", (e) => {
    if (e.key === "Home") {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
});


/*==========================================================
                PAGE LOADED
==========================================================*/

window.addEventListener("load", () => {
    document.body.classList.add("page-loaded");
});


/*==========================================================
                CONSOLE MESSAGE
==========================================================*/

console.clear();

console.log(
    "%c🚀 Welcome Recruiter!",
    "color:#00D4FF;font-size:20px;font-weight:bold;"
);

console.log(
    "%cPortfolio Designed & Developed by Shama Anjum",
    "color:#7B2FF7;font-size:16px;font-weight:bold;"
);

console.log(
    "%cData Analyst | Power BI Developer",
    "color:#00ffb3;font-size:14px;"
);

// Certificate View Button

const certificateButtons = document.querySelectorAll(".certificate-btn");


certificateButtons.forEach(button => {

    button.addEventListener("click", () => {

        const image = button.getAttribute("data-img");
        const title = button.getAttribute("data-title");
        const company = button.getAttribute("data-company");


        // Open certificate image in new tab

        const newWindow = window.open("", "_blank");


        newWindow.document.write(`

            <html>

            <head>

            <title>${title}</title>

            <style>

                body{
                    margin:0;
                    background:#111;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    height:100vh;
                }


                img{

                    max-width:90%;
                    max-height:90%;
                    border-radius:15px;
                    box-shadow:0 0 30px rgba(255,255,255,.2);

                }


            </style>

            </head>


            <body>


            <img src="${image}" alt="${company} Certificate">


            </body>


            </html>

        `);

    });

});

// View More Certifications Button

const viewMoreCertBtn = document.getElementById("view-more-certs-btn");
const moreCertificates = document.getElementById("more-certs");


if(viewMoreCertBtn && moreCertificates){

    viewMoreCertBtn.addEventListener("click",()=>{


        moreCertificates.classList.toggle("show");


        if(moreCertificates.classList.contains("show")){


            viewMoreCertBtn.innerHTML =
            "↑ Show Less Certifications";


        }
        else{


            viewMoreCertBtn.innerHTML =
            "↓ View More Certifications";


        }


    });

}

/*==========================================================
                END OF SCRIPT
==========================================================*/