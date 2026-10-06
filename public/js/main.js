// ============================================================
// ELVIS CLAIN NYAGA - PROFESSIONAL PORTFOLIO
// File: public/js/main.js
// Purpose: Portfolio interactions and API integration
// ============================================================


// ============================================================
// 01. ELEMENTS
// ============================================================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");

const projectsContainer =
    document.getElementById("projectsContainer");


// ============================================================
// 02. DAY / NIGHT MODE
// ============================================================

function applyTheme(theme) {

    if (theme === "light") {

        document.body.classList.add("light");

        if (themeIcon) {
            themeIcon.textContent = "☀";
        }

    } else {

        document.body.classList.remove("light");

        if (themeIcon) {
            themeIcon.textContent = "☾";
        }

    }

}


// ============================================================
// 03. LOAD SAVED THEME
// ============================================================

const savedTheme =
    localStorage.getItem("portfolio-theme");

if (savedTheme) {

    applyTheme(savedTheme);

} else {

    applyTheme("dark");

}


// ============================================================
// 04. THEME TOGGLE
// ============================================================

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const isLight =
            document.body.classList.contains("light");


        if (isLight) {

            applyTheme("dark");

            localStorage.setItem(
                "portfolio-theme",
                "dark"
            );

        } else {

            applyTheme("light");

            localStorage.setItem(
                "portfolio-theme",
                "light"
            );

        }

    });

}


// ============================================================
// 05. MOBILE NAVIGATION
// ============================================================

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("active");


        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    const navigationItems =
        navLinks.querySelectorAll("a");


    navigationItems.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


// ============================================================
// 06. LOAD PROFILE FROM DATABASE
// ============================================================

async function loadProfile() {

    try {

        const response =
            await fetch("/api/profile");


        if (!response.ok) {

            throw new Error(
                "Unable to retrieve profile."
            );

        }


        const result =
            await response.json();


        if (
            !result.success ||
            !result.profile
        ) {

            throw new Error(
                "Profile data was not returned."
            );

        }


        const profile =
            result.profile;


        // ----------------------------------------------------
        // PROFILE VALUES
        // ----------------------------------------------------

        const fullName =
            profile.full_name || "";

        const professionalTitle =
            profile.professional_title || "";

        const shortBio =
            profile.short_bio || "";

        const email =
            profile.email || "";

        const location =
            profile.location || "";

        const githubUrl =
            profile.github_url || "";

        const linkedinUrl =
            profile.linkedin_url || "";

        const resumeUrl =
            profile.resume_url || "";

        const profileImage =
            profile.profile_image || "";


        // ----------------------------------------------------
        // HERO NAME
        // ----------------------------------------------------

        const heroName =
            document.querySelector(".hero-intro h1");


        if (heroName && fullName) {

            const nameParts =
                fullName.trim().split(/\s+/);


            if (nameParts.length >= 3) {

                heroName.innerHTML =
                    `${nameParts[0]} <span>${nameParts[1]}</span> ${nameParts.slice(2).join(" ")}`;

            } else {

                heroName.textContent =
                    fullName;

            }

        }


        // ----------------------------------------------------
        // HERO PROFESSIONAL TITLE
        // ----------------------------------------------------

        const heroEyebrow =
            document.querySelector(
                ".hero-intro .eyebrow"
            );


        if (
            heroEyebrow &&
            professionalTitle
        ) {

            heroEyebrow.textContent =
                professionalTitle;

        }


        // ----------------------------------------------------
        // HERO DESCRIPTION
        // ----------------------------------------------------

        const heroDescription =
            document.querySelector(
                ".hero-intro .hero-description"
            );


        if (
            heroDescription &&
            shortBio
        ) {

            heroDescription.textContent =
                shortBio;

        }


        // ----------------------------------------------------
        // ABOUT INTRODUCTION
        // ----------------------------------------------------

        const aboutLargeText =
            document.querySelector(
                ".about-content .large-text"
            );


        if (
            aboutLargeText &&
            shortBio
        ) {

            aboutLargeText.textContent =
                shortBio;

        }


        // ----------------------------------------------------
        // ABOUT LOCATION
        // ----------------------------------------------------

        const aboutDetails =
            document.querySelector(
                ".about-details"
            );


        if (
            aboutDetails &&
            location
        ) {

            const detailBlocks =
                aboutDetails.children;


            if (detailBlocks.length > 0) {

                const locationValue =
                    detailBlocks[0].querySelector(
                        "strong"
                    );


                if (locationValue) {

                    locationValue.textContent =
                        location;

                }

            }

        }


        // ----------------------------------------------------
        // PROFILE IMAGE
        // ----------------------------------------------------

        const profileImageElement =
            document.querySelector(
                ".hero-profile-frame img"
            );


        if (
            profileImageElement &&
            profileImage
        ) {

            profileImageElement.src =
                profileImage;

            profileImageElement.alt =
                fullName ||
                "Elvis Clain Nyaga";

        }


        // ----------------------------------------------------
        // PROFILE CAPTION
        // ----------------------------------------------------

        const profileCaption =
            document.querySelector(
                ".hero-profile-caption span"
            );


        if (
            profileCaption &&
            fullName
        ) {

            profileCaption.textContent =
                fullName.toUpperCase();

        }


        const profileCaptionTitle =
            document.querySelector(
                ".hero-profile-caption small"
            );


        if (
            profileCaptionTitle &&
            professionalTitle
        ) {

            profileCaptionTitle.textContent =
                professionalTitle.toUpperCase();

        }


        // ----------------------------------------------------
        // EMAIL
        // ----------------------------------------------------

        const emailLinks =
            document.querySelectorAll(
                'a[href^="mailto:"]'
            );


        emailLinks.forEach((link) => {

            if (email) {

                link.href =
                    `mailto:${email}`;

                link.textContent =
                    "Email";

            }

        });


        // ----------------------------------------------------
        // GITHUB
        // ----------------------------------------------------

        const githubLinks =
            document.querySelectorAll(
                'a[href*="github.com"]'
            );


        githubLinks.forEach((link) => {

            if (githubUrl) {

                link.href =
                    githubUrl;

                link.target =
                    "_blank";

                link.rel =
                    "noopener noreferrer";

            }

        });


        // ----------------------------------------------------
        // LINKEDIN
        // ----------------------------------------------------

        const linkedinLinks =
            document.querySelectorAll(
                'a[href*="linkedin.com"], .footer-socials a:nth-child(2)'
            );


        linkedinLinks.forEach((link) => {

            if (linkedinUrl) {

                link.href =
                    linkedinUrl;

                link.target =
                    "_blank";

                link.rel =
                    "noopener noreferrer";

            }

        });


        // ----------------------------------------------------
        // RESUME
        // ----------------------------------------------------

        if (resumeUrl) {

            const resumeLinks =
                document.querySelectorAll(
                    'a[href*="resume"], a[data-resume]'
                );


            resumeLinks.forEach((link) => {

                link.href =
                    resumeUrl;

                link.target =
                    "_blank";

                link.rel =
                    "noopener noreferrer";

            });

        }


        console.log(
            "Profile loaded successfully from database."
        );


    } catch (error) {

        console.error(
            "Profile loading error:",
            error
        );

    }

}


