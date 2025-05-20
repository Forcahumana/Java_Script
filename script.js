// Array para armazenar os filmes
let movies = [];

// Elementos do DOM
const movieForm = document.getElementById('movieForm');
const moviesContainer = document.getElementById('moviesContainer');
const commentsSection = document.getElementById('commentsSection');
const commentsContainer = document.getElementById('commentsContainer');
const commentForm = document.getElementById('commentForm');
const closeCommentsBtn = document.getElementById('closeComments');

// Variável para guardar o filme selecionado para comentários
let selectedMovieId = null;

// Classe para criar objetos de filme
class Movie {
    constructor(id, title, year, genre, image, description) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.genre = genre;
        this.image = image;
        this.description = description;
        this.comments = [];
    }
}

// Adicionar filme
movieForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const year = document.getElementById('year').value;
    const genre = document.getElementById('genre').value;
    const image = document.getElementById('image').value;
    const description = document.getElementById('description').value;
    
    // Criar ID único simples
    const id = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;
    
    // Criar novo filme e adicionar ao array
    const newMovie = new Movie(id, title, year, genre, image, description);
    movies.push(newMovie);
    
    // Limpar formulário e atualizar lista
    movieForm.reset();
    renderMovies();
});

// Mostrar comentários de um filme
function showComments(movieId) {
    selectedMovieId = movieId;
    const movie = movies.find(m => m.id === movieId);
    
    // Mostrar a seção de comentários
    commentsSection.classList.remove('hidden');
    
    // Limpar e preencher comentários
    commentsContainer.innerHTML = '';
    movie.comments.forEach(comment => {
        commentsContainer.innerHTML += `
            <div class="comment">
                <strong>${comment.author}</strong>
                <p>${comment.text}</p>
                <small>${new Date(comment.date).toLocaleString()}</small>
            </div>
        `;
    });
}

// Adicionar comentário
commentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const author = document.getElementById('author').value;
    const text = document.getElementById('comment').value;
    
    if (!author || !text) return;
    
    // Encontrar o filme selecionado
    const movie = movies.find(m => m.id === selectedMovieId);
    if (movie) {
        // Adicionar novo comentário
        movie.comments.push({
            author,
            text,
            date: new Date()
        });
        
        // Atualizar comentários e limpar formulário
        showComments(selectedMovieId);
        commentForm.reset();
    }
});

// Fechar a seção de comentários
closeCommentsBtn.addEventListener('click', function() {
    commentsSection.classList.add('hidden');
});

// Renderizar a lista de filmes
function renderMovies() {
    moviesContainer.innerHTML = '';
    
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie-card';
        movieElement.innerHTML = `
            <h3>${movie.title} (${movie.year})</h3>
            ${movie.image ? `<img src="${movie.image}" alt="${movie.title}">` : ''}
            <p><strong>Gênero:</strong> ${movie.genre}</p>
            <p>${movie.description}</p>
            <button onclick="showComments(${movie.id})">
                Comentários (${movie.comments.length})
            </button>
        `;
        
        moviesContainer.appendChild(movieElement);
    });
}

// exemplos
function initSampleMovies() {
    if (movies.length === 0) {
        movies.push(
            new Movie(1, "O Padrinho", 1972, "Drama", 
                     "https://example.com/godfather.jpg", 
                     "A história da família Corleone."),
            new Movie(2, "Interestelar", 2014, "Ficção Científica", 
                     "https://example.com/interstellar.jpg", 
                     "Viagem espacial para salvar a humanidade.")
        );
        
        // exemplos_comentarios
        movies[0].comments.push({
            author: "João",
            text: "Ótimo filme!",
            date: new Date()
        });
    }
}

// Iniciar a aplicação
initSampleMovies();
renderMovies();