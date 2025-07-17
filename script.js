// Adicionamos um "ouvinte" que espera o HTML inteiro ser carregado.
// TODO o nosso código vai ficar dentro dele.
document.addEventListener('DOMContentLoaded', function() {

    // --- SELEÇÃO DOS ELEMENTOS ---
    // Agora, esses elementos são procurados APÓS o HTML estar pronto, então eles serão encontrados.
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const spanClose = document.getElementById('modalClose');
    const container = document.getElementById('collection-container');

    // --- FUNÇÕES ---

    // Função para abrir o modal
    function openModal(imgSrc, carName) {
        if (modal && modalImg && modalCaption) { // Verificação de segurança
            modal.style.display = "flex";
            modalImg.src = imgSrc;
            modalCaption.innerHTML = carName;
        }
    }

    // Função para fechar o modal
    function closeModal() {
        if (modal) {
            modal.style.display = "none";
        }
    }

    // Função para exibir detalhes (ex: um alerta)
    function viewDetails(carName) {
        alert(`Exibindo detalhes para: ${carName}`);
    }

    // Função principal para carregar e exibir os cards
    function loadCollection() {
        // Verifica se o container dos cards e a variável carJson existem
        if (!container || typeof carJson === 'undefined') {
            console.error("Container da coleção ou dados dos carros não encontrados!");
            return;
        }

        container.innerHTML = ''; // Limpa o container

        // Itera sobre os dados dos carros
        carJson.forEach(carro => {
            const card = document.createElement('div');
            card.className = 'card';

            // Cria o HTML interno do card
            card.innerHTML = `
                <div class="card-image">
                    <img src="${carro.img}" alt="${carro.name}">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${carro.name}</h3>
                    <p class="card-subtitle">${carro.description}</p>
                    <div class="card-footer">
                        <span class="price">R$ ${carro.price.toFixed(2).replace('.', ',')}</span>
                        <button class="btn">Ver Detalhes</button>
                    </div>
                </div>
            `;

            // --- ADICIONANDO EVENTOS DE CLIQUE DE FORMA SEGURA ---

            // 1. Clique na imagem para abrir o modal
            const cardImage = card.querySelector('.card-image');
            if (cardImage) {
                cardImage.addEventListener('click', function() {
                    openModal(carro.img, carro.name);
                });
            }

            // 2. Clique no botão para ver detalhes
            const detailsButton = card.querySelector('.btn');
            if (detailsButton) {
                detailsButton.addEventListener('click', function(event) {
                    event.stopPropagation(); // Impede que o clique se propague para a imagem
                    viewDetails(carro.name);
                });
            }

            // Adiciona o card completo ao container
            container.appendChild(card);
        });
    }

    // --- CONFIGURAÇÃO DOS EVENTOS DO MODAL ---
    if (spanClose && modal) {
        // Fecha o modal ao clicar no "X"
        spanClose.addEventListener('click', closeModal);

        // Fecha o modal ao clicar fora da imagem (no fundo)
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // --- INICIALIZAÇÃO ---
    // Chama a função para carregar a coleção assim que tudo estiver pronto
    loadCollection();

});
