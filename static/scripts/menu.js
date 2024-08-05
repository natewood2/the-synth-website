import { rain } from './rain.js';
import { snow } from './snow.js';
import { spotLight } from './spotlight.js';
import { stars } from './stars.js';
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

export function menuScenesSelector(scene) {
  const idMap = {
    'dayNightToggle': dayNight,
    'rainToggle': rain,
    'snowToggle': snow,
    'starToggle': stars,
    'spotlightToggle': spotLight
  };

  // State to track active effects
  const activeEffects = {
    'dayNightToggle': true,
    'rainToggle': false,
    'snowToggle': false,
    'starToggle': false,
    'spotlightToggle': false
  };

  const toggles = document.querySelectorAll('.toggleButton');
  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const sceneFunc = idMap[toggle.id];
      if (sceneFunc) {
        if (activeEffects[toggle.id]) {
          // Turn off the effect
          sceneFunc(scene, 'off');
          activeEffects[toggle.id] = false;
        } else {
          // Turn on the effect
          sceneFunc(scene, 'on');
          activeEffects[toggle.id] = true;
        }
      }
    });
  });
}
