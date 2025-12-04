document.addEventListener('DOMContentLoaded', () => {

    const API_BASE_URL = 'https://uselessfacts.jsph.pl/random.json?language=es';
    let currentInsight = null;
    let savedQuotes = JSON.parse(localStorage.getItem('motivaNowQuotes')) || [];
    const loadingState = document.getElementById('loading-state');
    const rateDisplay = document.getElementById('rate-display');
    const rateValueSpan = rateDisplay.querySelector('.rate-value');
    const rateTimestampSpan = rateDisplay.querySelector('.rate-timestamp');
    const btnNewInsight = document.getElementById('btn-new-insight');
    const btnSaveRate = document.getElementById('btn-save-rate');
    const savedRatesContainer = document.getElementById('saved-rates-container');
    const successSound = document.getElementById('success-sound');

    function playSound() {
        if (successSound) {
            successSound.currentTime = 0;
            successSound.play().catch(error => {
                console.warn("Error al reproducir sonido (posible bloqueo del navegador):", error);
            });
        }
    }

    function showLoading() {
        loadingState.classList.remove('hidden');
        rateDisplay.classList.add('hidden');
        btnNewInsight.disabled = true;
        btnSaveRate.disabled = true;
    }

    function hideLoading() {
        loadingState.classList.add('hidden');
        rateDisplay.classList.remove('hidden');
        btnNewInsight.disabled = false;
        btnSaveRate.disabled = false;
    }

    function updateInsightDisplay(insight) {
        rateValueSpan.textContent = insight.value;
        rateTimestampSpan.textContent = `— Fuente: ${insight.author}`;
        hideLoading();
    }

    async function fetchNewInsight() {
        showLoading();
        currentInsight = null;

        try {
            const response = await fetch(API_BASE_URL);

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();
            const factText = data.text;

            currentInsight = {
                id: Date.now(),
                value: factText,
                author: "Useless Facts"
            };

            updateInsightDisplay(currentInsight);
            playSound();

        } catch (error) {
            console.error("Error al obtener la frase:", error);
            rateValueSpan.textContent = "Error de Conexión.";
            rateTimestampSpan.textContent = "No se pudieron obtener los datos. (Verifique la API).";
            hideLoading();
        }
    }

    function deleteQuote(quoteId) {

        savedQuotes = savedQuotes.filter(quote => quote.id !== quoteId);

        localStorage.setItem('motivaNowQuotes', JSON.stringify(savedQuotes));


        renderSavedQuotes();
        playSound();
    }

    function renderSavedQuotes() {
        savedRatesContainer.innerHTML = '';

        if (savedQuotes.length === 0) {
            const placeholder = document.createElement('li');
            placeholder.classList.add('rate-list-item', 'placeholder');
            placeholder.textContent = 'Guarda aquí tus frases favoritas.';
            savedRatesContainer.appendChild(placeholder);
            return;
        }

        savedQuotes.forEach(insight => {
            const listItem = document.createElement('li');
            listItem.classList.add('rate-list-item');

            const textContainer = document.createElement('span');
            textContainer.textContent = `“${insight.value}” (${insight.author})`;

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn-delete');
            deleteButton.textContent = '❌';

            deleteButton.addEventListener('click', () => {
                deleteQuote(insight.id);
            });

            listItem.appendChild(textContainer);
            listItem.appendChild(deleteButton);
            savedRatesContainer.appendChild(listItem);
        });
    }

    function saveCurrentQuote() {
        if (currentInsight) {
            const isDuplicate = savedQuotes.some(quote => quote.value === currentInsight.value);

            if (isDuplicate) {
                alert('Este dato ya ha sido guardado.');
                return;
            }

            savedQuotes.push(currentInsight);
            localStorage.setItem('motivaNowQuotes', JSON.stringify(savedQuotes));

            renderSavedQuotes();
            playSound();
        } else {
            alert('¡Espera a que se cargue un dato para poder guardarlo!');
        }
    }

    btnNewInsight.addEventListener('click', fetchNewInsight);
    btnSaveRate.addEventListener('click', saveCurrentQuote);

    fetchNewInsight();
    renderSavedQuotes();
});