// ============================================================
// 07. LOAD PROJECTS FROM DATABASE
// ============================================================

async function loadProjects() {

    if (!projectsContainer) {
        return;
    }


    try {

        const response =
            await fetch("/api/projects");


        if (!response.ok) {

            throw new Error(
                "Unable to retrieve projects."
            );

        }


        const result =
            await response.json();


        if (!result.success) {

            throw new Error(
                result.message ||
                "Projects data was not returned."
            );

        }


        const projects =
            result.projects || [];


        // ----------------------------------------------------
        // CLEAR EXISTING PROJECT CARDS
        // ----------------------------------------------------

        projectsContainer.innerHTML = "";


        // ----------------------------------------------------
        // CHECK FOR PROJECTS
        // ----------------------------------------------------

        if (projects.length === 0) {

            return;

        }


        // ----------------------------------------------------
        // CREATE PROJECT CARDS
        // ----------------------------------------------------

        projects.forEach((project, index) => {

            const projectCard =
                document.createElement("article");


            projectCard.className =
                "project-card";


            if (
                Number(project.featured) === 1
            ) {

                projectCard.classList.add(
                    "featured-project"
                );

            }


            // ------------------------------------------------
            // PROJECT IMAGE
            // ------------------------------------------------

            const projectImage =
                document.createElement("div");


            projectImage.className =
                "project-image";


            if (index === 0) {

                projectImage.classList.add(
                    "project-image-one"
                );

            } else if (index === 1) {

                projectImage.classList.add(
                    "project-image-two"
                );

            } else {

                projectImage.classList.add(
                    "project-image-three"
                );

            }


            const projectNumber =
                document.createElement("span");


            projectNumber.textContent =
                String(index + 1).padStart(2, "0");


            projectImage.appendChild(
                projectNumber
            );


            // ------------------------------------------------
            // PROJECT CONTENT
            // ------------------------------------------------

            const projectContent =
                document.createElement("div");


            projectContent.className =
                "project-content";


            // ------------------------------------------------
            // PROJECT CATEGORY
            // ------------------------------------------------

            const projectCategory =
                document.createElement("p");


            projectCategory.className =
                "project-category";


            projectCategory.textContent =
                project.featured
                    ? "Featured Project"
                    : "Web Development";


            // ------------------------------------------------
            // PROJECT TITLE
            // ------------------------------------------------

            const projectTitle =
                document.createElement("h3");


            projectTitle.textContent =
                project.title || "Untitled Project";


            // ------------------------------------------------
            // PROJECT DESCRIPTION
            // ------------------------------------------------

            const projectDescription =
                document.createElement("p");


            projectDescription.textContent =
                project.description || "";


            // ------------------------------------------------
            // PROJECT TECHNOLOGIES
            // ------------------------------------------------

            const projectTech =
                document.createElement("div");


            projectTech.className =
                "project-tech";


            if (project.technologies) {

                const technologies =
                    project.technologies
                        .split(",")
                        .map(
                            (technology) =>
                                technology.trim()
                        )
                        .filter(
                            (technology) =>
                                technology.length > 0
                        );


                technologies.forEach(
                    (technology) => {

                        const technologyTag =
                            document.createElement(
                                "span"
                            );


                        technologyTag.textContent =
                            technology;


                        projectTech.appendChild(
                            technologyTag
                        );

                    }
                );

            }


            // ------------------------------------------------
            // PROJECT LINKS
            // ------------------------------------------------

            const projectLinks =
                document.createElement("div");


            projectLinks.className =
                "project-links";


            // ------------------------------------------------
            // GITHUB LINK
            // ------------------------------------------------

            if (project.github_url) {

                const githubLink =
                    document.createElement("a");


                githubLink.href =
                    project.github_url;

                githubLink.target =
                    "_blank";

                githubLink.rel =
                    "noopener noreferrer";

                githubLink.className =
                    "project-link";

                githubLink.textContent =
                    "GitHub ↗";


                projectLinks.appendChild(
                    githubLink
                );

            }


            // ------------------------------------------------
            // LIVE PROJECT LINK
            // ------------------------------------------------

            if (project.live_url) {

                const liveLink =
                    document.createElement("a");


                liveLink.href =
                    project.live_url;

                liveLink.target =
                    "_blank";

                liveLink.rel =
                    "noopener noreferrer";

                liveLink.className =
                    "project-link";

                liveLink.textContent =
                    "View Project ↗";


                projectLinks.appendChild(
                    liveLink
                );

            }


            // ------------------------------------------------
            // ASSEMBLE PROJECT CARD
            // ------------------------------------------------

            projectContent.appendChild(
                projectCategory
            );

            projectContent.appendChild(
                projectTitle
            );

            projectContent.appendChild(
                projectDescription
            );

            projectContent.appendChild(
                projectTech
            );

            projectContent.appendChild(
                projectLinks
            );


            projectCard.appendChild(
                projectImage
            );

            projectCard.appendChild(
                projectContent
            );


            projectsContainer.appendChild(
                projectCard
            );

        });


        console.log(
            `${projects.length} project(s) loaded successfully from database.`
        );


    } catch (error) {

        console.error(
            "Projects loading error:",
            error
        );

    }

}


