function main(
    G3D,
    { canvas, requestAnimationFrame, controlArcRotateCamera }
) {
    const image = new G3D.Env.Image();
    image.crossOrigin = true;
    image.onload = function () {

        const engine = new G3D.Engine(canvas);

        const scene = new G3D.Scene(engine);

        const camera = new G3D.RotatePerspectiveCamera(scene);
        camera.alpha = -35;
        camera.beta = -5;
        camera.radius = 20;

        controlArcRotateCamera(canvas, camera);

        const m1 = G3D.MeshBuilder.createPlane(scene, 6, 6);
        m1.materials.default = new G3D.RawMaterial(m1);
        m1.materials.default.color = {r: 100, g: 200, b: 100};
        m1.position.x = 5;
        m1.position.y = 5;

        const texture = new G3D.Texture({ image });

        const m2 = G3D.MeshBuilder.createPlane(scene, 6);
        m2.materials.default = new G3D.RawMaterial();
        m2.materials.default.texture = texture;
        m2.position.x = -5;
        m2.position.y = 5;

        const m3 = G3D.MeshBuilder.createCube(scene, 4);
        m3.materials.default = new G3D.RawMaterial(m3);
        m3.materials.default.color = {r: 100, g: 200, b: 100};
        m3.position.x = 5;
        m3.position.y = -5;

        const m4 = G3D.MeshBuilder.createCube(scene, 4);
        m4.materials.default = new G3D.RawMaterial(m4);
        m4.materials.default.texture = texture;
        m4.position.x = -5;
        m4.position.y = -5;

        new G3D.MeshBuilder.createCoordinate(scene, 10);

        let last = Date.now();

        function render() {
            const now = Date.now();
            const d = now - last;
            last = now;
            m3.rotation.y += 0.2 * d;
            m4.rotation.y += 0.2 * d;
            scene.render();
            requestAnimationFrame(render);
        }
        render();
    };

    image.src = 'https://img.alicdn.com/tfs/TB1apiEb8HH8KJjy0FbXXcqlpXa-1024-1024.png';
}

export default main;