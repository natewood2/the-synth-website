let ambientLight;
let directionalLight;
let lampLight;
let texture;
let skyColor;
// Load in an image to be used as the distant background
const geometry = new THREE.PlaneGeometry(300, 100); // width/height
const textureLoader = new THREE.TextureLoader();
const day = textureLoader.load('./static/assets/mountains foggy.png');
const night = textureLoader.load('./static/assets/mountains foggy night.png');
const sunColor = 0xfff7e8; // Warm yellowish color
const eveningColor = 0xffa07a; // Soft orange color

export function dayNight(renderer, scene, action) {
  if (ambientLight || directionalLight) {
    scene.remove(directionalLight);
    scene.remove(ambientLight);
    directionalLight.dispose();
    ambientLight.dispose();
    ambientLight = undefined;
    directionalLight = undefined;
  }


  if (action === 'on') {
    // Day mode (Sunlight)
    texture = day;
    skyColor = 0xa3c0d7;
    ambientLight = new THREE.AmbientLight(sunColor, 1);
    scene.add(ambientLight);
    directionalLight = new THREE.DirectionalLight(sunColor, 1);
    directionalLight.position.set(0, 4, 2).normalize();
    scene.add(directionalLight);
  } else if (action === 'off') {
    // Evening mode
    texture = night;
    skyColor = 0x1f2123;
    ambientLight = new THREE.AmbientLight(eveningColor, 1);
    scene.add(ambientLight);

    directionalLight = new THREE.DirectionalLight(eveningColor, 1);
    directionalLight.position.set(0, 4, 2).normalize();
    scene.add(directionalLight);

    lampLight = new THREE.DirectionalLight(eveningColor, 1);
    lampLight.position.set(0, 0, 0).normalize();
    scene.add(lampLight);
  }

  renderer.setClearColor(skyColor);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  // Original plane
  const plane1 = new THREE.Mesh(geometry, material);
  plane1.position.z = -70;  // distance from camera
  plane1.position.y = 30;
  scene.add(plane1);

  // Left plane
  const plane2 = new THREE.Mesh(geometry, material);
  plane2.rotation.y = Math.PI / 2;
  plane2.position.x = -150;
  plane2.position.y = 12;
  plane2.position.z = -70;
  scene.add(plane2);

  // Right plane
  const plane3 = new THREE.Mesh(geometry, material);
  plane3.rotation.y = -Math.PI / 2;
  plane3.position.x = 150;
  plane3.position.y = 10;
  plane3.position.z = -70;
  scene.add(plane3);
}