// ============================================================
// 08. INITIALIZE DATABASE CONTENT
// ============================================================

loadProfile();

loadProjects();


// ============================================================
// 09. CUSTOM CURSOR
// ============================================================

if (
    cursorDot &&
    cursorRing &&
    window.matchMedia("(pointer: fine)").matches
) {

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;


        cursorDot.style.left =
            `${mouseX}px`;

        cursorDot.style.top =
            `${mouseY}px`;

    });


    function animateCursor() {

        ringX +=
            (mouseX - ringX) * 0.15;

        ringY +=
            (mouseY - ringY) * 0.15;


        cursorRing.style.left =
            `${ringX}px`;

        cursorRing.style.top =
            `${ringY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    const interactiveElements =
        document.querySelectorAll(
            "a, button, input, textarea"
        );


    interactiveElements.forEach((element) => {

        element.addEventListener(
            "mouseenter",
            () => {

                document.body.classList.add(
                    "cursor-hover"
                );

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                document.body.classList.remove(
                    "cursor-hover"
                );

            }
        );

    });

}


// ============================================================
// 10. CONTACT FORM
// ============================================================

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            if (formStatus) {

                formStatus.textContent =
                    "Sending message...";

            }


            const formData =
                new FormData(contactForm);


            const messageData = {

                name:
                    formData.get("name"),

                email:
                    formData.get("email"),

                subject:
                    formData.get("subject"),

                message:
                    formData.get("message")

            };


            try {

                const response =
                    await fetch(
                        "/api/contact",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    messageData
                                )

                        }
                    );


                const result =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Unable to send message."
                    );

                }


                if (formStatus) {

                    formStatus.textContent =
                        "Message sent successfully.";

                }


                contactForm.reset();


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                if (formStatus) {

                    formStatus.textContent =
                        "The message could not be sent yet. Please try again later.";

                }

            }

        }
    );

}


// ============================================================
// 11. SIMPLE SCROLL REVEAL
// ============================================================

function initializeScrollReveal() {

    const revealElements =
        document.querySelectorAll(
            ".section-heading, .skill-card, .project-card, .timeline-item"
        );


    if (
        !revealElements.length ||
        !("IntersectionObserver" in window)
    ) {

        return;

    }


    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observerInstance.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";


        observer.observe(element);

    });

}


initializeScrollReveal();


// ============================================================
// 12. CONSOLE MESSAGE
// ============================================================

console.log(
    "Elvis Clain Nyaga Portfolio loaded successfully."
);