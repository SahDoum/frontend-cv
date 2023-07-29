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

//
        
                                    z && q && u.splice(c - 2, 5, "c", "l", "i", "c", "k"),

//


        function iy(e, t) {
            return new i_[e](t)
        }
        function iM(e) {
            return document.createElementNS("http://www.w3.org/1999/xhtml", e)
        }
        function ib(e) {
            return e < .04045 ? .0773993808 * e : Math.pow(.9478672986 * e + .0521327014, 2.4)
        }
        function iS(e) {
            return e < .0031308 ? 12.92 * e : 1.055 * Math.pow(e, .41666) - .055
        }

static sRGBToLinear(e)
            {
                if ("undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap) {
                    let t = iM("canvas");
                    t.width = e.width,
                    t.height = e.height;
                    let i = t.getContext("2d");
                    i.drawImage(e, 0, 0, e.width, e.height);
                    let n = i.getImageData(0, 0, e.width, e.height),
                        r = n.data;
                    for (let a = 0; a < r.length; a++)
                        r[a] = 255 * ib(r[a] / 255);
                    return i.putImageData(n, 0, 0), t
                }
                if (!e.data)
                    return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
                {
                    let s = e.data.slice(0);
                    for (let o = 0; o < s.length; o++)
                        s instanceof Uint8Array || s instanceof Uint8ClampedArray ? s[o] = Math.floor(255 * ib(s[o] / 255)) : s[o] = ib(s[o]);
                    return {
                        data: s,
                        width: e.width,
                        height: e.height
                    }
                }
            }
