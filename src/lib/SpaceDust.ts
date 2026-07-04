import * as THREE from 'three';

export default class SpaceDust {
  canvas: HTMLCanvasElement;
  clock: THREE.Clock;
  raycaster: THREE.Raycaster;
  mouse: THREE.Vector2;
  mouseWorldPos: THREE.Vector3;
  attractionRadius: number;
  attractionStrength: number;
  config: {
    PARTICLE_COUNT: number;
    STAR_COUNT: number;
    MOUSE_Z: number;
    MIN_CAMERA_Z: number;
    MAX_CAMERA_Z: number;
    DAMPING: number;
    RETURN_SPEED: number;
  };
  renderer!: THREE.WebGLRenderer;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  worldPlane!: THREE.Plane;
  particleGeometry!: THREE.BufferGeometry;
  particleMaterial!: THREE.ShaderMaterial;
  particleSystem!: THREE.Points;
  starGeometry!: THREE.BufferGeometry;
  starMaterial!: THREE.PointsMaterial;
  starField!: THREE.Points;
  animFrameId: number = 0;
  disposed: boolean = false;

  _getZFromFOV(targetHeight: number): number {
    const fov = 60 * (Math.PI / 180);
    return targetHeight / (2 * Math.tan(fov / 2));
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.mouseWorldPos = new THREE.Vector3(0, 0, 0);
    this.attractionRadius = 2.5;
    this.attractionStrength = 1.0;

    const isMobile = window.innerWidth < 768;
    this.config = {
      PARTICLE_COUNT: isMobile ? 2000 : 4000,
      STAR_COUNT: isMobile ? 1500 : 3000,
      MOUSE_Z: 25,
      MIN_CAMERA_Z: 60,
      MAX_CAMERA_Z: 250,
      DAMPING: 0.96,
      RETURN_SPEED: 0.02,
    };

    this.init();
    this.start();
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: false,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x06040d, 0.002);

    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = this._getZFromFOV(100);

    this.worldPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    this.worldPlane.constant = -this.camera.position.z;

