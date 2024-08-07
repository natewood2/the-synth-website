let ambientLight;
let directionalLight;

export function dayNight(scene, action) {
  if (ambientLight || directionalLight) {
    scene.remove(directionalLight)
    scene.remove(ambientLight);
    directionalLight.dispose()
    ambientLight.dispose();
    ambientLight = undefined;
    directionalLight = undefined;
  }

  if (action === 'on') {
    // Day mode
    const dayColor = 0xffffff;
    ambientLight = new THREE.AmbientLight(dayColor, 1);
    scene.add(ambientLight);

    directionalLight = new THREE.DirectionalLight(dayColor, 1);
    directionalLight.position.set(2, 10, -10).normalize();
    scene.add(directionalLight);
  } else if (action === 'off') {
    // Night mode
    const nightColor = 0xB5D2ED;
    ambientLight = new THREE.AmbientLight(nightColor, 0.2);
    scene.add(ambientLight);

    directionalLight = new THREE.DirectionalLight(nightColor, .3);
    directionalLight.position.set(2, 10, 2).normalize();
    scene.add(directionalLight);
  }
}
