;(function () {
  var html = document.documentElement
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

  function onResize() {
    var width = innerWidth
    var height = innerHeight
    charWidth = 10
    charHeight = 19
    var cols = Math.floor(width / charWidth)
    var rows = Math.floor(height / charHeight)
    var lineHeightPx = height / rows
    if (isSafari) {
      lineHeightPx = Math.floor(lineHeightPx);
      rows = Math.ceil(height / lineHeightPx)
    }

    var fontSize = charWidth / 0.6 - 0.9
    var letterSpacing = (charWidth / 0.6 - fontSize) * 0.6

    html.style = `
      --cols: ${cols};
      --rows: ${rows};
      --char-width: ${charWidth}px;
      --line-height: ${lineHeightPx}px;
      --letter-spacing: ${letterSpacing}px;
      --font-size:${fontSize}px;
      --screen-height: ${screen.availHeight};
      --half-rows: ${Math.floor(rows / 2)};
      --vh-height: ${height * 0.01}px;
    `

    window._charWidth = charWidth
    window._charHeight = charHeight
    window._rows = rows
    window._cols = cols
    window._lineHeight = lineHeightPx
  }
  if (!('ontouchstart' in window)) {
    window.addEventListener('resize', onResize)
  }
  window.addEventListener('orientationchange', onResize)
  onResize()
})()
