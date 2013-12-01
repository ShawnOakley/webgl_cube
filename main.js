var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene;

var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);

var cubeTexture = THREE.ImageUtils.loadTexture('./box.png');
var materials = [];
materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xff0000 })); // right face
materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xffff00 })); // left face
materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xffffff })); // top face
materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0x00ffff })); // bottom face
materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0x0000ff })); // front face
materials.push(new THREE.MeshLambertMaterial({ map: cubeTexture, color: 0xff00ff })); // back face
var cubeMaterial = new THREE.MeshFaceMaterial(materials);
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

cube.rotation.y = Math.PI * 45 / 180;
scene.add(cube);

var camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 10000);
camera.position.y = 160;
camera.position.z = 400;
camera.lookAt(cube.position);

scene.add(camera);

// Add particles

var particles = new THREE.Geometry;
var smokeParticles = new THREE.Geometry;

for (var i = 0; i < 300; i++) {
   var particle = new THREE.Vector3(Math.random() * 32 - 16, Math.random() * 230, Math.random() * 32 - 16);
   smokeParticles.vertices.push(particle);
}

for (var p = 0; p < 2000; p++) {
   var particle = new THREE.Vector3(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 500 - 250);
   particles.vertices.push(particle);
}


var particleTexture = THREE.ImageUtils.loadTexture('./snowflake.png');
var particleMaterial = new THREE.ParticleBasicMaterial({ map: particleTexture, transparent: true, size: 5 });


var particleSystem = new THREE.ParticleSystem(particles, particleMaterial);
 
scene.add(particleSystem);

// Add smoke

var smokeTexture = THREE.ImageUtils.loadTexture('./smoke.png');
var smokeMaterial = new THREE.ParticleBasicMaterial({ map: smokeTexture, transparent: true, blending: THREE.AdditiveBlending, size: 50, color: 0x111111 });

var smoke = new THREE.ParticleSystem(smokeParticles, smokeMaterial);
smoke.sortParticles = true;
smoke.position.x = -150;
 
scene.add(smoke);

// Add lights

var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
var skyboxMaterial = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.BackSide });
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

scene.add(skybox);

var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0,300,200);

scene.add(pointLight);


var clock = new THREE.Clock;

function render() {

	var delta = clock.getDelta();
   	cube.rotation.y -= delta;
   	particleSystem.rotation.y += delta

   	var particleCount = smokeParticles.vertices.length;
   	while(particleCount--) {
   		particle.y = Math.random() * 16;
   		particle.x = Math.random() * 32 - 16;
   		particle.z = Math.random() * 32 - 16;
   	}
   	smokeParticles.__dirtyVertices = true;

	requestAnimationFrame(render);

	renderer.render(scene, camera);
}

render();