//


    1922: function(e, A, s) {
        "use strict";
        var c = s(5893),
            t = s(5675),
            n = s.n(t),
            r = s(7294),
            i = s(274),
            a = s.n(i),
            l = s(313),
            d = s(2674),
            o = s(6760);
        let h = e => new Promise(A => setTimeout(A, e)),
            x = [],
            u = e => {
                let {src: A, immediate: s=!1, sizes: t, alwaysText: i=!1, onLoadingComplete: u} = e,
                    [j, p] = (0, r.useState)(x.includes(A.src)),
                    g = (0, r.useRef)(null),
                    z = (0, r.useRef)(null),
                    w = (0, r.useRef)(null),
                    m = (0, r.useRef)(null),
                    E = (0, r.useRef)(null),
                    v = (0, r.useRef)(null),
                    f = (0, r.useRef)(e => e / 12),
                    C = (0, r.useRef)(null),
                    O = (0, r.useRef)(null),
                    M = (0, r.useRef)(null),
                    [b, B] = (0, r.useState)({}),
                    D = (0, r.useRef)(!1),
                    Q = (0, r.useRef)(s),
                    _ = e => {
                        g.current && (g.current.innerHTML = e)
                    },
                    {textMode: I, rainbowMode: y} = (0, d.Z)(),
                    N = (0, r.useCallback)(() => {
                        if (w.current && z.current && C.current && O.current && M.current && m.current) {
                            let {width: e, height: A} = z.current.getBoundingClientRect();
                            if (!e || !A) {
                                console.warn("Width or height is zero in the image wrapper");
                                return
                            }
                            let s = I || i ? Math.ceil(A / window._lineHeight) * window._lineHeight : A;
                            z.current.style.paddingBottom = "".concat(s / e * 100, "%"),
                            w.current.style.width = "".concat(e, "px"),
                            w.current.style.height = "".concat(s, "px"),
                            C.current.width = f.current(e),
                            C.current.height = f.current(s),
                            w.current.width = e,
                            w.current.height = s,
                            O.current.drawImage(v.current, 0, 0, f.current(e), f.current(s)),
                            I || i ? (M.current.ctx.drawImage(C.current, 0, 0, e, s), _(M.current.getChars())) : (m.current.imageSmoothingEnabled = !1, m.current.webkitImageSmoothingEnabled = !1, m.current.drawImage(C.current, 0, 0, e, s))
                        }
                    }, [v, I]);
                (0, r.useEffect)(() => {
                    w.current && (m.current = w.current.getContext("2d"), m.current.webkitImageSmoothingEnabled = !1, m.current.imageSmoothingEnabled = !1)
                }, []),
                (0, r.useEffect)(() => {
                    if (E.current && z.current && (!M.current && !C.current || I || i)) {
                        var e,
                            A;
                        M.current = (0, l.ZP)(g.current),
                        C.current = document.createElement("canvas"),
                        O.current = C.current.getContext("2d"),
                        v.current = E.current,
                        m.current && (m.current.imageSmoothingEnabled = !1),
                        window.addEventListener("resize", N),
                        (null === (e = E.current) || void 0 === e ? void 0 : e.complete) ? N() : null === (A = E.current) || void 0 === A || A.addEventListener("load", N)
                    }
                    return () => {
                        window.removeEventListener("resize", N)
                    }
                }, [N, I]);
                let L = async () => {
                        if (z.current) {
                            let e = z.current.querySelector("img");
                            if (e) {
                                if (v.current = e, I || x.includes(A.src))
                                    I && N();
                                else
                                    for (let s = 16; s > 0; s -= 3)
                                        await h(40),
                                        f.current = e => e / s,
                                        N();
                                p(!0),
                                x.push(A.src)
                            }
                        }
                        u && u()
                    },
                    k = "/_next/image?url=".concat(encodeURIComponent(A.src), "&w=64&q=20"),
                    R = {};
                return t && (R.sizes = t), (0, r.useEffect)(() => {
                    B(I && y ? {
                        "data-rainbow": !0
                    } : {})
                }, [y, I]), (0, c.jsxs)("div", {
                    className: [a().wrapper, j ? a().loaded : "", I || i ? a().textMode : ""].join(" "),
                    ref: z,
                    style: {
                        paddingBottom: "".concat(A.height / A.width * 100, "%")
                    },
                    ...b,
                    children: [(0, c.jsx)(o.h, {
                        onEnter() {
                            Q.current = !0,
                            D.current && L()
                        }
                    }), (0, c.jsx)(n(), {
                        src: A,
                        alt: "",
                        onLoadingComplete() {
                            D.current = !0,
                            Q.current && L()
                        },
                        ...R
                    }), (0, c.jsxs)("div", {
                        className: a().loader,
                        children: [(0, c.jsx)("img", {
                            src: k,
                            ref: E,
                            alt: "",
                            width: "64"
                        }), (0, c.jsx)("canvas", {
                            ref: w
                        })]
                    }), (0, c.jsx)("div", {
                        className: a().letters,
                        ref: g
                    })]
                })
            };
        A.Z = u
    },



    313: function(e, t, n) {
        "use strict";
        n.d(t, {
            GO: function() {
                return r
            },
            MJ: function() {
                return o
            },
            ZP: function() {
                return i
            }
        });
        let r = e => {
                let {r: t, g: n, b: r} = e;
                return .21 * t + .72 * n + .07 * r
            },
            o = "NNN@O$0A869#452I3=7+1/:-\xb7`\xa0",
            a = e => o[Math.ceil((o.length - 1) * e / 255)];
        function i(e) {
            let t = 0,
                n = 0;
            e = e || document.body;
            let o = document.createElement("canvas"),
                i = document.createElement("canvas"),
                l = o.getContext("2d"),
                s = i.getContext("2d"),
                c = () => {
                    if (e) {
                        let r = e.getBoundingClientRect();
                        t = r.width,
                        n = r.height
                    } else
                        t = window.innerWidth,
                        n = window.innerHeight;
                    let a = window._charWidth,
                        l = window._charHeight;
                    o.width = t,
                    o.height = n,
                    i.width = Math.floor((t + 5) / a),
                    i.height = Math.floor((n + 8) / l)
                },
                u = "ontouchstart" in window ? "orientationchange" : "resize";
            window.addEventListener(u, c),
            c();
            let d = "",
                p = () => {
                    s.clearRect(0, 0, i.width, i.height),
                    s.fillStyle = "#fff",
                    s.fillRect(0, 0, i.width, i.height);
                    try {
                        s.drawImage(o, 0, 0, i.width, i.height);
                        let e = s.getImageData(0, 0, i.width, i.height);
                        d = "";
                        for (let t = 0; t < e.data.length; t += 4) {
                            let [n, l, c] = e.data.slice(t, t + 3),
                                u = r({
                                    r: n,
                                    g: l,
                                    b: c
                                }),
                                p = (t / 4 + 1) % i.width == 0;
                            d += "".concat(a(u)).concat(p ? "\n" : "")
                        }
                    } catch (h) {}
                    return d
                },
                h = () => {
                    window.removeEventListener("resize", c)
                };
            return {
                getChars: p,
                getWidth: () => t,
                getHeight: () => n,
                ctx: l,
                destroy: h,
                resize: c
            }
        }
    },






