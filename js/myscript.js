/*function playAudio(url) {
  new Audio(url).play();
}*/
var preload;
var instances = [];

function init() {
    if (!createjs.Sound.initializeDefaultPlugins()) {
        document.getElementById("error").style.display = "block";
        document.getElementById("content").style.display = "none";
        return;
    }

    var assetsPath = "../sounds/";
    var sounds = [
	    {src:"1.mp3",id:1},
        {src:"2.mp3",id:2},
		{src:"3.mp3",id:3}
    ];

    createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this)); 
    createjs.Sound.registerSounds(sounds, assetsPath);
}

function soundLoaded(event) {
    var div = document.getElementById(event.id);
    div.innerHTML = div.dataset.label;
}

function stop() {
    if (preload != null) {
        preload.close();
    }
    if (instances.length > 0) {
        for (index = 0; index < instances.length; ++index) {
            var target = instances[index];
            target.innerHTML = target.dataset.label;
            target.className = "button";
        }
    }
    createjs.Sound.stop();
}

function playSound(target) {
	console.log('click!');
    stop();
    var instance = createjs.Sound.play(target.id, createjs.Sound.INTERRUPT_ANY, 0, 0, false, 1);

    if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
        return;
    }
    var text = target.innerHTML;
    var width = target.offsetWidth;

    target.innerHTML = '<img class="icon" src="/images/preloader.svg" width="40" height="25" alt="">';
    target.className = "audio active";
    target.style.width = width+"px";
    instance.addEventListener("complete", function (instance) {
        target.innerHTML = text;
        target.className = "audio";
    });
    instances.push(target);
    return false;
}
