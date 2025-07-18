// Aguarda o DOM ser completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
  
  // Função para carregar os projetos do arquivo JSON
  const loadProjects = () => {
    fetch('projects.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(projects => {
        const container = document.getElementById('projects-container');
        if (!container) return; // Encerra se o container não for encontrado

        projects.forEach(proj => {
          // Cria o elemento <article> para o card
          const card = document.createElement('article');
          card.className = 'project-card';

          // Mapeia o array de tecnologias para criar as tags <span>
          const techTags = proj.tech.map(tag => `<span>${tag}</span>`).join('');
          
          // Mapeia os links (GitHub, Demo, etc.)
          const projectLinks = proj.links.map(link => 
            `<a href="${link.url}" target="_blank">${link.name}</a>`
          ).join('');

          // Preenche o card com a estrutura HTML completa e os dados do projeto
          card.innerHTML = `
            <img src="${proj.image}" alt="Thumbnail do ${proj.title}" class="project-image">
            <div class="project-info">
              <h3>${proj.title}</h3>
              <p>${proj.description}</p>
              <div class="project-tags">
                ${techTags}
              </div>
              <div class="project-links">
                ${projectLinks}
              </div>
            </div>
          `;

          container.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Falha ao carregar os projetos:', error);
        // Opcional: Mostrar uma mensagem de erro para o usuário na página
        const container = document.getElementById('projects-container');
        container.innerHTML = '<p style="text-align:center;">Não foi possível carregar os projetos. Tente novamente mais tarde.</p>';
      });
  };

  // Função para configurar o botão de troca de tema
  const setupThemeToggler = () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    const htmlElement = document.documentElement;

    if (!themeToggle || !themeIcon) return; // Encerra se os elementos não existirem

    // Verifica o tema salvo no localStorage ao carregar a página
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.classList.add(savedTheme === 'dark' ? 'dark-theme' : 'light-theme');
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    // Adiciona o evento de clique ao botão
    themeToggle.addEventListener('click', () => {
      htmlElement.classList.toggle('dark-theme');
      htmlElement.classList.toggle('light-theme');

      // Verifica qual tema está ativo e atualiza o ícone e o localStorage
      const isDarkMode = htmlElement.classList.contains('dark-theme');
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    });
  };

  // Executa as funções principais
  loadProjects();
  setupThemeToggler();
});