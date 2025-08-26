function getRandomLinesFromText(text, count) {
  const lines = text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

    // Shuffle lines (Fisher-Yates)
    for (let i = lines.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lines[i], lines[j]] = [lines[j], lines[i]];
    }

    return lines.slice(0, count);
}

fetch('./js/values.txt')
  .then(response => response.text())
  .then(text => {
    const count = 24;
    const selectedLines = getRandomLinesFromText(text, count);
    const bingoCard = document.getElementById('bingo-card');
    bingoCard.innerHTML = '';

    // Add header cells
    ['S', 'I', 'C', 'K', 'O'].forEach(letter => {
        const headerDiv = document.createElement('div');
        headerDiv.className = 'bingo-header';
        headerDiv.textContent = letter;
        bingoCard.appendChild(headerDiv);
    });

    let lineIndex = 0;
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'bingo-cell';
            if (row === 2 && col === 2) {
                const img = document.createElement('img');
                img.src = './img/sickosface.jpg';
                img.alt = 'Free Space';
                cellDiv.appendChild(img);
            } else {
                const textDiv = document.createElement('div');
                textDiv.className = 'cell-text';
                textDiv.textContent = selectedLines[lineIndex++];
                cellDiv.appendChild(textDiv);
            }
            bingoCard.appendChild(cellDiv);
        }
    }

    // Font shrinking
    requestAnimationFrame(() => {
        const cells = document.querySelectorAll('.cell-text');
        cells.forEach(cell => {
            let fontSize = 20;
            cell.style.fontSize = fontSize + 'px';
            while (
                (cell.scrollHeight > cell.clientHeight || cell.scrollWidth > cell.clientWidth) &&
                fontSize > 2
            ) {
                fontSize -= 1;
                cell.style.fontSize = fontSize + 'px';
            }
        });
    });
});