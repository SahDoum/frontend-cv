import { introApp, examplesApp, tbApp } from './app.js'


document.addEventListener('DOMContentLoaded', () => {
    if (document.body.contains(document.getElementById("app"))) {
            introApp.mount("#app");

            console.log("SCROLL");
            const should_skip = localStorage.getItem("torus-skip");
            console.log(should_skip)
            if (should_skip == "1") {
                const container = document.getElementById("main-container");
                container.scrollIntoView({ behavior: "smooth",});
            }
            localStorage.setItem("torus-skip", "1");
            if (should_skip == "1") {
                localStorage.setItem("torus-skip", "0");
            }

            console.log(localStorage.getItem("torus-skip"));
    }
    if (document.body.contains(document.getElementById("app-examples"))) {
            examplesApp.mount("#app-examples");
    }
    if (document.body.contains(document.getElementById("tb-app"))) {
            tbApp.mount("#tb-app");
    }
});

// {
//   el: '#app',
//   render: (h) => h(App),
// });
