// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent('sketch-container');
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
    console.log(poses)
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  // image(video, 0, 0, width, height);
  background(60, 0, 0)
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();

}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    let noseX = pose.nose.x
    let noseY = pose.nose.y
    let leftEarX = pose.leftEar.x
    let rightEarX = pose.rightEar.X
    let poseScore = pose.score
    let leftWristX = pose.leftWrist.X
    let leftWristY = pose.leftWrist.y
    // IDEAL DISTANCE IS ABOUT 6 FEET- SOCIAL DISTANCE CORONAVIRUS OHGOD-

    if (poseScore > 0.3) {
      fill(255)
      stroke(255)
      ellipseMode(CENTER)
      ellipse(noseX, noseY, 50)
      quad(pose.leftShoulder.x, pose.leftShoulder.y, pose.rightShoulder.x, pose.rightShoulder.y, pose.leftHip.x, pose.leftHip.y, pose.rightHip.x, pose.rightHip.y)

      strokeWeight(6)
      line(pose.leftShoulder.x, pose.leftShoulder.y, pose.leftElbow.x, pose.leftElbow.y)
      line(pose.leftElbow.x, pose.leftElbow.y, pose.leftWrist.x, pose.leftWrist.y)

      line(pose.rightShoulder.x, pose.rightShoulder.y, pose.rightElbow.x, pose.rightElbow.y)
      line(pose.rightElbow.x, pose.rightElbow.y, pose.rightWrist.x, pose.rightWrist.y)

      line(pose.leftHip.x, pose.leftHip.y, pose.leftKnee.x, pose.leftKnee.y)
      line(pose.leftKnee.x, pose.leftKnee.y, pose.leftAnkle.x, pose.leftAnkle.y)

      line(pose.rightHip.x, pose.rightHip.y, pose.rightKnee.x, pose.rightKnee.y)
      line(pose.rightKnee.x, pose.rightKnee.y, pose.rightAnkle.x, pose.rightAnkle.y)

    }
        
      }
  }