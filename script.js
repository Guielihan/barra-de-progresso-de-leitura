const progressBar = document.getElementById('myBar');

function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    let scrolled = 0;

    if (docHeight <= 0) {
        scrolled = 100;
    } else {
        scrolled = (scrollTop / docHeight) * 100;
    }

    progressBar.style.width = `${scrolled}%`;
}

let ticking = false;

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateProgress();
            ticking = false;
        });
        ticking = true;
    }
}


// atualiza ao rolar a página
window.addEventListener('scroll', onScroll);

// atualiza ao terminar de carregar
document.addEventListener('DOMContentLoaded', updateProgress);

window.addEventListener('resize', updateProgress);