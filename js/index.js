import { createApp } from 'vue';
import { _onload, updateCursor, torus_click, stopAnim} from './torus.js'
import Pong from './components/Pong.vue'
import ImageLoader from './components/ImageLoader.vue'


document.addEventListener('DOMContentLoaded', () => {
    _onload();
});


// const app = createApp({
//     data() {
//         return {
//             status: 0, // 0 -- torus, 1 -- cv, 2 -- pong, 3 -- cv-slide-down
//             torusAnim: true,
//             pongStart: false,
//             pongLine: "",
//             pongScore: 0,
//             pongTmr: null,
//         }
//     },
//     mounted() {

//         const options = {
//             root: null,
//             rootMargin: '0px',
//             threshold: 1.0,
//         };

//         const observer = new IntersectionObserver(this.handleIntersection, options);
//         observer.observe(document.querySelector("#intro"));
//     },
//     methods: {

//         handleIntersection: function(entries, observer) {

//             entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                     let elem = entry.target;

//                     if (entry.isIntersecting) {
//                         console.log("Intersection!");
//                         this.animateIntro();
//                     }
//                 }
//             });
//         },

//         // Pong handlers 

//         startPong: function(event) {
//             this.pongStart = true;
//             this.$refs.pong.setPongLineHandler(this.printPongLine);
//             this.$refs.pong.setPongScoreHandler(this.printPongScore);
//             this.$refs.pong.start();
//         },

//         printPongScore: function(score) {
//             this.pongScore = score;
//         },

//         printPongLine: function(string) {
//             var tmr = this.pongTmr;
//             var self = this;
//             if (tmr) clearInterval(tmr);

//             var word_write = function() {
//                 if (self.pongLine.length == string.length) {
//                     clearInterval(tmr);
//                     return;
//                 }
//                 self.pongLine = string.substr(0, self.pongLine.length + 1);
//             }

//             var word_erase = function() {
//                 if (self.pongLine.length == 0) {
//                     clearInterval(tmr);
//                     tmr = setInterval(word_write, 30);
//                     return;
//                 }
//                 self.pongLine = self.pongLine.slice(0, -1);
//             }

//             tmr = setInterval(word_erase, 20);

//         },

//         movePong: function(event) {
//             var rect = document.getElementById('canvas').getBoundingClientRect()
//             var x = event.clientX - rect.left;
//             var y = event.clientY - rect.top;
//             this.$refs.pong.move(x, y);
//         },

//         // End pong handlers

//         // Torus handlers

//         torusClick: async function(event) {
//             if (!torus_click()) {
//                 this.torusAnim = false;
//                 this.slideToNextScreen();
//                 await new Promise(r => setTimeout(r, 300));
//                 anim1();
//             }

//         },

//         torusMove: function(event) {
//             updateCursor(event);
//         },

//         // End totus handlers

//         // Intro animation

//         animateIntro: async function(event) {      
//             if (status != 0) return;
//             status = 1;

//             const introContainer = document.querySelector('#intro');
//             const nameItem = document.querySelector('.name-item');
//             const contactItem = document.querySelector('.contact-item');
//             const howButton = document.querySelector('#how-button');

//             await new Promise(r => setTimeout(r, 10));

//             document.documentElement.style.setProperty('--myTime', '.1s');
//             introContainer.classList.add('first-step');


//             // update font
//             await new Promise(r => setTimeout(r, 50));
//             nameItem.style.fontFamily = "'Redaction 35',sans-serif";
//             await new Promise(r => setTimeout(r, 100));
//             nameItem.style.fontFamily = "'Redaction 20',sans-serif";
//             await new Promise(r => setTimeout(r, 100));
//             nameItem.style.fontFamily = "'Redaction 10',sans-serif";
//             await new Promise(r => setTimeout(r, 100));
//             nameItem.style.fontFamily = "'Redaction',sans-serif";
//             await new Promise(r => setTimeout(r, 300));

//             // update font

//             introContainer.classList.add('second-step');
//             await new Promise(r => setTimeout(r, 50));
//             contactItem.style.fontFamily = "'Redaction 35',sans-serif";
//             await new Promise(r => setTimeout(r, 100));
//             contactItem.style.fontFamily = "'Redaction 20',sans-serif";
//             await new Promise(r => setTimeout(r, 100));
//             contactItem.style.fontFamily = "'Redaction 10',sans-serif";
//             await new Promise(r => setTimeout(r, 100));
//             contactItem.style.fontFamily = "'Redaction',sans-serif";
//             await new Promise(r => setTimeout(r, 250));



