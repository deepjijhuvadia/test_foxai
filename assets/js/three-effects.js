/* ═══════════════════════════════════════════════════════════
   FoxAI — Three.js Background Effects
   Floating glass objects, ambient lighting, parallax camera
   ═══════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    function initThreeEffects() {
        var canvas = document.getElementById('three-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0, 5);

        // ─── LIGHTING ───
        scene.add(new THREE.AmbientLight(0x404050, 0.5));

        var light1 = new THREE.PointLight(0x96aaff, 1.5, 20);
        light1.position.set(3, 3, 3);
        scene.add(light1);

        var light2 = new THREE.PointLight(0xc882ff, 1, 15);
        light2.position.set(-3, -2, 2);
        scene.add(light2);

        var light3 = new THREE.PointLight(0xf5f2ea, 0.6, 12);
        light3.position.set(0, 2, -3);
        scene.add(light3);

        // ─── GLASS MATERIALS ───
        var glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.08,
            roughness: 0.1,
            metalness: 0.2,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
        });

        var glassMaterial2 = new THREE.MeshPhysicalMaterial({
            color: 0x96aaff,
            transparent: true,
            opacity: 0.06,
            roughness: 0.15,
            metalness: 0.3,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
        });

        var objects = [];

        // ─── FLOATING OBJECTS ───

        // Torus
        var torus = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.08, 32, 100), glassMaterial);
        torus.position.set(2.5, 1.5, -2);
        scene.add(torus);
        objects.push({ mesh: torus, speed: 0.3, axis: 'xy', floatAmp: 0.3, floatSpeed: 0.7 });

        // Icosahedron
        var ico = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 0), glassMaterial2);
        ico.position.set(-3, -1, -1.5);
        scene.add(ico);
        objects.push({ mesh: ico, speed: 0.5, axis: 'yz', floatAmp: 0.4, floatSpeed: 0.5 });

        // Octahedron
        var octa = new THREE.Mesh(new THREE.OctahedronGeometry(0.35, 0), glassMaterial);
        octa.position.set(3, -2, -1);
        scene.add(octa);
        objects.push({ mesh: octa, speed: 0.4, axis: 'xz', floatAmp: 0.25, floatSpeed: 0.8 });

        // Large sphere
        var sphere = new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 32), glassMaterial2);
        sphere.position.set(-2.5, 2, -3);
        scene.add(sphere);
        objects.push({ mesh: sphere, speed: 0.15, axis: 'xy', floatAmp: 0.5, floatSpeed: 0.4 });

        // Ring
        var ring = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.04, 16, 64), glassMaterial);
        ring.position.set(0, -2.5, -2);
        scene.add(ring);
        objects.push({ mesh: ring, speed: 0.6, axis: 'xz', floatAmp: 0.3, floatSpeed: 0.6 });

        // Small floating cubes
        for (var i = 0; i < 5; i++) {
            var size = 0.1 + Math.random() * 0.15;
            var cube = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), glassMaterial.clone());
            cube.material.opacity = 0.04 + Math.random() * 0.04;
            cube.position.set(
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 6,
                -1 - Math.random() * 3
            );
            scene.add(cube);
            objects.push({
                mesh: cube,
                speed: 0.2 + Math.random() * 0.5,
                axis: ['xy', 'yz', 'xz'][Math.floor(Math.random() * 3)],
                floatAmp: 0.2 + Math.random() * 0.3,
                floatSpeed: 0.3 + Math.random() * 0.5,
                baseY: cube.position.y
            });
        }

        // ─── WIRE LINES ───
        var linesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.03 });
        for (var li = 0; li < 8; li++) {
            var points = [];
            var startX = (Math.random() - 0.5) * 10;
            var startY = (Math.random() - 0.5) * 8;
            var startZ = -2 - Math.random() * 4;
            for (var j = 0; j < 5; j++) {
                points.push(new THREE.Vector3(
                    startX + j * (Math.random() - 0.5) * 2,
                    startY + j * (Math.random() - 0.5) * 1.5,
                    startZ
                ));
            }
            var geometry = new THREE.BufferGeometry().setFromPoints(points);
            var line = new THREE.Line(geometry, linesMaterial);
            scene.add(line);
        }

        // ─── INTERACTION STATE ───
        var scrollY = 0;
        var mouseX = 0, mouseY = 0;

        window.addEventListener('scroll', function () { scrollY = window.scrollY; });
        window.addEventListener('mousemove', function (e) {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        // ─── ANIMATION LOOP ───
        var clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            var t = clock.getElapsedTime();
            var scrollFactor = scrollY * 0.0003;

            // Parallax camera
            camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.02;
            camera.position.y += (-mouseY * 0.2 - scrollFactor - camera.position.y) * 0.02;
            camera.lookAt(0, -scrollFactor * 0.5, 0);

            // Animate objects
            objects.forEach(function (obj, i) {
                var m = obj.mesh;
                var baseY = obj.baseY !== undefined ? obj.baseY : m.position.y;

                if (obj.axis.includes('x')) m.rotation.x += obj.speed * 0.005;
                if (obj.axis.includes('y')) m.rotation.y += obj.speed * 0.008;
                if (obj.axis.includes('z')) m.rotation.z += obj.speed * 0.006;

                m.position.y = baseY + Math.sin(t * obj.floatSpeed + i) * obj.floatAmp;
            });

            // Light animation
            light1.position.x = 3 + Math.sin(t * 0.5) * 1;
            light1.position.y = 3 + Math.cos(t * 0.3) * 0.5;
            light2.position.x = -3 + Math.sin(t * 0.4) * 0.8;
            light2.position.y = -2 + Math.cos(t * 0.6) * 0.6;

            renderer.render(scene, camera);
        }
        animate();

        // ─── RESIZE ───
        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // Init when DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThreeEffects);
    } else {
        initThreeEffects();
    }
})();
