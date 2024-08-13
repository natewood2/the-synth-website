import { rain } from './rain.js';
import { snow } from './snow.js';
import { dayNight } from './dayandnight.js';

document.addEventListener('DOMContentLoaded', function () {

  // Handles mechanics of the menu
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(button => {
    button.addEventListener('click', function () {
      const dropdownContent = this.nextElementSibling;

      if (dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
        dropdownContent.classList.add('hide');
      } else {
        dropdownContent.classList.add('show');
        dropdownContent.classList.remove('hide');
      }
    });
  });

  const toggles = document.querySelectorAll('.toggleButton');
  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      if (!toggle.style.color) {
        toggle.style.color = 'grey';
      }
      toggle.style.color = toggle.style.color === 'grey' ? 'white' : 'grey';
    });
  });
});

export function menuScenesSelector(scene, renderer) {
  // map to access specific functions for each effect
  const idMap = {
    'dayNightToggle': dayNight,
    'rainToggle': rain,
    'snowToggle': snow
  };

  // State to track active effects
  const activeEffects = {
    'dayNightToggle': true,
    'rainToggle': false,
    'snowToggle': false
  };

  const toggles = document.querySelectorAll('.toggleButton');
  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      // Check to not have rain/snow on at the same time
      if (toggle.id === 'rainToggle' && activeEffects['snowToggle']) {
        document.getElementById('snowToggle').style.color = 'grey';
        snow(scene, 'off');
        activeEffects['snowToggle'] = false;
      } else if (toggle.id === 'snowToggle' && activeEffects['rainToggle']) {
        rain(scene, 'off');
        document.getElementById('rainToggle').style.color = 'grey';
        activeEffects['rainToggle'] = false;
      }

      const sceneFunc = idMap[toggle.id];
      if (sceneFunc) {
        if (activeEffects[toggle.id]) {
          if (toggle.id === 'dayNightToggle' && activeEffects['dayNightToggle'] === true) {
            dayNight(renderer, scene, 'off');
            activeEffects['dayNightToggle'] = false;
            return;
          }
          // Turn off the effect
          sceneFunc(scene, 'off');
          activeEffects[toggle.id] = false;
        } else {
          if (toggle.id === 'dayNightToggle' && activeEffects['dayNightToggle'] === false) {
            dayNight(renderer, scene, 'on');
            activeEffects['dayNightToggle'] = true;
            return;
          }
          // Turn on the effect
          sceneFunc(scene, 'on');
          activeEffects[toggle.id] = true;
        }
      }
    });
  });
}
