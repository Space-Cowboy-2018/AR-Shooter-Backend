// checks if shooter can hit target.
// shooter and target are position from camera.getWorldPosition.
const BUFFER = 0.05;

// direction is camera.getWorldDirection of shooter.
module.exports = function isHit(shooter, target, direction) {
  // targetX - shooterX
  const deltaX = target.position.x - shooter.position.x;
  // shooterZ - targetZ
  const deltaZ = shooter.position.z - target.position.z;
  // angle.
  const theta =
    direction.z < 0 ? -Math.atan(deltaX / deltaZ) : Math.atan(deltaX / deltaZ);
  // pythagorean thm.
  const vector = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaZ, 2));
  // x component of vector Vsin(theta)
  const vectorX = vector * Math.sin(theta);
  const vectorZ = direction.z < 0 ? -Math.cos(theta) : Math.cos(theta);
  // destination.
  const destination = {
    x: shooter.position.x + vectorX,
    z: shooter.position.z + vectorZ
  };
  const buffer = {
    x: Math.abs(target.position.x - destination.x),
    z: Math.abs(destination.z - target.position.z)
  };
  // test if destination is close enough to target.
  return buffer.x < BUFFER && buffer.z < BUFFER;
};
