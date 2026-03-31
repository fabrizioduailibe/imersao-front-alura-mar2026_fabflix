/**
 * Sistema de Toggle de Tema (Dark Mode / Light Mode)
 * Funcionalidades:
 * - Detecta preferência do sistema via prefers-color-scheme
 * - Salva preferência do usuário em localStorage
 * - Fornece botão para alternar manualmente
 */

// Seleciona elementos necessários
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

/**
 * Aplica o tema adicionando a classe apropriada ao html
 * @param {string} theme - 'dark-mode' ou 'light-mode'
 */
function applyTheme(theme) {
    // Remove ambas as classes
    html.classList.remove('dark-mode', 'light-mode');
    
    // Adiciona a nova classe
    html.classList.add(theme);
    
    // Salva no localStorage
    localStorage.setItem('fabflix-theme', theme);
    
    console.log(`Tema aplicado: ${theme === 'light-mode' ? 'Light' : 'Dark'}`);
}

/**
 * Inicializa o tema na primeira carga
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem('fabflix-theme');
    
    if (savedTheme) {
        // Usa tema salvo
        applyTheme(savedTheme);
    } else {
        // Detecta preferência do sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = prefersDark ? 'dark-mode' : 'light-mode';
        applyTheme(theme);
    }
}

/**
 * Toggle entre dark-mode e light-mode
 */
function toggleTheme() {
    const isDarkMode = html.classList.contains('dark-mode');
    const newTheme = isDarkMode ? 'light-mode' : 'dark-mode';
    applyTheme(newTheme);
}

/**
 * Monitora mudanças na preferência do sistema do SO
 */
function watchSystemThemePreference() {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    darkModeQuery.addEventListener('change', (event) => {
        // Só aplica automaticamente se o usuário não salvou uma preferência
        const savedTheme = localStorage.getItem('fabflix-theme');
        
        if (!savedTheme) {
            const newTheme = event.matches ? 'dark-mode' : 'light-mode';
            applyTheme(newTheme);
        }
    });
}

/**
 * Armazena o perfil ativo no localStorage
 * Captura o nome e a imagem do perfil selecionado
 */
function initializeProfileSelection() {
    const profileLinks = document.querySelectorAll('.profile-link');
    
    profileLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Extrai o nome do perfil
            const profileName = link.querySelector('span').textContent;
            
            // Extrai a URL da imagem do perfil
            const profileImage = link.querySelector('img').src;
            
            // Armazena no localStorage em formato JSON
            const profileData = {
                nome: profileName,
                imagem: profileImage
            };
            
            localStorage.setItem('fabflix-perfil-ativo', JSON.stringify(profileData));
            
            console.log(`Perfil salvo: ${profileName}`);
        });
    });
}

// ========== Event Listeners ==========

// Toggle ao clicar no botão
themeToggle.addEventListener('click', toggleTheme);

// Toggle com teclado (Acessibilidade)
themeToggle.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleTheme();
    }
});

// ========== Inicialização ==========

// Inicializa tema na carregamento da página
initializeTheme();

// Monitora mudanças na preferência do sistema
watchSystemThemePreference();

// Inicializa seleção de perfis com localStorage
initializeProfileSelection();
