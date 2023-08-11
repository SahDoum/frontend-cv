window.addEventListener('DOMContentLoaded', function() {
    var root = document.querySelector(':root');
    var spaceDiv = document.getElementById('space');
    var animationDiv = document.getElementById('animation');
    var entryDiv = document.getElementById('entry');
    var bars = document.getElementsByClassName("bar");

    // set bars start animation
    function setBarHeights() {
        for (var i = 0; i < bars.length; i++) {

            var newHeight = Math.floor(Math.random() * 12)*3 + 5;

            var chance = Math.random();
            if (chance < 0.25) {
                newHeight = 100 - newHeight;
            }

            bars[i].style.height = newHeight + "vh";

        }
    }
    setTimeout(setBarHeights, 0);
    const barInterval = setInterval(setBarHeights, 2000);

    // intro animation:
    const lineDropTime = 2900*0.8;
    const introTime = 4300;
    function startIntroAnimation() {
        animationDiv.classList.add('start-anim');            

        setTimeout(() => {
            document.body.classList.remove('disable-scrolling');
            animationDiv.classList.add('hide-anim');
            entryDiv.classList.add('hide-anim');
            setTimeout(() => {
                entryDiv.style.display = 'none';
                animationDiv.style.display = 'none';
            }, 1000);

        }, introTime);
        setTimeout(() => {
            entryDiv.classList.add('start-anim');
        }, lineDropTime);
    }

    // start animation on click
    animationDiv.addEventListener('click', function() {
        window.scrollTo({top: 0, behavior: 'instant'});
        document.body.classList.add('disable-scrolling');
        spaceDiv.style.display="none";

        // set all bars to top (1 second)
        clearInterval(barInterval);
        root.style.setProperty('--bar-transition-time', '1s');
        for (var i = 0; i < bars.length; i++) {
            bars[i].style.height = "100vh";
        }

        setTimeout(startIntroAnimation, 1000);
        return false;
    });
});


