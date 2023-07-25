let position = [0, 200];
const pointRect = {
  left: 40*16,
  top: 24*16
};
const R1 = 2.5;
var Dist = 5;

var cursorCoords = Math.ceil(window._cols*2.5) - 8;
var torus_mul = 1;
var particles = new Set();
var animTmr = undefined;
var A=0.8, B=0.3;
var final = 0;
var pretag;

var cursor_states = [
  [0, "CLICK LAST TIME!"],
  [0.75, "YEAH, GREAT, COOL, YOU ARE THE BEST <3", 4.5],
  [1, "NOT LIKE THIS!", 10],
  [1, "OOOPS... TRY AGAIN"],
  [0.1, "CLICK(ONE MORE!)"],
  [0.33, "CLICK(2)"],
  [0.66, "CLICK(3)"],
  [1, "CLICK(4)"],
];

var cursor_state = cursor_states.length - 1;

function dot(a, b) {
  return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
}

function lightCalc(x, y) {
  var magnitude = Math.sqrt(x*x+y*y);///3200; // no use of sqrt for perfomance
  if (magnitude === 0) {
    return [0, 0, -1]; // To handle zero-length vectors
  }
  const normalizedVector = [x / magnitude, y / magnitude, -1];
  return normalizedVector;
}

function createParticles() {
    const L = window._cols;
    const H = window._rows;
    const startX = Math.ceil(L/2);
    const startY = Math.ceil(H/2);

    var par = {
      x: startX + Math.random()*30-15,
      y: startY + Math.random()*20-10,
      z: Dist + Math.random()*20-10,
      vx: Math.random()*5-2.5,
      vy: Math.random()*3-2.5,
      vz: Math.random()-0.5,
      status: 30,
      type: Math.floor(Math.random() * 10),
    }

    return par;
  }

  var asciiframe=function() {
    const L = window._cols;
    const H = window._rows;
    const startX = Math.ceil(L/2);
    const startY = Math.ceil(H/2);

    var b=[];
    var z=[];
    A += 0.06;
    B += 0.032;
    var cA=Math.cos(A), sA=Math.sin(A),
        cB=Math.cos(B), sB=Math.sin(B);
    for(var k=0;k<L*H;k++) {
      b[k]=k%L == (L-1) ? "\n" : " ";
      z[k]=0;
    }

    var c1 = -cA*sB,
        c2 = cA*cB,
        c3 = sB*sA,
        c4 = sA*cB;

            // 1   0  0
            // 0  cA sA
            // 0 -sA cA

            //  cB sB 0
            // -sB cB 0
            //   0  0 1

            //     cB     sB  0
            // -cA*sB  cA*cB sA
            //  sA*sB -sA*cB cA

    var light = lightCalc(position[0], position[1]);
    for(var j=0;j<6.28*torus_mul;j+=0.01) { // j <=> theta
      var cp=Math.cos(j),sp=Math.sin(j);
      var prerow = [cp*cB+sp*c3, cp*sB-sp*c4, sp*cA];
      for(var i=0;i<6.28*5/5;i+=0.01) {   // i <=> phi
        var st=Math.sin(i),ct=Math.cos(i);

            // var prematrix = [prerow, [-cA*sB*st, cA*cB*st, sA*st]];

            // 0 st 0
            //
            // 

            // a11 a12 a13
            // a21 a22 a23
            // a31 a32 a33

            // a21*st
            // a22*st
            // a32*st


            // ct 0 0
            //
            // 

            // a11 a12 a13
            // a21 a22 a23
            // a31 a32 a33

            // a11*ct
            // a21*ct
            // a31*ct


            var normal = [ct*prerow[0] + c1*st, ct*prerow[1] + c2*st, ct*prerow[2] + sA*st];
            var coords = [(normal[0])+R1*prerow[0], normal[1]+R1*prerow[1], normal[2]+R1*prerow[2]];

            D = 1/(coords[2]+Dist);
            var x=0|(startX+30*D*coords[0]),
                y=0|(startY+15*D*coords[1]),
                o=x+L*y;

            if(y<H && y>=0 && x>=0 && x<(L-1) && D>z[o])
            {
              var N=0|(8*(dot(normal, light)));
              z[o]=D;
              N = Math.ceil(N)
              b[o]=".,-~:;=!*#$@"[N>0?(N<12?N:11):0];
              //  ".,^~:;+!&$#@" custom
              //  ".,-~:;=!*#$@" default 
              //  ".lcuovsxwmag" letters
              //  ".,^~:vsxwmag" custom2
              //  $@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,"^`'.  // whole spectrum
            }
      }
    }

    for(let par of particles) {    
      par.vy += 0.1; 

      par.x += par.vx; 
      par.y += par.vy; 
      par.z += par.vz; 
      
      par.status -= 1;

      if (par.status == 0) {
        particles.delete(par);
        continue;
      }

      var D = 1/par.z;
      var x=Math.ceil(par.x),//30*par.x,
          y=Math.ceil(par.y),//15*par.y,
          o=x+L*y;

      if (y >= H) {
        particles.delete(par);
        continue;
      }
      if(y<H && y>=0 && x>=0 && x<(L-1) && D>z[o])
        {
          z[o]=D;
          b[o]="cooikiekccooikiekc"[par.type];
          //b[o]="coikekecocococ"[par.type];
      }
    }

    if (torus_mul == 0 && final < 0.45) {
      final += 0.001;
      var dX = Math.ceil(final*L);
      var dY = Math.ceil(final*H);
      for (var x = -dX; x <= dX; x++) {
        for (var y = -dY; y <= dY; y++) {
          var o=(x+startX)+L*(y+startY);
          b[o]='@';
        }
      }
    }

    if (cursor_state >= 0) {
      let state = cursor_states[cursor_state][1];
      b.splice(cursorCoords, state.length, '<span style="color:#6d9cbe;">' + state + '</span>');
      // b.splice(cursorCoords + window._cols - state.length - 2, state.length + 2, ' '.repeat(state.length + 2));
      // b.splice(cursorCoords - window._cols - 1, state.length + 2, ' '.repeat(state.length + 2));
      // b.splice(cursorCoords, cursor_states[cursor_state][1].length, cursor_states[cursor_state][1])

      // b.splice(cursorCoords + window._cols, cursor_states[cursor_state][1].length, ' '*cursor_states[cursor_state][1].length)
    }
    pretag.innerHTML = b.join("");
  };

