function updateView(){
  var html = '<div class="board" style="--cols:'+COLS+'">';
  var r, c, i, ch;
  for(r=0;r<ROWS;r++){
    for(c=0;c<COLS;c++){
      i=r*COLS+c; ch=board.charAt(i);
      if(isClosed(ch)){
        html += '<div class="cell closed" onclick="openCell('+r+','+c+')"></div>';
      } else {
        // Åpne celler: blank, tall 1-8, bombe
        var cls = 'cell open';
        var content = '';
        if(ch==='·'){ content=''; }                 // blank
        else if(ch==='B'){ content='💣'; cls+=' bomb'; } // bombe
        else { content=ch; cls+=' '+getNumberClass(ch); } // tall 1-8
        html += '<div class="'+cls+'">'+escapeHtml(content)+'</div>';
      }
    }
  }
  html += '</div>';
  document.getElementById('app').innerHTML = html;
}

function getNumberClass(ch){
  // ch er '1'..'8' (åpen)
  if(ch==='1') return 'n1';
  if(ch==='2') return 'n2';
  if(ch==='3') return 'n3';
  if(ch==='4') return 'n4';
  if(ch==='5') return 'n5';
  if(ch==='6') return 'n6';
  if(ch==='7') return 'n7';
  if(ch==='8') return 'n8';
  return '';
}