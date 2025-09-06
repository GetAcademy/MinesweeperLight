// ======= CONTROLLER (index-basert) =======

// 8 nabo-retninger som rene indeks-offsets
const neighborOffsets = [
  -COLS - 1, -COLS, -COLS + 1,
  -1,                 +1,
  +COLS - 1, +COLS,  +COLS + 1
];

// offentlig entry: åpner én celle og oppdaterer view
function openCell(cellIndex) {
  if (!inBoundsIndex(cellIndex)) return;
  openCellInternal(cellIndex);
  updateView();
}

// rekursiv flood-fill når vi åpner blanke ruter
function openCellInternal(cellIndex) {
  const cellChar = board.charAt(cellIndex);
  if (!isClosed(cellChar)) return;

  const openedChar =
    cellChar === 'b' ? 'B' :      // bombe
    cellChar === '□' ? '·' :      // blank
    toOpenDigit(cellChar);        // ₁..₈ -> '1'..'8'

  setCharAt(cellIndex, openedChar);

  // bare flood-fill fra blanke åpne ruter
  if (openedChar !== '·') return;

  for (let i = 0; i < neighborOffsets.length; i++) {
    const offset = neighborOffsets[i];
    if (!isValidNeighborIndex(cellIndex, offset)) continue;

    const neighborIndex = cellIndex + offset;
    const neighborChar  = board.charAt(neighborIndex);

    // ikke åpne bomber; hopp over allerede åpne
    if (neighborChar === 'b' || !isClosed(neighborChar)) continue;

    openCellInternal(neighborIndex);
  }
}

// ======= HJELPERE =======

function inBoundsIndex(index) {
  return index >= 0 && index < ROWS * COLS;
}

// sørger for at -1/+1 ikke “wrap’er” mellom rader
function isValidNeighborIndex(originIndex, offset) {
  const originCol = originIndex % COLS;

  // venstrekant: kan ikke gå til venstre
  if (originCol === 0 && (offset === -1 || offset === -COLS - 1 || offset === +COLS - 1)) return false;

  // høyrekant: kan ikke gå til høyre
  if (originCol === COLS - 1 && (offset === +1 || offset === -COLS + 1 || offset === +COLS + 1)) return false;

  const neighborIndex = originIndex + offset;
  return inBoundsIndex(neighborIndex);
}

function isClosed(cellChar) {
  if (cellChar === 'b' || cellChar === '□') return true;
  const code = cellChar.charCodeAt(0);
  return code >= 0x2081 && code <= 0x2088; // subskript ₁..₈
}

function toOpenDigit(cellChar) {
  const code = cellChar.charCodeAt(0);
  return (code >= 0x2081 && code <= 0x2088) ? String(code - 0x2080) : cellChar;
}

function setCharAt(index, newChar) {
  board = `${board.substr(0, index)}${newChar}${board.substr(index + 1)}`;
}
