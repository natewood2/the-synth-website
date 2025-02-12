import { dayNight } from './dayandnight.js';
import { menuScenesSelector } from './menu.js';
import { drumPadCity, stopDrumSequence, startDrumSequence, handleDrumInteraction, clearDrumSequence } from './drumpadcity.js';

// Loader logic
let interval;
let progress = 0;

function startLoading() {
    const loadingText = document.getElementById('loading-text');
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');

    progress = 0;
    loadingText.textContent = '0%';
    loadingScreen.style.display = 'flex';
    mainContent.style.display = 'none';

    // Clears
    if (interval) clearInterval(interval);

    // Begins loading
    interval = setInterval(function () {
        progress += 1;
        if (progress > 100) progress = 100;

        loadingText.textContent = Math.round(progress) + '%';

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(function () {
                loadingScreen.style.display = 'none';
                mainContent.style.display = 'block';
            }, 500);
        }
    }, 400);
}

function checkScreenSize() {
    if (window.innerWidth <= 768) {
        document.getElementById('mobile-warning').style.display = 'flex';
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'none';
    } else {
        document.getElementById('mobile-warning').style.display = 'none';
        startLoading();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    checkScreenSize();
});

window.addEventListener('resize', checkScreenSize);

// Scene setup
// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Set initial camera position
camera.position.set(0, 1.2, 3); // x, y, z
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Set up constraints for the OrbitControls
controls.minPolarAngle = 0; // Prevent looking below the horizon
controls.maxPolarAngle = Math.PI / 2; // Prevent looking above 90 degrees

controls.minAzimuthAngle = -Math.PI / 2; // Limit left rotation to 90 degrees
controls.maxAzimuthAngle = Math.PI / 2; // Limit right rotation to 90 degrees

// Set up zoom constraints
controls.minDistance = 1; // Minimum zoom distance
controls.maxDistance = 2; // Maximum zoom distance

// Function to clamp the camera's position
function clampCameraPosition() {
    if (camera.position.y < 0) {
        camera.position.y = 0;
    }
}

// Load Models
const loader = new THREE.GLTFLoader();
const dracoLoader = new THREE.DRACOLoader();
dracoLoader.setDecoderPath('static/draco/'); // Path to local Draco decoder
loader.setDRACOLoader(dracoLoader); // Path to Draco decoder

loader.load('static/assets/cabin_only.glb', function (gltf) {
    // Position the model
    const position = { x: -0.25, y: -2.27, z: 1.3 }; // x = left/right y = -up/+down z = +front/-back
    gltf.scene.position.set(position.x, position.y, position.z);

    // Rotate the model counterclockwise 90 degrees around the y-axis
    gltf.scene.rotation.y = Math.PI / 2;

    // Add the scaled and positioned model to the scene
    scene.add(gltf.scene);

    console.log('Cabin Loaded');
}, undefined, function (error) {
    console.error(error);
});

loader.load('static/assets/cabin_yard.glb', function (gltf) {

    // Position the model
    const position = { x: -0.25, y: -2.27, z: 1.3 }; // x = left/right y = -up/+down z = +front/-back
    gltf.scene.position.set(position.x, position.y, position.z);

    // Rotate the model counterclockwise 90 degrees around the y-axis
    gltf.scene.rotation.y = Math.PI / 2;

    // Add the scaled and positioned model to the scene
    scene.add(gltf.scene);

    console.log('Yard Loaded');
}, undefined, function (error) {
    console.error(error);
    });


loader.load('static/assets/synth.glb', function (gltf) {
    // Position the model
    const position = { x: -.08, y: 0, z: 0 };
    const scale = .2; // Change this value to scale the model
    gltf.scene.scale.set(scale, scale, scale);
    gltf.scene.position.set(position.x, position.y, position.z);
    scene.add(gltf.scene);
    console.log('synth loaded');
    updateSynthButtonColors();
    updateText(synthTextUpdate(), 'sequence');
    // Traverse the GLTF scene to find the buttons and lights
    gltf.scene.traverse((child) => {
        if (child.isMesh && child.name.startsWith('button-')) {
            const index = parseInt(child.name.split('-')[1], 10);
            child.userData.note = getNoteFromIndex(index);
            buttons[index] = child;
        } else if (child.isMesh && child.name.startsWith('light-')) {
            const index = parseInt(child.name.split('-')[1], 10);
            lights[index] = child;
        } else if (child.isMesh && child.name === 'play-button') {
            child.userData.isPlayButton = true;
        } else if (child.isMesh && child.name === 'synth-button') {
            child.userData.isSynthButton = true;
        } else if (child.isMesh && child.name === 'tempo-up') {
            child.userData.isTempoUpButton = true;
        } else if (child.isMesh && child.name === 'tempo-down') {
            child.userData.isTempoDownButton = true;
        } else if (child.isMesh && child.name === 'volume-up') {
            child.userData.isVolumeUpButton = true;
        } else if (child.isMesh && child.name === 'volume-down') {
            child.userData.isVolumeDownButton = true;
        } else if (child.isMesh && child.name === 'clear-button') {
            child.userData.isClearButton = true;
        }
    });
}, undefined, function (error) {
    console.error(error);
});

