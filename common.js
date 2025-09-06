function inBounds(r, c) {
  return r >= 0 && r < ROWS && c >= 0 && c < COLS;
}

function isClosed(ch) {
  // lukkede varianter: 'b', '□', og subskript-tall ₁..₈
  if (ch === 'b' || ch === '□') return true;
  // subskript-tall '₁'(U+2081) til '₈'(U+2088)
  var code = ch.charCodeAt(0);
  return code >= 0x2081 && code <= 0x2088;
}

function toOpen(ch) {
  // bombe
  if (ch === 'b') return 'B';
  // blank
  if (ch === '□') return '·';
  // subskript ₁..₈ -> vanlig 1..8
  var code = ch.charCodeAt(0);
  if (code >= 0x2081 && code <= 0x2088) {
    var n = code - 0x2080; // ₁(0x2081) -> 1, … ₈ -> 8
    return String(n);
  }
  // allerede åpen, returner som er
  return ch;
}

function setCharAt(index, newChar) {
  // bytt ut ett tegn i board-strengen
  board = board.substr(0, index) + newChar + board.substr(index + 1);
}

function escapeHtml(ch) {
  // beskytt mot evt. HTML-tegn i visning (her mest for kompletthet)
  if (ch === '<') return '&lt;';
  if (ch === '>') return '&gt;';
  if (ch === '&') return '&amp;';
  return ch;
}