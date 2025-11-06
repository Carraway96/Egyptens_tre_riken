document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const dropzones = document.querySelectorAll(".dropzone");
  const checkButton = document.getElementById("check-button");
  const resetButton = document.getElementById("reset-button");
  const resultElement = document.getElementById("result");
  const cardPool = document.getElementById("card-pool");

  // Rätt facit för varje kort
  const correctMapping = {
    "card-1": "old",    // Pyramiderna byggs i Memphis
    "card-2": "old",    // Farao ses som en gud
    "card-3": "old",    // Hungersnöd och inbördeskrig avslutar perioden
    "card-4": "middle", // Thebe blir huvudstad för första gången
    "card-5": "middle", // Hyksos invaderar Egypten
    "card-6": "middle", // Hyksos lär egyptierna använda stridsvagnar
    "card-7": "new",    // Thebe blir huvudstad igen
    "card-8": "new",    // Egypten expanderar sina gränser genom krig
    "card-9": "new",    // Ramesses II regerar
    "card-10": "new",   // Strejk bland arbetare när Nilen inte svämmar över
    "card-11": "new",   // Landets ekonomi försvagas efter krigen
    "card-12": "new"    // Egypten delas återigen efter stridigheter
  };

  let draggedCard = null;

  cards.forEach((card) => {
    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("dragend", handleDragEnd);
  });

  dropzones.forEach((zone) => {
    zone.addEventListener("dragover", handleDragOver);
    zone.addEventListener("dragenter", handleDragEnter);
    zone.addEventListener("dragleave", handleDragLeave);
    zone.addEventListener("drop", handleDrop);
  });

  function handleDragStart(e) {
    draggedCard = this;
    e.dataTransfer.setData("text/plain", this.id);
    setTimeout(() => {
      this.classList.add("dragging");
    }, 0);
  }

  function handleDragEnd() {
    this.classList.remove("dragging");
    draggedCard = null;
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDragEnter(e) {
    e.preventDefault();
    this.classList.add("drag-over");
  }

  function handleDragLeave() {
    this.classList.remove("drag-over");
  }

  function handleDrop(e) {
    e.preventDefault();
    this.classList.remove("drag-over");

    const cardId = e.dataTransfer.getData("text/plain");
    const card = document.getElementById(cardId);
    if (card) {
      this.appendChild(card);
    }
  }

  checkButton.addEventListener("click", () => {
    let correctCount = 0;
    const total = Object.keys(correctMapping).length;

    // Nollställ tidigare färger
    cards.forEach((card) => {
      card.classList.remove("correct", "incorrect");
    });

    cards.forEach((card) => {
      const parentDropzone = card.closest(".dropzone");
      const placedPeriod = parentDropzone ? parentDropzone.dataset.period : "pool";
      const correctPeriod = correctMapping[card.id];

      if (placedPeriod === correctPeriod) {
        card.classList.add("correct");
        correctCount++;
      } else {
        card.classList.add("incorrect");
      }
    });

    resultElement.textContent = `Du fick ${correctCount} av ${total} rätt!`;
  });

  resetButton.addEventListener("click", () => {
    cards.forEach((card) => {
      card.classList.remove("correct", "incorrect");
      cardPool.appendChild(card);
    });
    resultElement.textContent = "";
  });
});
