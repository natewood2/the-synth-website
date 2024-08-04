export function rain(scene) {
  if (scene === "off") {
    console.log('turn off PLEASE');
    return
  }
  const rainGeometry = new THREE.BufferGeometry();
  const rainCount = 2000;
  const rainPositions = new Float32Array(rainCount * 3);

  // For each particle this loop sets it to spawn randomly along x, y, and z
  for (let i = 0; i < rainCount; i++) {
    // Storing in a "flat" array instead of an object
    // ex: [particle1-x, particle1-y, particle1-z, particle2-x, particle2-y, particle2-z]
    rainPositions[i * 3] = Math.random() * 200 - 100; // x
    rainPositions[i * 3 + 1] = Math.random() * 250 - 125; // y
    rainPositions[i * 3 + 2] = Math.random() * 200 - 100; // z
  }

  rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
  // This is setting up the rains look, size, and color
  const rainMaterial = new THREE.PointsMaterial({
    color: 0xACACEE,
    size: 0.1,
    transparent: true,
    opacity: 0.8,
  });
  const rainParticles = new THREE.Points(rainGeometry, rainMaterial);

  scene.add(rainParticles);

  function animateRain() {
    requestAnimationFrame(animateRain);

    const rainSpeed = 4;
    // Update rain positions
    const positions = rainParticles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] -= .2 + Math.random() * rainSpeed;
      if (positions[i + 1] < -100) {
        positions[i + 1] = Math.random() * 200; // y
        positions[i] = Math.random() * 200 - 100; // x
        positions[i + 2] = Math.random() * 200 - 100; // z
      }
    }
    rainParticles.geometry.attributes.position.needsUpdate = true;
  }

  animateRain();
}
