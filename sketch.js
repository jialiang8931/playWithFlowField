var scl = 50;
var cols, rows;
var inc = 0.1;
var zoff = 0;
var sliderAzimuth, sliderTolerance, sliderPerturbation;
var showAzimuth,   showTolerance,   showPerturbation;

function setup() {
  createCanvas(windowWidth, windowHeight*0.85);
  colorMode(HSB, 255);
  cols = floor(width / scl);
  rows = floor(height / scl);

  sliderAzimuth = createSlider(0, 360, 0);
  sliderTolerance = createSlider(0, 90, 22.5);
  sliderPerturbation  = createSlider(0, 100, 10);

  sliderAzimuth.position(0, windowHeight*0.82);
  sliderTolerance.position(200, windowHeight*0.82);
  sliderPerturbation.position(400, windowHeight*0.82);

  showAzimuth = createP();
  showTolerance = createP();
  showPerturbation = createP();

  showAzimuth.position(0, windowHeight*0.85);
  showTolerance.position(200, windowHeight*0.85);
  showPerturbation.position(400, windowHeight*0.85);

  showAzimuth.html(  "Azimuth:         " + sliderAzimuth.value());
  showTolerance.html("Angle Tolerance: " + sliderTolerance.value() + "°");
  showPerturbation.html("Perturbation:    " + sliderPerturbation.value() + "%");


  sliderAzimuth.input(changeAzi);
  sliderTolerance.input(changeTor);
  sliderPerturbation.input(changePur);
}



function changeAzi(){
  showAzimuth.html(  "Azimuth:         " + sliderAzimuth.value());
}

function changeTor(){
  showTolerance.html(  "Angle Tolerance:         " + sliderTolerance.value() + "°");
}

function changePur(){
  showPerturbation.html(  "Perturbation:         " + sliderPerturbation.value() + "%" );
}



function draw() {
  var azi = sliderAzimuth.value()/180*PI;
  var tor = round(180 / sliderTolerance.value());
  var incZ = sliderPerturbation.value() * 0.0025;
  background(255);
  for (var x=0; x<cols; x++){
    for (var y=0; y<rows; y++){
      stroke(0, 80);
      rects = rect(x*scl, y*scl, scl, scl);
    }
  }


  var xoff = 0;
  for (var x=0; x<cols; x++){
    var yoff = 0;
    for (var y=0; y<rows; y++){

      var ang = map(noise(xoff, yoff, zoff), 0, 1, azi-TWO_PI/tor, azi + TWO_PI/tor);     //(TWO_PI/16);
      var v = p5.Vector.fromAngle(ang);

      stroke(0);
      strokeWeight(3);
      push();
      translate(x*scl+scl/2, y*scl+scl/2);
      rotate(v.heading());
      triangle(scl/2, 0, (scl/2)*0.80, (scl/2)*0.1, (scl/2)*0.8, -(scl/2)*0.1);
      line(0, 0, scl*0.5, 0);
      pop();

      yoff += inc;
    }
    xoff += inc;
  }
  zoff += incZ;
}