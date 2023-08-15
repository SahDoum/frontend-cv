window.addEventListener('DOMContentLoaded', function() {

    var r = document.querySelector(':root');
    var s = document.querySelector('.slider-container-main');

    function nrmlz(v) {
        if (v > 1) return 1;
        if (v < 0) return 0;
        return v;
    }

    function getCoeffs() {
        var top = s.getBoundingClientRect().top;

        var c = 1 - top / window.innerHeight;
        c = c*6;

        return [
            nrmlz(c - 3),
            nrmlz(c - 3.5),
            nrmlz(c - 4),
            nrmlz(c - 4.5)
        ];
    }

    window.addEventListener('scroll', function() {

        var coeffs = getCoeffs();
        r.style.setProperty('--s1',      coeffs[0]);
        r.style.setProperty('--s1_text', (50 - coeffs[0] * 40) + '%');
        r.style.setProperty('--s1_out',  (11 - coeffs[0] * 11) + 'vw');

        r.style.setProperty('--s2_text', (50 - coeffs[1] * 40) + '%');
        r.style.setProperty('--s2_out',  ((1 - coeffs[1]) * 200/9) + 'vw');

        r.style.setProperty('--s3',       coeffs[2]);
        r.style.setProperty('--s3_text', (50 - coeffs[2] * 40) + '%');

        r.style.setProperty('--s4',       coeffs[3]);
        r.style.setProperty('--s4_text', (50 - coeffs[3] * 40) + '%');

    })

});
