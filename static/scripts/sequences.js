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

  const buttonState = {
    'fast': false,
    'chill': false,
    'vibes': false,
  }


  fastBtn.addEventListener('click', function () {
    if (buttonState['fast'] === false) {
      //Turning on
      buttonState['fast'] = true;

      synthNoteSequence = [true, false, true, false, true, false, true, false]; //Change this to set synth notes
      tempoIndex = 3; //set tempo index from main file
      setSynthState(synthNoteSequence, tempoIndex);
      updateTempo(); //update tempo and screen text

      drumsNoteSequence = { //Change these to change drumn pad notes
        "kick": [
          true, false, true, false,
          true, false, true, false,
          true, false, true, false],
        "snare": [
          true, false, true, false,
          true, false, true, false,
          true, false, true, false],
        "hat": [
          false, true, false, true,
          false, true, false, true,
          false, true, false, true]
      };
      setDrumState(drumsNoteSequence);

    } else if (buttonState['fast'] === true){
      // Turning off
      buttonState['fast'] = false;
      setSynthState('clear'); // sets note array to all false
    }
  });


  chillBtn.addEventListener('click', function () {
    if (buttonState['chill'] === false) {
      //Turning on
      buttonState['chill'] = true;

      synthNoteSequence = [true, true, true, true, true, true, true, true]; //Change this to set synth notes
      tempoIndex = 3; //set tempo index from main file
      setSynthState(synthNoteSequence, tempoIndex);
      updateTempo(); //update tempo and screen text

      drumsNoteSequence = { //Change these to change drumn pad notes
        "kick": [
          true, false, true, false,
          true, false, true, false,
          true, false, true, false],
        "snare": [
          true, false, true, false,
          true, false, true, false,
          true, false, true, false],
        "hat": [
          false, true, false, true,
          false, true, false, true,
          false, true, false, true]
      };
      setDrumState(drumsNoteSequence);


    } else if (buttonState['chill'] === true) {
      // Turning off
      buttonState['chill'] = false;
      setSynthState('clear'); // sets note array to all false
    }
  });


  vibesBtn.addEventListener('click', function () {
    if (buttonState['vibes'] === false) {
      //Turning on
      buttonState['vibes'] = true;

      synthNoteSequence = [true, false, false, false, false, false, false, false]; //Change this to set synth notes
      tempoIndex = 3; //set tempo index from main file
      setSynthState(synthNoteSequence, tempoIndex);
      updateTempo(); //update tempo and screen text

      drumsNoteSequence = { //Change these to change drumn pad notes
        "kick": [
          true, false, true, false,
          true, false, true, false,
          true, false, true, false],
        "snare": [
          true, false, true, false,
          true, false, true, false,
          true, false, true, false],
        "hat": [
          false, true, false, true,
          false, true, false, true,
          false, true, false, true]
      };
      setDrumState(drumsNoteSequence);


    } else if (buttonState['vibes'] === true) {
      // Turning off
      buttonState['vibes'] = false;
      setSynthState('clear'); // sets note array to all false
    }
  });
});
