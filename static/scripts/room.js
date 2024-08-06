let walls;
// Define boundaries
const boundaries = {
  minX: -10, // left
  maxX: 10,  // right
  minY: -4,  // down
  maxY: 10,  // up
  minZ: -10, // backward
  maxZ: 10   // forward
};
export { boundaries }; // For camera movement in main.html

export function room(scene, action) {
  if (walls || action === 'off') {
    for (let wall of walls) {
      scene.remove(wall);
    }
    return;
  }

  // Function to create walls with windows
  function createWallWithWindow(position, size) {
    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(size.width, size.height, size.depth),
      new THREE.MeshBasicMaterial({ color: 0x888888 })
    );

    // Create a window
    const window = new THREE.Mesh(
      new THREE.BoxGeometry(size.width * 0.8, size.height * 0.5, size.depth * 0.1),
      new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5 })
    );

    // Position the window in the center of the wall
    window.position.set(0, 0, size.depth / 2 + 0.05);
    wall.add(window);

    // Position the wall
    wall.position.set(position.x, position.y, position.z);

    return wall;
  }

  // Function to create the ceiling
  function createCeiling(position, size) {
    const ceiling = new THREE.Mesh(
      new THREE.BoxGeometry(size.width, size.height, size.depth),
      new THREE.MeshBasicMaterial({ color: 0xF9D9B8 })
    );

    // Position the ceiling
    ceiling.position.set(position.x, position.y, position.z);

    return ceiling;
  }

  // Function to create the floor
  function createFloor(position, size) {
    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(size.width, size.height, size.depth),
      new THREE.MeshBasicMaterial({ color: 0xF9D9B8 })
    );

    // Position the floor
    floor.position.set(position.x, position.y, position.z);

    return floor;
  }

  // Create walls with windows
  walls = [
    createWallWithWindow({ x: boundaries.minX, y: 3, z: 0 }, { width: 0.5, height: 15, depth: 20 }), // Left wall
    createWallWithWindow({ x: boundaries.maxX, y: 3, z: 0 }, { width: 0.5, height: 15, depth: 20 }), // Right wall
    createWallWithWindow({ x: 0, y: 3, z: boundaries.minZ }, { width: 20, height: 15, depth: 0.5 }), // Back wall
    createWallWithWindow({ x: 0, y: 3, z: boundaries.maxZ }, { width: 20, height: 15, depth: 0.5 }), // Front wall
    createCeiling({ x: 0, y: boundaries.maxY, z: 0 }, { width: 20, height: 0.5, depth: 20 }), // Ceiling
    createFloor({ x: 0, y: boundaries.minY, z: 0 }, { width: 20, height: 0.5, depth: 20 }) // Floor
  ];

  // Add walls, ceiling, and floor to the scene
  walls.forEach(wall => scene.add(wall));
}
