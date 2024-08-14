import { setSynthState, updateTempo } from './main.js';
import { setDrumState } from './drumpadcity.js';

document.addEventListener('DOMContentLoaded', function () {
  let fastBtn = document.getElementById('fast');
  let chillBtn = document.getElementById('chill');
  let vibesBtn = document.getElementById('vibes');
  let synthNoteSequence = []; //format to use [true, false, true, false, true, false, true, false]
  let drumsNoteSequence = {};
  //format to use
  // {"kick": [true, false, true, false, true, false, true, false, true, false, true, false],
  //   "snare": [true, false, true, false, true, false, true, false, true, false, true, false],
  //   "hat": [true, false, true, false, true, false, true, false, true, false, true, false]
  // }

  let tempoIndex = 1;

  const buttonState = JSON.parse(localStorage.getItem('buttonState')) || {
    'fast': false,
    'chill': false,
    'vibes': false,
  };

  function updateButtonColors() {
    fastBtn.style.color = buttonState['fast'] ? 'white' : 'grey';
    chillBtn.style.color = buttonState['chill'] ? 'white' : 'grey';
    vibesBtn.style.color = buttonState['vibes'] ? 'white' : 'grey';
  }

  function saveButtonState() {
    localStorage.setItem('buttonState', JSON.stringify(buttonState));
  }

  fastBtn.addEventListener('click', function () {
    if (buttonState['fast'] === false) {
      // Turning on
      buttonState['fast'] = true;
      buttonState['vibes'] = false;
      buttonState['chill'] = false;

      synthNoteSequence = [true, true, true, false, true, true, false, true]; // Change this to set synth notes
      tempoIndex = 3; // Set tempo index from main file
      setSynthState(synthNoteSequence, tempoIndex);
      updateTempo(); // Update tempo and screen text

      drumsNoteSequence = { // Change these to change drum pad notes
        "kick": [
          true, true, true, false,
          true, false, true, true,
          true, false, true, false],
        "snare": [
          true, true, true, false,
          false, false, true, false,
          false, true, true, false],
        "hat": [
          false, true, false, true,
          false, true, false, true,
          false, true, false, true]
      };
      setDrumState(drumsNoteSequence);
    } else if (buttonState['fast'] === true) {
      // Turning off
      buttonState['fast'] = false;
      setSynthState('clear'); // Sets note array to all false
    }
    updateButtonColors();
    saveButtonState();
  });

  chillBtn.addEventListener('click', function () {
    if (buttonState['chill'] === false) {
      // Turning on
      buttonState['chill'] = true;
      buttonState['fast'] = false;
      buttonState['vibes'] = false;

      synthNoteSequence = [true, true, false, true, true, false, true, false]; // Change this to set synth notes
      tempoIndex = 1; // Set tempo index from main file
      setSynthState(synthNoteSequence, tempoIndex);
      updateTempo(); // Update tempo and screen text

      drumsNoteSequence = { // Change these to change drum pad notes
        "kick": [
          true, true, false, false,
          false, false, true, true,
          true, false, false, false],
        "snare": [
          false, false, true, false,
          false, false, true, false,
          false, false, true, false],
        "hat": [
          false, true, false, true,
          false, true, false, true,
          false, true, false, true]
      };
      setDrumState(drumsNoteSequence);
    } else if (buttonState['chill'] === true) {
      // Turning off
      buttonState['chill'] = false;
      setSynthState('clear'); // Sets note array to all false
    }
    updateButtonColors();
    saveButtonState();
  });

  vibesBtn.addEventListener('click', function () {
    if (buttonState['vibes'] === false) {
      // Turning on
      buttonState['vibes'] = true;
      buttonState['fast'] = false;
      buttonState['chill'] = false;

      synthNoteSequence = [true, true, false, false, true, true, false, false]; // Change this to set synth notes
      tempoIndex = 1; // Set tempo index from main file
      setSynthState(synthNoteSequence, tempoIndex);
      updateTempo(); // Update tempo and screen text

      drumsNoteSequence = { // Change these to change drum pad notes
        "kick": [
          true, false, true, false,
          false, false, true, true,
          false, false, true, false],
        "snare": [
          true, false, false, false,
          false, false, true, false,
          false, false, true, false],
        "hat": [
          true, true, false, true,
          true, true, false, true,
          false, false, false, true]
      };
      setDrumState(drumsNoteSequence);
    } else if (buttonState['vibes'] === true) {
      // Turning off
      buttonState['vibes'] = false;
      setSynthState('clear'); // Sets note array to all false
    }
    updateButtonColors();
    saveButtonState();
  });

  // Initialize button colors on page load
  updateButtonColors();
});
