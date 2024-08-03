export function Rain(scene) {
  const rainGeometry = new THREE.BufferGeometry();
  const rainCount = 5000;
  const rainPositions = new Float32Array(rainCount * 3);

  for (let i = 0; i < rainCount; i++) {
    rainPositions[i * 3] = Math.random() * 400 - 200;
    rainPositions[i * 3 + 1] = Math.random() * 500 - 250;
    rainPositions[i * 3 + 2] = Math.random() * 400 - 200;
  }

  rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
  const rainMaterial = new THREE.PointsMaterial({ color: 0xACACEE, size: 0.1 });
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
        positions[i + 1] = Math.random() * 200;
        positions[i] = Math.random() * 400 - 200; // X position
        positions[i + 2] = Math.random() * 400 - 200; // Z position
      }
    }
    rainParticles.geometry.attributes.position.needsUpdate = true;
  }

  animateRain();
}
