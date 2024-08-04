export function spotLight(scene) {
  // Create a spotlight
  const spotLight = new THREE.SpotLight(0xffff99);
  spotLight.position.set(0, 20, 0); // Overhead position
  spotLight.angle = Math.PI / 20; // Divide by more to make light smaller
  spotLight.penumbra = 0.3; // Increase for softer edges
  spotLight.decay = 2;
  spotLight.distance = 200;
  spotLight.intensity = 0.8; // Reduce intensity for its "opacity"

  // Shadow settings
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 10;
  spotLight.shadow.camera.far = 200;
  spotLight.shadow.camera.fov = 30;

  scene.add(spotLight);

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
