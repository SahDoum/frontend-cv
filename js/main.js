;(function () {
  var html = document.documentElement
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  var isMobile = false;
  console.log("IS MOBILE");
  console.log(isMobile);
  console.log(navigator.userAgent)
  console.log("IS SAFARI");
  console.log(isSafari);

  function onResize() {
    console.log("RESIZING");
    var width = document.body.clientWidth;
    var height = document.body.clientHeight;

    var isMobile = (width < 720);
    charWidth = 10
    charHeight = 19
    var cols = Math.floor(width / charWidth)
    var rows = Math.floor(height / charHeight)
    var lineHeightPx = height / rows

    if (isSafari) {
      lineHeightPx = Math.floor(lineHeightPx);
      rows = Math.ceil(height / lineHeightPx)
    }

    console.log(rows, lineHeightPx, height, lineHeightPx*rows)

    var fontSize = charWidth / 0.6 - 0.9
    var letterSpacing = (charWidth / 0.6 - fontSize) * 0.6

    if (isSafari) {
      var fontSizeRounded = Math.floor(charWidth / 0.6 - 0.3)
      letterSpacing = (charWidth / 0.6 - fontSizeRounded) * 0.6
      fontSize = fontSizeRounded
    }

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
    window._isMobile = isMobile
  }
  if (!('ontouchstart' in window)) {
    window.addEventListener('resize', onResize)
  }
  window.addEventListener('orientationchange', onResize)
  document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded")
    onResize()
});
  
})()
