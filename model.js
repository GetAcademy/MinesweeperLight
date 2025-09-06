var ROWS = 10;
var COLS = 10;
// Ett tegn per celle: b/B = bombe lukket/åpen, □/· = blank lukket/åpen,
// ₁–₈ = tall lukket, 1–8 = tall åpen.
var board =
'□₁₁₁□₁□₁□₁' + 
'₁b₂b₂₁₁₁□₁' + 
'₁₂b32₁₁₂₁₁' + 
'₁₂₃b32₁₂b₁' + 
'□₁₂b32b32₁' + 
'□₁₂₂32₁₂₁' + 
'□₁b222₂b21' + 
'□₁₂b222₂₂₁' + 
'□₁₂₂₃₂₂₁₁' + 
'□₁b21₁₁□₁';