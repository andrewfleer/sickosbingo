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

    const count = 24; // Number of random lines to select
    const selectedLines = getRandomLinesFromText(text, count);
    const bingoCard = document.getElementById('bingo-card');
    bingoCard.innerHTML = '';

    const table = document.createElement('table');

    // Create header row
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['S', 'I', 'C', 'K', 'O'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    let lineIndex = 0; 

    for (let row = 0; row < 5; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < 5; col++) {
            const td = document.createElement('td');
            if (row === 2 && col === 2) {
                const img = document.createElement('img');
                img.src = './img/sickosface.jpg';
                img.alt = 'Free Space';
                img.style.width = '50px';
                img.style.height = '50px';
                td.appendChild(img);
            } else {
                const div = document.createElement('div');
                div.className = 'cell-text';
                div.textContent = selectedLines[lineIndex++];
                td.appendChild(div);
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    bingoCard.appendChild(table);

setTimeout(() => {
    const cells = table.querySelectorAll('.cell-text');
    cells.forEach(cell => {
        let fontSize = 20;
        cell.style.fontSize = fontSize + 'px';
        const parentTd = cell.parentElement;
        while (
            (cell.scrollHeight > parentTd.clientHeight || cell.scrollWidth > parentTd.clientWidth) &&
            fontSize > 4
        ) {
            fontSize -= 1;
            cell.style.fontSize = fontSize + 'px';
        }
    });
}, 0);
  })