"/_next/static/media/i10.71d9d23f.jpg"



            let S = async()=>{
                if (j.current) {
                    let A = j.current.querySelector("img");
                    if (A) {
                        if (B.current = A,
                        y || u.includes(e.src))
                            y && N();
                        else
                            for (let r = 16; r > 0; r -= 3)
                                await h(40),
                                f.current = A=>A / r,
                                N();
                        m(!0),
                        u.push(e.src)
                    }
                }
                g && g()
            }
              , R = "/_next/image?url=".concat(encodeURIComponent(e.src), "&w=64&q=20")
              , M = {};




// resizing

                        i.useCallback)(()=>{
                if (w.current && j.current && D.current && v.current && p.current && z.current) {
                    let {width: A, height: e} = j.current.getBoundingClientRect();
                    if (!A || !e) {
                        console.warn("Width or height is zero in the image wrapper");
                        return
                    }
                    let r = y || t ? Math.ceil(e / window._lineHeight) * window._lineHeight : e;
                    j.current.style.paddingBottom = "".concat(r / A * 100, "%"),
                    w.current.style.width = "".concat(A, "px"),
                    w.current.style.height = "".concat(r, "px"),
                    D.current.width = f.current(A),
                    D.current.height = f.current(r),
                    w.current.width = A,
                    w.current.height = r,
                    v.current.drawImage(B.current, 0, 0, f.current(A), f.current(r)),
                    y || t ? (p.current.ctx.drawImage(D.current, 0, 0, A, r),
                    k(p.current.getChars())) : (z.current.imageSmoothingEnabled = !1,
                    z.current.webkitImageSmoothingEnabled = !1,
                    z.current.drawImage(D.current, 0, 0, A, r))
                }
            }

// init

                     (0,
            i.useEffect)(()=>{
                w.current && (z.current = w.current.getContext("2d"),
                z.current.webkitImageSmoothingEnabled = !1,
                z.current.imageSmoothingEnabled = !1)
            }
            , []),
            (0,
            i.useEffect)(()=>{
                if (O.current && j.current && (!p.current && !D.current || y || t)) {
                    var A, e;
                    p.current = (0,
                    c.ZP)(E.current),
                    D.current = document.createElement("canvas"),
                    v.current = D.current.getContext("2d"),
                    B.current = O.current,
                    z.current && (z.current.imageSmoothingEnabled = !1),
                    window.addEventListener("resize", N),
                    (null === (A = O.current) || void 0 === A ? void 0 : A.complete) ? N() : null === (e = O.current) || void 0 === e || e.addEventListener("load", N)
                }
                return ()=>{
                    window.removeEventListener("resize", N)
                }
            }

// loop

                                      for (let r = 16; r > 0; r -= 3)
                                await h(40),
                                f.current = A=>A / r,
                                N();


// promise await

                                        let h = A=>new Promise(e=>setTimeout(e, A))
