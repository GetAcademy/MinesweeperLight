// ======= CONTROLLER (index-basert) =======

// 8 nabo-retninger som rene indeks-offsets (avhenger av global COLS)
const neighborOffsets = [
  -COLS - 1, -COLS, -COLS + 1,
  -1,                 +1,
  +COLS - 1, +COLS,  +COLS + 1
];

// Offentlig entry: åpner én celle og oppdaterer view
function openCell(cellIndex) {
  openCellInternal(cellIndex);
  updateView();
}

// Rekursiv flood-fill når vi åpner blanke ruter
function openCellInternal(cellIndex) {
  if (!inBoundsIndex(cellIndex)) return;

  const ch = board.charAt(cellIndex);
  if (!isClosed(ch)) return;

  const openedChar =
    ch === 'b' ? 'B' :     // bombe
    ch === '□' ? '·' :     // blank
    toOpenDigit(ch);       // ₁..₈ -> '1'..'8'

  setCharAt(cellIndex, openedChar);

  if (openedChar === '·') openNeighbors(cellIndex);
}

function openNeighbors(cellIndex) {
    for (let i = 0; i < neighborOffsets.length; i++) {
        const offset = neighborOffsets[i];
        if (!isValidNeighborIndex(cellIndex, offset)) continue;

        const neighborIndex = cellIndex + offset;
        const neighborChar = board.charAt(neighborIndex);

        // Ikke åpne bomber; hopp over allerede åpne
        if (neighborChar === 'b' || !isClosed(neighborChar)) continue;

        openCellInternal(neighborIndex);
    }
}

// ======= HJELPERE =======

function inBoundsIndex(index) {
  return index >= 0 && index < ROWS * COLS;
}

// Hindrer at venstre/høyre-naboer wrap’er over til nabokolonne
function isValidNeighborIndex(originIndex, offset) {
  const originCol = originIndex % COLS;

  // venstrekant
  if (originCol === 0 && (offset === -1 || offset === -COLS - 1 || offset === +COLS - 1)) return false;

  // høyrekant
  if (originCol === COLS - 1 && (offset === +1 || offset === -COLS + 1 || offset === +COLS + 1)) return false;

  const neighborIndex = originIndex + offset;
  return inBoundsIndex(neighborIndex);
}

// Lukkede: bombe ('b'), blank ('□'), eller subskript-tall ₁..₈
function isClosed(ch) {
  return ch === 'b' || ch === '□' || '₁₂₃₄₅₆₇₈'.indexOf(ch) !== -1;
}

// ₁..₈ -> '1'..'8'; ellers returner originalt tegn
function toOpenDigit(ch) {
  const sub = '₁₂₃₄₅₆₇₈';
  const idx = sub.indexOf(ch);
  return idx !== -1 ? String(idx + 1) : ch;
}

// Bytt nøyaktig ett tegn i board uten å endre lengden
function setCharAt(index, newChar) {
  if (typeof newChar !== 'string' || newChar.length !== 1) {
    console.error('setCharAt: newChar må være ett tegn, fikk:', newChar);
    return;
  }
  const beforeLen = board.length;
  board = `${board.slice(0, index)}${newChar}${board.slice(index + 1)}`;
  if (board.length !== beforeLen) {
    console.error('ADVARSEL: board-lengde endret!', { beforeLen, afterLen: board.length });
  }
}
