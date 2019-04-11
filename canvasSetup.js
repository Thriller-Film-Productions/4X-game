// Whole thing is just canvas setup
const c = document.querySelector("canvas"); // get the only canvas element
const draw = c.getContext('2d'); // get canvas context
c.width = document.body.clientWidth; // make canvas full screen
c.height = document.body.clientHeight;


// add an off screen canvas for image rotation and such
const osC = document.createElement('canvas');
osC.width = 15266;
osC.height = 7357;
osC.style.position = "absolute";
osC.id = 'off-screen-canvas';
osC.hidden = false;
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

// adds an off screen canvas for drawing a highlight overlay
const osChighlight = document.createElement('canvas');
osChighlight.width = 15266;
osChighlight.height = 7357;
osChighlight.style.position = "absolute";
osChighlight.id = 'off-screen-canvas-highlight';
osChighlight.hidden = true;
const drawHighlight = osChighlight.getContext('2d');
document.body.appendChild(osChighlight);

// adds an off screen canvas for transforming the highlight overlay
const osChighlight2 = document.createElement('canvas');
osChighlight2.width = 8000;
osChighlight2.height = 8000;
osChighlight2.style.position = "absolute";
osChighlight2.id = 'off-screen-canvas-highlight-2';
osChighlight2.hidden = true;
const drawHighlight2 = osChighlight2.getContext('2d');
document.body.appendChild(osChighlight2);

//Saves canvas state
draw.save();
osDraw.save();
osDraw2.save();

// transforms map
osDraw.translate(osC.width / 2, 0);
osDraw.rotate(Math.PI / 4); //rotate 45 degrees
osDraw.transform(1, -0.35, -0.35, 1, 0, 0); //skew

// transforms highlight
drawHighlight.translate(osC.width / 2, 0);
drawHighlight.rotate(Math.PI / 4); //rotate 45 degrees
drawHighlight.transform(1, -0.35, -0.35, 1, 0, 0); //skew