    this._initParticleSystem();
    this._initStars();

    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchmove', this.onTouchMove, { passive: true });
  }

  _initParticleSystem() {
    this.particleGeometry = new THREE.BufferGeometry();

    const positions = new Float32Array(this.config.PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(this.config.PARTICLE_COUNT * 3);
    const velocities = new Float32Array(this.config.PARTICLE_COUNT * 3);
    const sizes = new Float32Array(this.config.PARTICLE_COUNT);
    const colors = new Float32Array(this.config.PARTICLE_COUNT * 3);

    const spreadX = this.camera.position.z * 1.5;
    const spreadY = this.camera.position.z;

    for (let i = 0; i < this.config.PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spreadX;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      originalPositions[i * 3] = positions[i * 3];
      originalPositions[i * 3 + 1] = positions[i * 3 + 1];
      originalPositions[i * 3 + 2] = positions[i * 3 + 2];

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;

      const colorType = Math.random();
      if (colorType < 0.03) {
        colors[i * 3] = 0.95 + Math.random() * 0.05;
        colors[i * 3 + 1] = 0.93 + Math.random() * 0.05;
        colors[i * 3 + 2] = 1.0;
      } else if (colorType < 0.15) {
        colors[i * 3] = 0.54 + Math.random() * 0.08;
        colors[i * 3 + 1] = 0.36 + Math.random() * 0.04;
        colors[i * 3 + 2] = 0.96;
      } else {
        colors[i * 3] = 0.65 + Math.random() * 0.1;
        colors[i * 3 + 1] = 0.55 + Math.random() * 0.1;
        colors[i * 3 + 2] = 0.98 + Math.random() * 0.02;
      }

      sizes[i] = 0.5 + Math.random() * 1.5;
    }

    this.particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    this.particleGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3)
    );
    this.particleGeometry.setAttribute(
      'size',
      new THREE.BufferAttribute(sizes, 1)
    );
    this.particleGeometry.setAttribute(
      'originalPosition',
      new THREE.BufferAttribute(originalPositions, 3)
    );
    this.particleGeometry.setAttribute(
      'velocity',
      new THREE.BufferAttribute(velocities, 3)
    );

    const textureLoader = new THREE.TextureLoader();
    const sparkTexture = textureLoader.load('/textures/spark1.png');

    this.particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xffffff) },
        texture1: { value: sparkTexture },
      },
      vertexShader: `
        uniform sampler2D texture1;
        attribute float size;
        attribute vec3 color;
        varying vec4 vColor;

        void main() {
          vColor = vec4(color, 1.0);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform sampler2D texture1;
        varying vec4 vColor;

        void main() {
          vec3 outgoingLight = vColor.xyz * color;
          gl_FragColor = vec4(outgoingLight, vColor.w);
          gl_FragColor *= texture2D(texture1, gl_PointCoord);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true,
    });

    this.particleSystem = new THREE.Points(
      this.particleGeometry,
      this.particleMaterial
    );
    this.scene.add(this.particleSystem);
  }

  _initStars() {
    this.starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(this.config.STAR_COUNT * 3);

    const fov = this.camera.fov * (Math.PI / 180);
    const z = this.camera.position.z;
    const maxY = 2 * Math.tan(fov / 2) * z;
    const maxX = maxY * this.camera.aspect;

    for (let i = 0; i < this.config.STAR_COUNT; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * maxX * 1.5;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * maxY * 1.5;
      starPositions[i * 3 + 2] = z - 50 - Math.random() * 150;
    }

    this.starGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(starPositions, 3)
    );

    this.starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.8,
      transparent: true,
      opacity: 0.8,
    });

    this.starField = new THREE.Points(this.starGeometry, this.starMaterial);
    this.scene.add(this.starField);
  }

  onMouseMove = (event: MouseEvent) => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.raycaster.ray.intersectPlane(this.worldPlane, this.mouseWorldPos);
    this.mouseWorldPos.z = this.config.MOUSE_Z;
  };

  onTouchMove = (event: TouchEvent) => {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.mouse, this.camera);
      this.raycaster.ray.intersectPlane(this.worldPlane, this.mouseWorldPos);
      this.mouseWorldPos.z = this.config.MOUSE_Z;
    }
  };

  onResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  animate = () => {
    if (this.disposed) return;
    this.animFrameId = requestAnimationFrame(this.animate);

    const time = this.clock.getElapsedTime();

    this.starField.rotation.y = time * 0.005;
    this.starField.rotation.x = time * 0.002;

    const positions = this.particleGeometry.attributes.position
      .array as Float32Array;
    const originalPositions = this.particleGeometry.attributes.originalPosition
      .array as Float32Array;
    const velocities = this.particleGeometry.attributes.velocity
      .array as Float32Array;

    for (let i = 0; i < this.config.PARTICLE_COUNT; i++) {
      const idx = i * 3;

      const dx = this.mouseWorldPos.x - positions[idx];
      const dy = this.mouseWorldPos.y - positions[idx + 1];
      const dz = this.mouseWorldPos.z - positions[idx + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < this.attractionRadius && dist > 0.1) {
        const force = (1 - dist / this.attractionRadius) * this.attractionStrength;
        velocities[idx] += (-dy / dist) * force * 0.5;
        velocities[idx + 1] += (dx / dist) * force * 0.5;
        velocities[idx + 2] += (dz / dist) * force * 0.1;
      }

      if (dist < 0.5) {
        velocities[idx] += (-dy / 0.5) * 0.05;
        velocities[idx + 1] += (dx / 0.5) * 0.05;
      }

      velocities[idx] +=
        (originalPositions[idx] - positions[idx]) * this.config.RETURN_SPEED;
      velocities[idx + 1] +=
        (originalPositions[idx + 1] - positions[idx + 1]) *
        this.config.RETURN_SPEED;
      velocities[idx + 2] +=
        (originalPositions[idx + 2] - positions[idx + 2]) *
        this.config.RETURN_SPEED;

      velocities[idx] *= this.config.DAMPING;
      velocities[idx + 1] *= this.config.DAMPING;
      velocities[idx + 2] *= this.config.DAMPING;

      positions[idx] += velocities[idx];
      positions[idx + 1] += velocities[idx + 1];
      positions[idx + 2] += velocities[idx + 2];
    }

    this.particleGeometry.attributes.position.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
  };

  start() {
    this.animate();
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onTouchMove);

    this.particleGeometry.dispose();
    this.particleMaterial.dispose();
    this.starGeometry.dispose();
    this.starMaterial.dispose();
    this.renderer.dispose();
  }
}
