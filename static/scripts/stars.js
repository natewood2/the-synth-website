let starField;

export function stars(scene, action) {
  if (starField || action === 'off') {
    scene.remove(starField);
    starField.geometry.dispose();
    starField.material.dispose();
    starField = undefined;
    return;
  }

  const starGeometry = new THREE.BufferGeometry();
  const starCount = 5000;
  const starPositions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 1000; // X position
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 1000; // Y position
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 1000; // Z position
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));


  // Create a circular texture
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext('2d');
  context.beginPath();
  context.arc(32, 32, 30, 0, Math.PI * 2);
  context.fillStyle = 'white';
  context.fill();


  const texture = new THREE.CanvasTexture(canvas);
  const starSize = Math.random() * 2; // Random size for each star
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: starSize,
    map: texture,
    transparent: true,
  });

  starField = new THREE.Points(starGeometry, starMaterial);

  scene.add(starField);
}
