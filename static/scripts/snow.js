export function Snow(scene) {
  const snowGeometry = new THREE.BufferGeometry();
  const snowCount = 10000;
  const snowPositions = new Float32Array(snowCount * 3);

  for (let i = 0; i < snowCount; i++) {
    snowPositions[i * 3] = Math.random() * 400 - 200;
    snowPositions[i * 3 + 1] = Math.random() * 500 - 250;
    snowPositions[i * 3 + 2] = Math.random() * 400 - 200;
  }

  snowGeometry.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));
  const snowMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 0.2,
    opacity: 0.6,
    transparent: true,
  });
  const snowParticles = new THREE.Points(snowGeometry, snowMaterial);

  scene.add(snowParticles);

  // Initialize drift directions
  const driftDirections = new Float32Array(snowCount * 3);
  for (let i = 0; i < snowCount; i++) {
    driftDirections[i * 3] = (Math.random() - 0.5) * 0.6; // Random X drift
    driftDirections[i * 3 + 1] = (Math.random() - 0.5) * 0.6; // Random Y drift
    driftDirections[i * 3 + 2] = (Math.random() - 0.5) * 0.6; // Random Z drift
  }

  function animateSnow() {
    requestAnimationFrame(animateSnow);

    // Update snow positions
    const speed = .7;
    const positions = snowParticles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] -= 0.1 + Math.random() * speed;
      positions[i] += driftDirections[i]; // side drift
      if (positions[i + 1] < - 100) {
        positions[i + 1] = Math.random() * 200; // Random Y position
        positions[i] = Math.random() * 400 - 200; // Randomize X position
        positions[i + 2] = Math.random() * 400 - 200; // Randomize Z position
      }
    }
    snowParticles.geometry.attributes.position.needsUpdate = true;
  }

  animateSnow();
}
