document.addEventListener("DOMContentLoaded", () => {
    const skillsSection = document.getElementById("skills");
    
    // Intersection Observer එකෙන් සෙක්ෂන් එක screen එකට ආවම විතරක් animate කරනවා
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTechnicalSkills();
                animateCircularSkills();
                observer.unobserve(entry.target); // එක පාරක් ඇනිමේට් වුණාම නවත්වන්න
            }
        });
    }, { threshold: 0.2 }); // 20% ක් සෙක්ෂන් එක පෙනෙන විට වැඩ කරයි

    observer.observe(skillsSection);

    // 1. Linear Progress Bars පිරවීම
    function animateTechnicalSkills() {
        const progressFills = document.querySelectorAll(".progress-fill");
        progressFills.forEach(fill => {
            const targetPercent = fill.getAttribute("data-percent");
            fill.style.width = targetPercent + "%";
        });
    }

    // 2. Circular Pie Charts පිරවීම
    function animateCircularSkills() {
        const circlePies = document.querySelectorAll(".circle-pie");
        circlePies.forEach(pie => {
            const targetPercent = parseInt(pie.getAttribute("data-percent"));
            let currentPercent = 0;
            
            // රවුම ක්‍රමයෙන් පිරී යන ඇනිමේෂන් එකක් ලබා දීමට (Counter Effect)
            const duration = 1500; // මිලිසෙකන්ඩ් 1500 (තත්පර 1.5)
            const startTime = performance.now();

            function updateCircle(timestamp) {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1); // 0 සිට 1 දක්වා
                
                // Ease out cubic progress
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                currentPercent = easeProgress * targetPercent;

                // Conic Gradient එක වෙනස් කිරීම (කහ පාට ප්‍රමාණය සහ තද නිල් පාට ප්‍රමාණය)
                pie.style.background = `conic-gradient(#ffb703 ${currentPercent}%, #314157 ${currentPercent}%)`;

                if (progress < 1) {
                    requestAnimationFrame(updateCircle);
                }
            }
            requestAnimationFrame(updateCircle);
        });
    }
});

