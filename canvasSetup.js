// Whole thing is just canvas setup
const c = document.querySelector("canvas"); // get the only canvas element
const draw = c.getContext('2d'); // get canvas context
c.width = document.body.clientWidth; // make canvas full screen
c.height = document.body.clientHeight;
const mixed3dC = document.createElement('canvas');
mixed3dC.width = 8000;
mixed3dC.height = 8000;
mixed3dC.style.position = "absolute";
mixed3dC.id = 'mixed-3d-graphics';
mixed3dC.hidden = true;
const mixed3dDraw = mixed3dC.getContext('2d');
document.body.appendChild(mixed3dC);
const mixed2dC = document.createElement('canvas');
mixed2dC.width = 8000;
mixed2dC.height = 8000;
mixed2dC.style.position = "absolute";
mixed2dC.id = 'mixed-2d-graphics';
mixed2dC.hidden = true;
const mixed2dDraw = mixed2dC.getContext('2d');
document.body.appendChild(mixed2dC);
// add an off screen canvas for image rotation and such
const osC = document.createElement('canvas');
osC.width = 15266;
osC.height = 7357;
osC.style.position = "absolute";
osC.id = 'off-screen-canvas';
osC.hidden = true;
const osDraw = osC.getContext('2d');
document.body.appendChild(osC);

// add an off screen canvas for drawing the map without transformations
const osC2 = document.createElement('canvas');
osC2.width = 8000;
osC2.height = 8000;
osC2.style.position = "absolute";
osC2.id = 'off-screen-canvas-2';
osC2.hidden = true;
const osDraw2 = osC2.getContext('2d');
document.body.appendChild(osC2);

//Saves canvas state
draw.save();

// transform 3d map draw
// mixed3dDraw.transform(0.35,1,1,1,0,0);

// transforms final rendered map
osDraw.translate(osC.width / 2, 0);
osDraw.rotate(Math.PI / 4); //rotate 45 degrees
osDraw.transform(1, -0.35, -0.35, 1, 0, 0); //skew
