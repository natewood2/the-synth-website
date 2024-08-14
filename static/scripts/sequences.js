import { setSynthState } from './main.js'

document.addEventListener('DOMContentLoaded', function () {
  let fastBtn = document.getElementById('fast');
  let chillBtn = document.getElementById('chill');
  let spaceBtn = document.getElementById('space');

  setSynthState();
  const buttonState = {
    'fast': false,
    'chill': false,
    'space': false,
  }
  fastBtn.addEventListener('click', function () {
    if (buttonState['fast'] === false) {
      //Turning on
      console.log('Fast on');
      buttonState['fast'] = true;
    } else if (buttonState['fast'] === true){
      // Turning off
      console.log('Fast off');
      buttonState['fast'] = false;
    }
  });
  chillBtn.addEventListener('click', function () {
    if (buttonState['chill'] === false) {
      //Turning on
      console.log('chill on');
      buttonState['chill'] = true;
    } else if (buttonState['chill'] === true) {
      // Turning off
      console.log('chill off');
      buttonState['chill'] = false;
    }
  });
  spaceBtn.addEventListener('click', function () {
    if (buttonState['space'] === false) {
      //Turning on
      console.log('space on');
      buttonState['space'] = true;
    } else if (buttonState['space'] === true) {
      // Turning off
      console.log('space off');
      buttonState['space'] = false;
    }
  });
});
