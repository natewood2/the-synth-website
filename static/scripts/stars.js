export function stars(scene) {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 5000;
  const starPositions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 1000; // X position
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 1000; // Y position
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 1000; // Z position
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
  const starField = new THREE.Points(starGeometry, starMaterial);

  scene.add(starField);
}