drumPadCity(scene, loader, 'static/assets/drumpadcity.glb');


// Variables to use when updating screen
let fontTmp; // used to hold the font out of the loader scope
let tempoText;
let volumeText;
let sequenceText;
let synthText;

// Tone setup
const synths = [
    new Tone.DuoSynth().toDestination(),
    new Tone.Synth().toDestination(),
    new Tone.AMSynth().toDestination(),
    new Tone.FMSynth().toDestination(),
    new Tone.MonoSynth().toDestination(),
    new Tone.PolySynth().toDestination()
];

let currentSynthIndex = 0;
let synth = synths[currentSynthIndex];

function switchSynth() {
    currentSynthIndex = (currentSynthIndex + 1) % synths.length;
    synth = synths[currentSynthIndex];
    updateText(`${synth.name}`, 'synth');
}

// effects
const reverb = new Tone.Reverb({
    decay: 4,
    preDelay: 0.5,
    wet: 0.9
}).toDestination();

const delay = new Tone.FeedbackDelay("8n", 0.5).toDestination();

const chorus = new Tone.Chorus({
    frequency: 1.5,
    delayTime: 3.5,
    depth: 0.9,
    spread: 180,
    wet: 0.5
}).toDestination();

const autoWah = new Tone.AutoWah({ baseFrequency: 100, octaves: 6 }).toDestination();
const distortion = new Tone.Distortion(0.2).toDestination();

// effect chain
synth.chain(chorus, delay, reverb, autoWah, Tone.Destination);

// Scene Effects
dayNight(renderer, scene, 'on'); // Set to day time by default
setTimeout(menuScenesSelector(scene, renderer), 0);// push to the que so this doesnt slow down load times

const tempoOptions = [90, 120, 130, 140];
let currentTempoIndex = 1; // 1 fo 120 index

Tone.Transport.bpm.value = tempoOptions[currentTempoIndex];

const buttons = [];
const lights = [];

const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
function getNoteFromIndex(index) {
    return notes[index - 1] || 'C4';
}

export function updateTempo() {
    const newTempo = tempoOptions[currentTempoIndex];
    Tone.Transport.bpm.value = newTempo;
    updateText(`${newTempo} bpm`, 'tempo');
}
let volume = 15;
synth.volume.value = -15;
function adjustVolume(buttonClicked) {
    const amountToChange = 5;
    if (buttonClicked === 'up' && volume < 30) {
        synth.volume.value += amountToChange;
        volume += amountToChange;
    } else if (buttonClicked == 'down' && volume > 0) {
        if (volume === 5) synth.mute;
        synth.volume.value -= amountToChange;
        volume -= amountToChange;
    }
    updateText(`Vol: ${volume}`, 'volume');
}

function clearButtonColor() {
    for (let index in buttons) {
        buttons[index].material.color.set(0xFFF9CA);
    }
}

// Logic for click events
let noteSequence = [];
let isPlaying = false;
let timeouts = [];

export function setSynthState(noteArray, newerTempo) {
  const synthState = JSON.parse(localStorage.getItem('synthNotes'));
  let sequenceToUse = noteArray || synthState;
  if (noteArray === 'clear') {
    sequenceToUse = Array(8).fill(false);
  }
  localStorage.setItem('synthNotes', JSON.stringify(sequenceToUse));
  Object.assign(noteSequence, sequenceToUse);
  updateSynthButtonColors();
  updateText(synthTextUpdate(), 'sequence');
  currentTempoIndex = newerTempo || 1;
}
setSynthState(); //init noteSequence

document.addEventListener('click', function (event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    let offset = 152.01 / window.innerHeight;
    mouse.y += offset;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        if (intersectedObject.userData.isSynthButton) {
            switchSynth();
        } else if (intersectedObject.userData.note) {
            const index = parseInt(intersectedObject.name.split('-')[1], 10) - 1;
            noteSequence[index] = !noteSequence[index]; // Toggle the step
            let buttonColor = intersectedObject.material.color;
            buttonColor.set(noteSequence[index] ? 0xff0000 : 0xFFF9CA);
            updateText(synthTextUpdate(), 'sequence');
            setSynthState(noteSequence);
        } else if (intersectedObject.userData.isPlayButton) {
            if (!isPlaying) {
                // Start the audio context if it is not already started
                Tone.start().then(() => {
                    startSequence();
                    startDrumSequence();
                }).catch((error) => {
                    console.error('Failed to start audio context:', error);
                });
            } else {
                stopSequence();
                stopDrumSequence();
            }
        } else if (intersectedObject.userData.isTempoUpButton) {
            if (currentTempoIndex < tempoOptions.length - 1) {
                currentTempoIndex++;
                updateTempo();
            }
        } else if (intersectedObject.userData.isTempoDownButton) {
            if (currentTempoIndex > 0) {
                currentTempoIndex--;
                updateTempo();
            }
        } else if (intersectedObject.userData.isVolumeUpButton) {
            adjustVolume('up');
        } else if (intersectedObject.userData.isVolumeDownButton) {
            adjustVolume('down');
        } else if (intersectedObject.userData.isClearButton) {
            stopSequence();
            clearButtonColor();
            setSynthState(Array(8).fill(false));
            updateText('', 'sequence');
        } else {
            handleDrumInteraction(intersectedObject);
        }
    }
});

