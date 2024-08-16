# The Synth Website

**Repository:** `the-synth-website`

## Project Overview

The Synth Website is an interactive 3D web experience created using HTML5, CSS, and JavaScript. This project leverages **Three.js** for rendering 3D scenes and **Tone.js** for implementing synth sounds, resulting in a unique audio-visual experience directly in the browser.

## Features

- **3D Synthesizer**: A fully interactive 3D synthesizer modeled in Blender, allowing users to create and manipulate sounds in real-time.
- **Drum Pad**: An accompanying drum pad that loops in with the synthesizer, adding rhythm and depth to your music.
- **Pre-made Note Sequences**: A dropdown menu lets you play pre-made note sequences to explore the possibilities of the synth.
  
  ![pre-made_beats_gif](https://github.com/user-attachments/assets/a2c472e5-8723-40db-866a-d2a7241a1756)

- **Environmental Effects**: Toggle between different environments with effects like rain, snow, and day/night cycles, adding an immersive layer to the scene.
  
  ![cabin_elements_gif](https://github.com/user-attachments/assets/e18a4f42-3766-42fa-90fa-074be2e9832b)
  ![cabin_img](https://github.com/user-attachments/assets/300b19cd-0523-4a87-8bb0-725276752627)

- **Blender Integration**: All 3D objects and the scene were created in Blender, showcasing advanced modeling and animation techniques.

## Technologies Used

- **HTML5 & CSS**: The backbone for structuring and styling the website.
- **JavaScript**: Provides interactivity and dynamic content.
- **Three.js**: Powers the 3D aspects of the project with the following specific elements:
  - **Font Loader**: For loading and displaying custom fonts within the 3D scene.
  - **Text Geometry**: To create 3D text elements.
  - **Orbit Controls**: Allowing users to navigate the 3D scene interactively.
  - **GLTF Loader**: For importing 3D models created in Blender.
  - **Draco Loader**: To decompress and load optimized 3D models.
- **Tone.js**: Manages the audio aspects, allowing for real-time sound synthesis.
- **Blender**: Used for modeling and animating the 3D objects.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, etc.)
- A local server (optional for viewing the site locally)

### Cloning the Repository

To clone and run this project locally:

```bash
git clone https://github.com/natewood2/the-synth-website.git
cd the-synth-website
```

Simply open the index.html file in your web browser. For better performance and access to all features, you may want to use a local server.

## Authors
- **[David Alsabrook](https://github.com/dalsabrook)**
- **[Nathan Wood](https://github.com/natewood2)**
