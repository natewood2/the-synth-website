//Must init out of function to use as reference when removing particles
let snowParticles;

export function snow(scene, action) {
  if (snowParticles || action === 'off') {
    // Check if we are turning off the effect and then remove it and set to null
    scene.remove(snowParticles);
    snowParticles.geometry.dispose();
    snowParticles.material.dispose();
    snowParticles = null;
    return
  }

  const snowGeometry = new THREE.BufferGeometry();
  const snowCount = 5000;
  const snowPositions = new Float32Array(snowCount * 3);
  const speed = .5;
  for (let i = 0; i < snowCount; i++) {
    snowPositions[i * 3] = Math.random() * 200 - 100;
    snowPositions[i * 3 + 1] = Math.random() * 250 - 120;
    snowPositions[i * 3 + 2] = Math.random() * 200 - 100;
  }

  snowGeometry.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));
  const snowMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 0.2,
    opacity: 0.6,
    transparent: true,
  });
  snowParticles = new THREE.Points(snowGeometry, snowMaterial);

  scene.add(snowParticles);

  // Initialize drift directions
  const driftDirections = new Float32Array(snowCount * 3);
  for (let i = 0; i < snowCount; i++) {
    driftDirections[i * 3] = (Math.random() - 0.5) * 0.6; // Random X drift
    driftDirections[i * 3 + 1] = (Math.random() - 0.5) * 0.6; // Random Y drift
    driftDirections[i * 3 + 2] = (Math.random() - 0.5) * 0.6; // Random Z drift
  }

  function animateSnow() {
    if (!snowParticles) return;
    requestAnimationFrame(animateSnow);

    // Update snow positions

    const positions = snowParticles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] -= 0.1 + Math.random() * speed;
      positions[i] += driftDirections[i]; // side drift
      if (positions[i + 1] < - 100) {
        positions[i + 1] = Math.random() * 200 - 100; // Random Y position
        positions[i] = Math.random() * 200 - 100; // Randomize X position
        positions[i + 2] = Math.random() * 200 - 100; // Randomize Z position
      }
    }
    snowParticles.geometry.attributes.position.needsUpdate = true;
  }

  animateSnow();
}
