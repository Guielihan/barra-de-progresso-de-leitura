// Seleciona a barra de progresso no DOM
const progressBar = document.getElementById('myBar');

/**
 * Atualiza a largura da barra de progresso
 * baseada no scroll da página.
 */
function updateProgress() {
    // 1. Obtém a posição atual do scroll (topo)
    // Suporte cruzado (cross-browser) para scrollTop
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // 2. Calcula a altura total rolável do documento
    // scrollHeight (altura total) - clientHeight (altura da janela visível)
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    let scrolled = 0;

    // 5. Garanta que funcione mesmo se o conteúdo for pequeno
    if (docHeight <= 0) {
        scrolled = 100;
    } else {
        // 3. Calcula a porcentagem
        scrolled = (scrollTop / docHeight) * 100;
    }

    // 4. Aplica a largura na barra
    // Usa uma template string para adicionar o '%'
    progressBar.style.width = `${scrolled}%`;
}

// Variável para controle do throttling via Request Animation Frame
let ticking = false;

/**
 * Função otimizada para lidar com o evento de scroll.
 * Usa requestAnimationFrame para evitar recálculos excessivos
 * e manter a taxa de quadros (FPS) alta.
 */
function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateProgress();
            ticking = false;
        });
        ticking = true;
    }
}

// Event Listeners

// Atualiza ao rolar a página
window.addEventListener('scroll', onScroll);

// Atualiza ao terminar de carregar o DOM (Carga inicial)
// Caso o usuário dê refresh no meio da página ou o conteúdo seja curto
document.addEventListener('DOMContentLoaded', updateProgress);

// Opcional: Atualizar se a janela for redimensionada (resize)
// Pois isso muda o docHeight e clientHeight
window.addEventListener('resize', updateProgress);
