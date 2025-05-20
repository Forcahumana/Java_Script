// Armazenamento de filmes (simulando um banco de dados)
let filmes = JSON.parse(localStorage.getItem('filmes')) || [];

// Classe Filme
class Filme {
    constructor(id, titulo, ano, genero, imagem, link, descricao) {
        this.id = id;
        this.titulo = titulo;
        this.ano = ano;
        this.genero = genero;
        this.imagem = imagem;
        this.link = link;
        this.descricao = descricao;
        this.comentarios = [];
    }
}

// Classe Comentário
class Comentario {
    constructor(autor, texto, data = new Date()) {
        this.autor = autor;
        this.texto = texto;
        this.data = data;
    }
}

// Função para gerar um novo ID
function gerarNovoId() {
    return filmes.length > 0 ? Math.max(...filmes.map(f => f.id)) + 1 : 1;
}

// Adiciona um filme
function addMovie() {
    const titulo = document.getElementById('movie-title').value;
    const ano = parseInt(document.getElementById('movie-year').value);
    const genero = document.getElementById('movie-genre').value;
    const imagem = document.getElementById('movie-image').value;
    const link = document.getElementById('movie-link').value;
    const descricao = document.getElementById('movie-description').value;
    
    const novoId = gerarNovoId();
    const novoFilme = new Filme(novoId, titulo, ano, genero, imagem, link, descricao);
    
    filmes.push(novoFilme);
    salvarFilmes();
    
    return novoFilme;
}

// Atualiza um filme
function updateMovie() {
    const id = parseInt(document.getElementById('movie-id').value);
    const titulo = document.getElementById('movie-title').value;
    const ano = parseInt(document.getElementById('movie-year').value);
    const genero = document.getElementById('movie-genre').value;
    const imagem = document.getElementById('movie-image').value;
    const link = document.getElementById('movie-link').value;
    const descricao = document.getElementById('movie-description').value;
    
    const index = filmes.findIndex(f => f.id === id);
    if (index !== -1) {
        // Mantém os comentários existentes
        const comentarios = filmes[index].comentarios;
        filmes[index] = new Filme(id, titulo, ano, genero, imagem, link, descricao);
        filmes[index].comentarios = comentarios;
        salvarFilmes();
    }
}

// Remove um filme
function removerFilme(id) {
    filmes = filmes.filter(f => f.id !== id);
    salvarFilmes();
}

// Salva filmes no localStorage
function salvarFilmes() {
    localStorage.setItem('filmes', JSON.stringify(filmes));
}

// Renderiza a lista de filmes
function renderizarFilmes() {
    const moviesList = document.getElementById('movies-list');
    if (!moviesList) return;
    
    moviesList.innerHTML = '';
    
    if (filmes.length === 0) {
        moviesList.innerHTML = '<p>Nenhum filme cadastrado no catálogo.</p>';
        return;
    }
    
    filmes.forEach(filme => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        
        movieCard.innerHTML = `
            ${filme.imagem ? `<img src="${filme.imagem}" alt="${filme.titulo}">` : ''}
            <h3>${filme.titulo}</h3>
            <div class="movie-info"><strong>Ano:</strong> ${filme.ano}</div>
            <div class="movie-info"><strong>Gênero:</strong> ${filme.genero}</div>
            <p>${filme.descricao.substring(0, 100)}${filme.descricao.length > 100 ? '...' : ''}</p>
            ${filme.link ? `<a href="${filme.link}" class="movie-link" target="_blank">Ver mais sobre o filme</a>` : ''}
            <div class="movie-actions">
                <a href="adicionar.html?edit=${filme.id}" class="btn-edit">Editar</a>
                <button onclick="removerFilme(${filme.id}); renderizarFilmes();">Remover</button>
                <a href="comentarios.html?id=${filme.id}" class="btn-comments">Comentários (${filme.comentarios.length})</a>
            </div>
        `;
        
        moviesList.appendChild(movieCard);
    });
}

// Carrega dados iniciais se não houver filmes
if (filmes.length === 0) {
    filmes = [
        new Filme(
            1, 
            "O Padrinho", 
            1972, 
            "Drama", 
            "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX200_.jpg", 
            "https://www.imdb.com/title/tt0068646/", 
            "A saga da família Corleone, liderada por Vito Corleone, o patriarca."
        ),
        new Filme(
            2, 
            "Interestelar", 
            2014, 
            "Ficção Científica", 
            "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX200_.jpg", 
            "https://www.imdb.com/title/tt0816692/", 
            "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço."
        )
    ];
    
    // Adiciona alguns comentários de exemplo
    filmes[0].comentarios.push(
        new Comentario("João Silva", "Um clássico do cinema! Marlon Brando está incrível."),
        new Comentario("Maria Oliveira", "A melhor representação da máfia italiana no cinema.")
    );
    
    filmes[1].comentarios.push(
        new Comentario("Carlos Souza", "Visualmente deslumbrante e emocionante."),
        new Comentario("Ana Costa", "Nolan mais uma vez supera as expectativas.")
    );
    
    salvarFilmes();
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', function() {
    renderizarFilmes();
});