export function startAnim() {
  if(animTmr === undefined) {
    animTmr = setInterval(asciiframe, 50);
  } 
};

export function _onload() {
  pretag = document.getElementById('d');
  startAnim();
}

export function updateCursor(event) {
  const mouseX = event.clientX - pointRect.left;
  const mouseY = event.clientY - pointRect.top;  
  position = [mouseX, mouseY];

  var x = Math.ceil(event.clientX/charWidth),
      y = Math.ceil(event.clientY/charHeight);
  var left_border = (window._cols-cursor_states[cursor_state][1].length-1);
  x = x<left_border?x:left_border;
  cursorCoords=x+window._cols*y;
};


export function torus_click() {
  cursor_state-=1;
  if (cursor_state < 0) {
    torus_mul = 0;
    return false;
  }
  // torus_mul = cursor_states[cursor_state][0];

    const finishValue = cursor_states[cursor_state][0]; 
    var finishDist = Dist;
    if (cursor_states[cursor_state].length > 2) {
      finishDist = cursor_states[cursor_state][2]; 
    }


    let totalSteps = 10;
    const step = (finishValue - torus_mul) / totalSteps; 
    const dist_step = (finishDist - Dist) / totalSteps; 

    const interval = setInterval(() => {
      torus_mul += step; 
      Dist += dist_step;
      // if ((step > 0 && torus_mul >= finishValue) || (step < 0 && torus_mul <= finishValue)) {
      //   torus_mul = finishValue;
      //   clearInterval(interval); // Stop the interval when finishValue is reached
      // }

      totalSteps--;

      if (totalSteps == 1) {
        torus_mul = finishValue;
        Dist = finishDist; 
        clearInterval(interval);
      }

    }, 100);
  


  // if (cursor_states[cursor_state].length > 2) {
  //   Dist = cursor_states[cursor_state][2];
  // }
  updateCursor({clientX: position[0] + pointRect.left, clientY: position[1] + pointRect.top});
  for (var i = 0; i < 40; i++)
    particles.add(createParticles());
  return true;
};

export function stopAnim() {
    if(animTmr != undefined) {
      clearInterval(animTmr);
      animTmr = undefined;
    }
};
