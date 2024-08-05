let spotlight; //Must init out of function to use as reference when removing particles

export function spotLight(scene, action) {
  if (spotlight || action === 'off') {
    scene.remove(spotlight);
    spotlight = null;
    return
  }

  // Create a spotlight
  spotlight = new THREE.SpotLight(0xffff99);
  spotlight.position.set(0, 20, 0); // Overhead position
  spotlight.angle = Math.PI / 20; // Divide by more to make light smaller
  spotlight.penumbra = 0.3; // Increase for softer edges
  spotlight.decay = 2;
  spotlight.distance = 200;
  spotlight.intensity = 0.8; // Reduce intensity for its "opacity"

  // Shadow settings
  spotlight.castShadow = true;
  spotlight.shadow.mapSize.width = 1024;
  spotlight.shadow.mapSize.height = 1024;
  spotlight.shadow.camera.near = 10;
  spotlight.shadow.camera.far = 200;
  spotlight.shadow.camera.fov = 30;

  spotlight.name = 'spotLight';
  scene.add(spotlight);

  // spotlight helper to visualize
  // const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  // scene.add(spotLightHelper);
}

// color: The color of the light.Default is white(0xffffff).
// intensity: The brightness of the light.Default is 1.
// distance: The maximum range of the light.Default is 0(no limit).
// angle: The angle of the spotlight's cone. Default is Math.PI / 3.
// penumbra: The percent of the spotlight cone that is attenuated due to penumbra.Default is 0.
// decay: The amount the light dims along the distance of the light.Default is 1.
// position: The position of the light in the scene.
// target: The target position that the light is pointing at.
// castShadow: Whether the light casts shadows.Default is false.
// shadow: An object containing shadow - related properties:
//  shadow.bias: Shadow map bias.Default is 0.
//  shadow.radius: Shadow map radius.Default is 1.
//  shadow.mapSize: The width and height of the shadow map.Default is 512.
//  shadow.camera: The camera used to generate the shadow map.
//     shadow.camera.near: The near clipping plane of the shadow camera.Default is 0.5.
//     shadow.camera.far: The far clipping plane of the shadow camera.Default is 500.
//     shadow.camera.fov: The field of view of the shadow camera.Default is 50.
