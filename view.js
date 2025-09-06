function updateView() {
  const totalCells = ROWS * COLS;
  let html = `<div class="board" style="--cols:${COLS}">`;

  for (let cellIndex = 0; cellIndex < totalCells; cellIndex++) {
    const rowIndex = Math.floor(cellIndex / COLS);
    const colIndex = cellIndex % COLS;
    const cellChar = board.charAt(cellIndex);

    if (isClosed(cellChar)) {
      html += /*HTML*/`<div class="cell closed" onclick="openCell(${cellIndex})"></div>`;
    } else {
      html += /*HTML*/`
        <div class="cell open
          ${cellChar === 'B' ? ' bomb' : ''}
          ${cellChar >= '1' && cellChar <= '8' ? getNumberClass(cellChar) : ''}">
          ${cellChar === '·' ? '' : cellChar === 'B' ? '💣' : escapeHtml(cellChar)}
        </div>`;
    }
  }

  html += `</div>`;
  document.getElementById('app').innerHTML = html;
}


function getNumberClass(openDigitChar) {
    const number = parseInt(openDigitChar);
    if (number >= 1 && number <= 8) return 'n' + number;
    return '';
}

function escapeHtml(textChar) {
    if (textChar === '<') return '&lt;';
    if (textChar === '>') return '&gt;';
    if (textChar === '&') return '&amp;';
    return textChar;
}
