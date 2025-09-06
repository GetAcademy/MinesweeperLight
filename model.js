var ROWS = 10;
var COLS = 10;
// Ett tegn per celle: b/B = bombe lukket/åpen, □/· = blank lukket/åpen,
// ₁–₈ = tall lukket, 1–8 = tall åpen.
var board =
'₁₁₃b₃₁₁₁₁□' +
'₁b₃bb₁₁b₂₁' +
'₂₂₃₂₃₂₂₂b₁' +
'₁b₁□₁b₁₁₁₁' +
'₁₁₁₁₂₂₁□□□' +
'□□□₁b₁□□₁₁' +
'□□□₁₂₂₁□₁b' +
'₁₁₁□₁b₂₁₁₁' +
'₁b₁₁₂₃b₁□□' +
'₁₁₁₁b₂₁₁□□';