function startSequence() {
    // Clear any existing timeouts
    timeouts.forEach(clearTimeout);
    timeouts = [];

    isPlaying = true;
    playSequence();
}

function stopSequence() {
    isPlaying = false;

    // Clear all timeouts
    timeouts.forEach(clearTimeout);
    timeouts = [];

    // Turn off all lights
    lights.forEach(light => {
        if (light) {
            light.material.color.set(0x000000);
        }
    });
}

function playSequence() {
    if (!isPlaying) return;

    let now = Tone.now();
    const stepDuration = 60 / Tone.Transport.bpm.value;

    noteSequence.forEach((isActive, index) => {
        const time = now + index * stepDuration;
        const buttonIndex = index;

        timeouts.push(setTimeout(() => {
            if (!isPlaying) return;
            const light = lights[buttonIndex + 1];
            if (light) {
                light.material.color.set(0xff0000);
            }
        }, (time - now) * 1000));

        timeouts.push(setTimeout(() => {
            if (!isPlaying) return;
            const light = lights[buttonIndex + 1];
            if (light) {
                light.material.color.set(0x000000);
            }
        }, (time - now + 0.3) * 1000));

        if (isActive) {
            const note = getNoteFromIndex(buttonIndex + 1);
            synth.triggerAttackRelease(note, '8n', time);
        }
    });

    timeouts.push(setTimeout(() => playSequence(), noteSequence.length * stepDuration * 1000));
}
// Dynamic screen for synth
// Load the font
const fontLoader = new THREE.FontLoader();
fontLoader.load('static/assets/Digital-7_Regular.json', function (fontLoaded) {
    fontTmp = fontLoaded;

    setTimeout(() => {
        updateText('Loading...', 'all');
    }, 2000);
    setTimeout(() => {
        updateText('120 bpm', 'tempo');
        updateText(`Vol: 15`, 'volume');
        updateText('', 'sequence');
        updateText('duoSynth', 'synth');
    }, 3000);
});

function updateText(text, textToUpdate) {
    const textGeometry = new THREE.TextGeometry(text, {
        font: fontTmp,
        size: 1,
        height: 0.1, // z axis of letters
        bevelEnabled: false
    });
    const scale = .009;
    const rotation = -(Math.PI / 2);
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    if (textToUpdate === 'tempo' || textToUpdate === 'all') {
        scene.remove(tempoText);
        tempoText = new THREE.Mesh(textGeometry, textMaterial);
        tempoText.rotation.x = rotation;
        tempoText.scale.set(scale, scale, scale);
        tempoText.position.set(-0.07, 0.044, -0.03); //position.set(left/right, in/out, up/down)
        scene.add(tempoText);
    }
    if (textToUpdate === 'volume' || textToUpdate === 'all') {
        scene.remove(volumeText);
        volumeText = new THREE.Mesh(textGeometry, textMaterial);
        volumeText.rotation.x = rotation;
        volumeText.scale.set(scale, scale, scale);
        volumeText.position.set(0, 0.044, -0.03);
        scene.add(volumeText);
    }
    if (textToUpdate === 'sequence' || textToUpdate === 'all') {
        scene.remove(sequenceText);
        sequenceText = new THREE.Mesh(textGeometry, textMaterial);
        sequenceText.rotation.x = rotation;
        sequenceText.scale.set(.0085, .0085, .0085);
        sequenceText.position.set(-0.075, 0.044, -0.05);
        scene.add(sequenceText);
    }
    if (textToUpdate === 'synth' || textToUpdate === 'all') {
        scene.remove(synthText);
        synthText = new THREE.Mesh(textGeometry, textMaterial);
        synthText.rotation.x = rotation;
        synthText.scale.set(.0085, .0085, .0085);
        synthText.position.set(-0.04, 0.044, -0.07);
        scene.add(synthText);
    }
}

// need to run the three.js
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    clampCameraPosition();
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

export function synthTextUpdate() {
  let currentNotes = '';
  for (let i = 0; i < 8; i++) {
    if (noteSequence[i]) {
      currentNotes += ' ' + notes[i];
    }
  }
  return currentNotes;
}

export function updateSynthButtonColors() {
  noteSequence.forEach((isActive, index) => {
    const buttonName = `button-${index + 1}`;
    const button = scene.getObjectByName(buttonName);

    if (button) {
      if (isActive) {
        button.material.color.set(0xff0000);
      } else {
        button.material.color.set(0xFFF9CA);
      }
    }
  });
}
