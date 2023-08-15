import { createApp } from 'vue';
import { _onload, updateCursor, torus_click, stopAnim, lastAnim} from './torus.js'
import Pong from './components/Pong.vue'
import ImageLoader from './components/ImageLoader.vue'
import TextLoader from './components/TextLoader.vue'

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
            const pong = document.getElementById("pong-container");
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

            lastAnim();
            var torusDiv = document.getElementById('torus');
            window.scrollTo({top: 0, behavior: 'instant'});
            document.body.classList.add('disable-scrolling');

            torusDiv.classList.add('torus-hide');            

            setTimeout(() => {
                torusDiv.style.display = 'none';
                document.body.classList.remove('disable-scrolling');
                stopAnim();

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
introApp.component("text-loader", TextLoader);
introApp.component("pong", Pong);

document.addEventListener('DOMContentLoaded', () => {
    console.log("index onload")
    introApp.mount("#intro-app");
    _onload();
});

// {
//   el: '#app',
//   render: (h) => h(App),
// });