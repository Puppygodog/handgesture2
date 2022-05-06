Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});


camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'"/>';
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/SUReya8ul/model.json',modelLoaded);

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The. first. prediction. is" + prediction_1;
    speak_data_2 = "The. second. prediction. is. drumroll please. it is" + prediction_2;
    var utter_this = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utter_this);
 }

 function check(){
     img = document.getElementById("captured_image");
     classifier.classify(img,gotResult);
 }

 function gotResult(error,results){
        if(error){
            console.error(error);
        }
        else{
            console.log(results);
            document.getElementById("result_emotion_name").innerHTML = results[0].label;
            document.getElementById("result_emotion_name2").innerHTML = results[1].label;
            prediction_1 = results[0].label;
            prediction_2 = results[1].label;
            speak();
            if(results[0].label == "fist"){
                document.getElementById("update_image").innerHTML = "&#9994;";
            }
            if(results[0].label == "thumbs up"){
                document.getElementById("update_image").innerHTML = "&#128077;";
            }
            if(results[0].label == "love"){
                document.getElementById("update_image").innerHTML = "&#129304;";
            }
            if(results[1].label == "ok"){
                document.getElementById("update_image2").innerHTML = "&#128076;";
            }
            if(results[1].label == "clap"){
                document.getElementById("update_image2").innerHTML = "&#128079;";
            }
            if(results[1].label == "wave"){
                document.getElementById("update_image2").innerHTML = "&#128075;";
            }

        }   
 }