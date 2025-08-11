// replacing letters on hover/mouseover

     let v = {
            a: ["4"],
            e: ["3"],
            o: ["#", "*"],
            s: ["5", "$"],
            g: ["6"],
            i: ["1"]
        }

          , g = e=>{
            if ("A" === e.target.nodeName) {
                let t = e.target.innerText;
                if (!t.trim() || !e.target.firstChild || e.target.firstChild.nodeType !== Node.TEXT_NODE)
                    return;
                e.target.setAttribute("data-text", t);
                let n = [...t.matchAll(/e/gi), ...t.matchAll(/g/gi), ...t.matchAll(/i/gi), ...t.matchAll(/o/gi), ...t.matchAll(/s/gi), ...t.matchAll(/a/gi)];
                n.sort(()=>.5 - Math.random()).slice(0, 1 + Math.floor(2 * Math.random())).forEach(e=>{
                    t = t.split("");
                    let n = v[e[0].toLowerCase()];
                    t.splice(e.index, 1, n[Math.floor(Math.random() * n.length)]),
                    t = t.join("")
                }
                ),
                e.target.innerText = t
            }
        }