//             // document.documentElement.style.setProperty('--myTransition', 'var(--myBack)');
//             introContainer.classList.add('third-step');
//             await new Promise(r => setTimeout(r, 100));
//             howButton.classList.remove('hidden');
//             await new Promise(r => setTimeout(r, 200));
            
//             this.$refs.profile_img.startLoader();
//         },

//         // End intro animation

//         slideToNextScreen: async function() {
//             const secondLine = document.getElementById("second-line");
//             if (secondLine) {
//                 const scrollTop = secondLine.offsetTop;
//                 window.scrollTo({
//                     top: scrollTop,
//                     behavior: "smooth",
//                 });
//             }
//         },

//         skipAnimation: async function() {
//         },

//         startTransit: async function() {
//         },

//         slideToPong: async function() {
//             const row = document.querySelector(".containers-row");
//             const pong = document.getElementById("pong-container");
//             row.classList.add("show-pong");
//             pong.scrollIntoView({ behavior: "smooth",});
//             this.startPong();
//         },
        
//     }
// });

// app.component("image-loader", ImageLoader);
// app.component("pong", Pong);
// // app.mount("#app");



const introApp = createApp({

    data() {
        return {
            introAnim: false,
            torusAnim: true,
            pongLine: "",
            pongScore: 0,
            pongTmr: null,
        }
    },
    mounted() {

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1,
        };

        const observer = new IntersectionObserver(this.handleIntersection, options);

        if (window._isMobile) {
            observer.observe(document.querySelector("#intro-image"));
        }
    },
    methods: {
        startIntro: async function() {

            console.log(this.introAnim);
            console.log(window._isMobile);

            if (this.introAnim || window._isMobile) return;

            this.introAnim = true;

            await new Promise(r => setTimeout(r, 100));
            const myDiv = document.getElementById('intro');
            myDiv.classList.add('intro-start');
            await new Promise(r => setTimeout(r, 300));
            this.$refs.profile_img.startLoader();

        },

        slideToPong: async function() {
            // const row = document.querySelector(".containers-row");
            const pong = document.getElementById("pong-container");
            // row.classList.add("show-pong");
            pong.scrollIntoView({ behavior: "smooth",});
            this.startPong();
        },

        handleIntersection: function(entries, observer) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let elem = entry.target;

                    if (entry.isIntersecting) {
                        console.log("Intersection!");
                        this.$refs.profile_img.startLoader();
                    }
                }
            });
        },

        // Torus handlers

        torusClick: async function(event) {
            console.log("torus click")
            if (!torus_click()) {
                this.torusAnim = false;
                this.torusFinish();
            }
            // hold click
        },

        torusMove: function(event) {
            updateCursor(event);
        },

        torusFinish: function() {
            stopAnim();

            var spaceDiv = document.getElementById('space');
            var torusDiv = document.getElementById('torus');
            window.scrollTo({top: 0, behavior: 'instant'});
            document.body.classList.add('disable-scrolling');

            spaceDiv.style.display="none";
            torusDiv.classList.add('torus-hide');            

            setTimeout(() => {
                torusDiv.style.display = 'none';
                document.body.classList.remove('disable-scrolling');

            }, 2000);
        },

        // End totus handlers


        // Pong handlers 

        startPong: function(event) {
            this.pongStart = true;
            this.$refs.pong.setPongLineHandler(this.printPongLine);
            this.$refs.pong.setPongScoreHandler(this.printPongScore);
            this.$refs.pong.start();
        },

        printPongScore: function(score) {
            this.pongScore = score;
        },

        printPongLine: function(string) {
            var tmr = this.pongTmr;
            var self = this;
            if (tmr) clearInterval(tmr);

            var word_write = function() {
                if (self.pongLine.length == string.length) {
                    clearInterval(tmr);
                    return;
                }
                self.pongLine = string.substr(0, self.pongLine.length + 1);
            }

            var word_erase = function() {
                if (self.pongLine.length == 0) {
                    clearInterval(tmr);
                    tmr = setInterval(word_write, 30);
                    return;
                }
                self.pongLine = self.pongLine.slice(0, -1);
            }

            tmr = setInterval(word_erase, 20);

        },

        movePong: function(event) {
            var rect = document.getElementById('canvas').getBoundingClientRect()
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            this.$refs.pong.move(x, y);
        },

        // End pong handlers
    }
});
introApp.component("image-loader", ImageLoader);
introApp.component("pong", Pong);

introApp.mount("#intro-app");

// {
//   el: '#app',
//   render: (h) => h(App),
// });