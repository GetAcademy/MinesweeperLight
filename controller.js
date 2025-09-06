function openCell(row, col) {
  if (!inBounds(row, col)) return;
  var i = row * COLS + col;
  var ch = board.charAt(i);

  // allerede åpen -> ingenting å gjøre
  if (!isClosed(ch)) return;

  // bombe åpnes til 'B', tall til '1'..'8', blank til '·'
  var opened = toOpen(ch);
  setCharAt(i, opened);

  // Dersom åpnet rute er blank ('·'): flood-fill naboer (ikke bomber)
  if (opened === '·') {
    var dr, dc, nr, nc;
    for (dr = -1; dr <= 1; dr++) {
      for (dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        nr = row + dr; nc = col + dc;
        if (!inBounds(nr, nc)) continue;
        // Ikke åpne bomber rekursivt
        var ni = nr * COLS + nc;
        var nch = board.charAt(ni);
        if (nch === 'b') continue;        // lukket bombe
        if (!isClosed(nch)) continue;     // allerede åpen
        // Åpne nabo; rekursjonen stopper naturlig på tall
        openCell(nr, nc);
      }
    }
  }

  updateView();
}