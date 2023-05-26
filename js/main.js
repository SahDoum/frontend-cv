;(function () {
  var html = document.documentElement
  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

  function onResize() {
    console.log("ONRES")
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
    // if (isSafari) {
    //   console.log("SAFARI")
    //   var fontSize = Math.floor(charWidth / 0.6 - 0.3)
    // }
    var letterSpacing = (charWidth / 0.6 - fontSize) * 0.6

    console.log(height)
    console.log(rows)
    console.log(lineHeightPx)

    var animationTimings = {
      IntroF: 0.9,
      IntroS: 0.5,
      IntroT: 0.3,
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
      --animation-intro-f: ${animationTimings.IntroF}s;
      --animation-intro-s: ${animationTimings.IntroS}s;
      --animation-intro-t: ${animationTimings.IntroT}s;
    `

    window._charWidth = charWidth
    window._charHeight = charHeight
    window._rows = rows
    window._cols = cols
    window._lineHeight = lineHeightPx
    window._animationTimings = animationTimings;
  }
  if (!('ontouchstart' in window)) {
    window.addEventListener('resize', onResize)
  }
  window.addEventListener('orientationchange', onResize)
  onResize()
})()
