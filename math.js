// checks if shooter can hit target.
// shooter and target are position from camera.getWorldPosition.
const BUFFER = 0.25;

// direction is camera.getWorldDirection of shooter.
function isHit(shooter, target, direction) {
  // targetX - shooterX
  const deltaX = target.x - shooter.x;
  // shooterZ - targetZ
  const deltaZ = shooter.z - target.z;
  // angle.
  const theta =
    direction.z < 0
      ? -Math.atan(direction.x / direction.z)
      : Math.atan(direction.x / direction.z);
  // pythagorean thm.
  const vector = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaZ, 2));
  // x component of vector Vsin(theta)
  const vectorX = vector * Math.sin(theta);
  const vectorZ =
    direction.z < 0 ? -Math.cos(theta) * vector : Math.cos(theta) * vector;
  // destination.
  const destination = {
    x: shooter.x + vectorX,
    z: shooter.z + vectorZ
  };
  const buffer = {
    x: Math.abs(target.x - destination.x),
    z: Math.abs(destination.z - target.z)
  };
  // test if destination is close enough to target.
  return buffer.x < BUFFER && buffer.z < BUFFER;
}

module.exports = { isHit };
