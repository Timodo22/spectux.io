// Basisinstellingen voor Three.js scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1c1c2b);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

// Licht toevoegen
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Geanimeerde objecten toevoegen
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0x8a73fe });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const torusGeometry = new THREE.TorusGeometry(1, 0.2, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x9fa3ff });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(-3, 0, 0);
scene.add(torus);

const animate = function () {
    requestAnimationFrame(animate);

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    torus.rotation.x += 0.02;
    torus.rotation.y += 0.02;

    renderer.render(scene, camera);
};

animate();

// Scherm aanpassen bij vensterwijzigingen
window.addEventListener('resize', function () {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
