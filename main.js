song="";
leftWristX = 0;
leftWristY = 0;
RightWristX = 0;
RightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;


function preload()
{
song = loadSound("music.mp3");
}

function setup()
{
canvas = createCanvas(600,500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose',gotPoses);
}

function draw()
{
image(video,0,0,600,500);
fill("#FF0000");
stroke("#FF000");

if (scoreleftWrist > 0.2)
{

    circle(RightWristX,RightWristY,20);

    if(RightWristY >0 && RightWristY<=100)
    {
    document.getElementById("speed").innerHTML = "Speed = 0.5x";
    song.rate(0.5);
    }
    else if(RightWristY>100 && RightWristY <=200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(RightWristY>200 && RightWristY <=300)
    {
    document.getElementById("speed").innerHTML= "Speed = 1.5x";
    song.rate(1.5);
    }
    else if(RightWristY>300 && RightWristY <=400)
    {
    document.getElementById("speed").innerHTML = "Speed = 2x";
    song.rate(2);
    } 
    else if(RightWristY>400 && RightWristY <=500)
    {
    document.getElementById("speed").innerHTML = "speed = 2.5x";
    song.rate(2.5);
    }

circle(leftWristX,leftWristY,20);
InNumberleftWristY = Number(leftWristY);
remove_decimals = floor(InNumberleftWristY);
leftWristY_divide_1000 = remove_decimals/1000;
volume = leftWristY_divide_1000 * 2;
document.getElementById("volume").innerHTML = "volume = " + volume;
song.setVolume(volume);
}
}

function modelLoaded()
{
    console.log('poseNet is intialzed');
}

function gotPoses(results)
{
if(results.length > 0)
{
    console.log(results);
    scorerightWrist = results[0].pose.keypoints[10].score;
    scoreleftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist = " + scoreleftWrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

    RightWristX = results[0].pose.rightWrist.x;
    RightWristY = results[0].pose.rightWrist.y;
    console.log("rigthwristx = " + RightWristX + "rightwristy = " + RightWristY);
}
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}