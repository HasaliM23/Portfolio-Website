document.addEventListener("DOMContentLoaded", () => {
    const skillsSection = document.getElementById("skills");
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTechnicalSkills();
                animateCircularSkills();
                observer.unobserve(entry.target); // එක පාරක් පමණක් ක්‍රියාත්මක වීමට
            }
        });
    }, { threshold: 0.2 });

    observer.observe(skillsSection);

    // 1. Linear Progress Bars සහ ඒවායේ ඉහළ ඇති Text Counter එක ඇනිමේට් කිරීම
    function animateTechnicalSkills() {
        // බාර් පිරවීම
        const progressFills = document.querySelectorAll(".progress-fill");
        progressFills.forEach(fill => {
            const targetPercent = fill.getAttribute("data-percent");
            fill.style.width = targetPercent + "%";
        });

        // 0% සිට ගණන් කිරීමේ ඇනිමේෂන් එක (Text Counter)
        const percentTexts = document.querySelectorAll(".bar-percent-text");
        percentTexts.forEach(textElement => {
            const targetValue = parseInt(textElement.getAttribute("data-target"));
            let currentValue = 0;
            const duration = 1500; // තත්පර 1.5 ක කාලයක්
            const startTime = performance.now();

            function updateCounter(timestamp) {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out effect
                
                currentValue = Math.floor(easeProgress * targetValue);
                textElement.innerText = currentValue + "%";

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            requestAnimationFrame(updateCounter);
        });
    }

    // 2. Circular Pie Charts සහ ඒවායේ මැද ඇති Text Counter එක ඇනිමේට් කිරීම
function animateCircularSkills() {
    const circlePies = document.querySelectorAll(".circle-pie");
    
    circlePies.forEach(pie => {
        // HTML එකේ අපි ලියාපු data-percent අගය ගන්නවා (උදා: 80 හෝ 85)
        const targetPercent = parseInt(pie.getAttribute("data-percent"));
        const textElement = pie.parentElement.querySelector(".circle-percent-text");
        let currentPercent = 0;
        
        const duration = 1500; // තත්පර 1.5 කින් ඇනිමේෂන් එක ඉවර වෙනවා
        const startTime = performance.now();

        function updateCircle(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // සුමටව නතර වීමට (Ease out)
            
            currentPercent = easeProgress * targetPercent;

            // 1. රවුමේ පාට නිවැරදි ප්‍රතිශතයට පිරවීම
            pie.style.background = `conic-gradient(#ffb703 ${currentPercent}%, #314157 ${currentPercent}%)`;
            
            // 2. රවුම මැද ඇති අකුරු අගයත් රවුම පිරෙන වේගයෙන්ම 0% සිට නියමිත ගණනට වෙනස් කිරීම
            if (textElement) {
                textElement.innerText = Math.floor(currentPercent) + "%";
            }

            if (progress < 1) {
                requestAnimationFrame(updateCircle);
            }
        }
        requestAnimationFrame(updateCircle);
    });
}
});