export default function drumPadCity(scene, loader) {
  loader.load('./static/assets/drumpadcity.glb', function (gltf) {
    const position = { x: .3, y: 0, z: 0 };
    const scale = .02; // Change this value to scale the model
    gltf.scene.scale.set(scale, scale, scale);
    gltf.scene.position.set(position.x, position.y, position.z);
    gltf.scene.rotation.y = Math.PI;
    // Add the scaled and positioned model to the scene
    scene.add(gltf.scene);
    console.log(gltf);
    
  }, undefined, function (error) {
    console.error(error);
  });
};
