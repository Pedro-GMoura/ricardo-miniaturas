document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  const spanClose = document.getElementById("modalClose");
  const container = document.getElementById("collection-container");

  function openModal(imgSrc, carName) {
    if (modal && modalImg && modalCaption) {
      modal.style.display = "flex";
      modalImg.src = imgSrc;
      modalCaption.innerHTML = carName;
    }
  }

  function closeModal() {
    if (modal) {
      modal.style.display = "none";
    }
  }

  function viewDetails(carName) {
    alert(`Exibindo detalhes para: ${carName}`);
  }

  function loadCollection() {
    if (!container || typeof carJson === "undefined") {
      console.error(
        "Container da coleção ou dados dos carros não encontrados!"
      );
      return;
    }

    container.innerHTML = "";

    carJson.forEach((carro) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
                <div class="card-image">
                    <img src="${carro.img}" alt="${carro.name}">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${carro.name}</h3>
                    <p class="card-subtitle">${carro.description}</p>
                    <div class="card-footer">
                        <span class="price">R$ ${carro.price
                          .toFixed(2)
                          .replace(".", ",")}</span>
                        <button class="btn">Ver Detalhes</button>
                    </div>
                </div>
            `;

      const cardImage = card.querySelector(".card-image");
      if (cardImage) {
        cardImage.addEventListener("click", function () {
          openModal(carro.img, carro.name);
        });
      }

      const detailsButton = card.querySelector(".btn");
      if (detailsButton) {
        detailsButton.addEventListener("click", function (event) {
          event.stopPropagation();
          viewDetails(carro.name);
        });
      }

      container.appendChild(card);
    });
  }

  if (spanClose && modal) {
    spanClose.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  loadCollection();
});
