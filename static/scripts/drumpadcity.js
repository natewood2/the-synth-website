const drumSteps = 12;
let currentDrumInstrument = 'kick';
let isDrumPlaying = false;

const drumSequenceData = {
    kick: Array.from({ length: drumSteps }, () => false),
    snare: Array.from({ length: drumSteps }, () => false),
    hat: Array.from({ length: drumSteps }, () => false),
};

const drumPads = [];
const drumSelectionLights = [];
let drumPlayer;


// Load the glb file and place in scene
export function drumPadCity(scene, loader, modelPath) {
  loader.load(modelPath, function (gltf) {
    const position = { x: .3, y: 0, z: 0 };
    const scale = .02; // Change this value to scale the model
    gltf.scene.scale.set(scale, scale, scale);
    gltf.scene.position.set(position.x, position.y, position.z);
    gltf.scene.rotation.y = Math.PI;
    // Add the scaled and positioned model to the scene
    scene.add(gltf.scene);
    console.log('Drum pad glb loaded');
    initializeDrumSequencer(gltf.scene);
  }, undefined, function (error) {
    console.error(error);
  });
}

// Put tone sounds to each button
function initializeDrumSequencer(drumScene) {
  console.log('Tone in drum init:');
  console.log(Tone);
  drumPlayer = new Tone.Players({
    kick: 'Samples/kick.wav',
    snare: 'Samples/snare.wav',
    hat: 'Samples/hi-hat.wav',
  }).toDestination();
  console.log(`drumPlayer: `)
  console.log(drumPlayer)
    drumScene.traverse((child) => {
        if (child.isMesh) {
            if (child.name.startsWith('pad-')) {
                const index = parseInt(child.name.split('-')[1], 10) - 1;
                drumPads[index] = child;
                drumPads[index].material = drumPads[index].material.clone();
                child.userData.padIndex = index;
            } else if (child.name.startsWith('slection-light-')) {
                const index = parseInt(child.name.split('-')[2], 10) - 1;
                drumSelectionLights[index] = child;
                drumSelectionLights[index].material = drumSelectionLights[index].material.clone();
            } else if (child.name === 'kick-button' || child.name === 'snare-button' || child.name === 'hat-button') {
                child.userData.instrument = child.name.split('-')[0];
            } else if (child.name === 'clear-button') {
                child.userData.isClearButton = true;
            }
        }
    });
    selectDrumInstrument('kick');
}

// Turn the light on for whatever instrument is selected
function selectDrumInstrument(instrument) {
  currentDrumInstrument = instrument;
  updateDrumPadVisuals();

  drumSelectionLights.forEach(light => {
    if (light) {
      light.material.emissive.setHex(0x000000);
    }
  });

  const instrumentToLightIndex = {
    'kick': 0,
    'snare': 1,
    'hat': 2
  };

  const lightIndex = instrumentToLightIndex[instrument];
  if (drumSelectionLights[lightIndex]) {
    drumSelectionLights[lightIndex].material.emissive.setHex(0xff0000);
  }
}


function updateDrumPadVisuals() {
  drumPads.forEach((pad, index) => {
    if (pad) {
      const isActive = drumSequenceData[currentDrumInstrument][index];
      pad.material.color.setHex(isActive ? 0xff0000 : 0xFFF9CA);
    }
  });
}


export function handleDrumInteraction(intersectedObject) {
  if (intersectedObject.userData.padIndex !== undefined) {
      const index = intersectedObject.userData.padIndex;
      drumSequenceData[currentDrumInstrument][index] = !drumSequenceData[currentDrumInstrument][index];
      updateDrumPadVisuals();
  } else if (intersectedObject.userData.instrument) {
      selectDrumInstrument(intersectedObject.userData.instrument);
  } else if (intersectedObject.userData.isClearButton) {
      clearDrumSequence();
  }
}


function clearDrumSequence() {
  Object.keys(drumSequenceData).forEach(instrument => {
      drumSequenceData[instrument] = Array.from({ length: drumSteps }, () => false);
  });
  updateDrumPadVisuals();
}

let currentDrumStep = 0;
function playDrumStep(time) {
  drumPads.forEach((pad, index) => {
      if (pad) {
          pad.material.emissive.setHex(index === currentDrumStep ? 0x0077be : 0x000000);
      }
  });

  ['kick', 'snare', 'hat'].forEach(instrument => {
      if (drumSequenceData[instrument][currentDrumStep]) {
          drumPlayer.player(instrument).start(time);
      }
  });

  currentDrumStep = (currentDrumStep + 1) % drumSteps;
}

export function startDrumSequence() {
  if (!isDrumPlaying) {
      Tone.Transport.scheduleRepeat((time) => {
          Tone.Draw.schedule(() => playDrumStep(time), time);
      }, "8n");
      Tone.Transport.start();
      isDrumPlaying = true;
  }
}

export function stopDrumSequence() {
  if (isDrumPlaying) {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      isDrumPlaying = false;
      currentDrumStep = 0;
      drumPads.forEach(pad => {
          if (pad) {
              pad.material.emissive.setHex(0x000000);
          }
      });
  }
}

// window.addEventListener('mousemove', function (event) {
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
// }, false);

// Mouse click event listener
// window.addEventListener('click', function () {
//   raycaster.setFromCamera(mouse, camera);
//   const intersects = raycaster.intersectObjects(scene.children, true);

//   if (intersects.length > 0) {
//       handleDrumInteraction(intersects[0].object);
//   }
// }, false);
