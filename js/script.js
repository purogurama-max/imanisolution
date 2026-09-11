document.addEventListener("DOMContentLoaded", function() {
    // 1. Dynamic WhatsApp Configuration mapping based on CONFIG
    if (typeof CONFIG !== "undefined") {
        const cleanNumber = CONFIG.whatsapp.replace(/[^0-9]/g, "");
        
        // Update all WhatsApp buttons/links
        const waTriggers = document.querySelectorAll(".btn-wa-trigger");
        waTriggers.forEach(el => {
            if (el.tagName === "A") {
                const currentHref = el.getAttribute("href");
                // Preserve custom messages if present in query params
                if (currentHref && currentHref.includes("?text=")) {
                    const textParam = currentHref.split("?text=")[1];
                    el.setAttribute("href", `https://wa.me/${cleanNumber}?text=${textParam}`);
                } else {
                    el.setAttribute("href", `https://wa.me/${cleanNumber}`);
                }
            }
        });

        // Update contact text info if available
        const whatsappTextEl = document.querySelector(".text-whatsapp");
        if (whatsappTextEl) {
            whatsappTextEl.textContent = CONFIG.whatsapp;
        }

        const emailTextEl = document.querySelector(".text-email");
        if (emailTextEl) {
            emailTextEl.textContent = CONFIG.email;
            emailTextEl.parentElement.parentElement.querySelector("i").nextElementSibling.querySelector("strong").textContent = CONFIG.email;
        }
    }

    // 2. Hamburger Menu Toggle
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const icon = hamburger.querySelector("i");
            if (navMenu.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });

        // Close menu when clicking nav links on mobile
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                const icon = hamburger.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }

    // 3. Navbar Scrolled Effect & Active Link on Scroll
    const navbar = document.getElementById("navbar");
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        // Scrolled background
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Active link highlighting
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // 4. Dynamic Copyright Year
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
