//create a scene
const scene = new THREE.Scene();
//create a camera
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    500
);
camera.position.z = 30;

let anim = false;


//create an object
const geometry = new THREE.BoxGeometry(1, 1, 1);
var mats = [];
mats.push(new THREE.MeshBasicMaterial({
    color: 0xfffff,
    wireframe: false,
}));
mats.push(new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    wireframe: false,
}));
mats.push(new THREE.MeshBasicMaterial({
    color: 0xF3E5AB,
    wireframe: false,
}));
var _x = 2.0;
var _x2 = -2.0;

var tar = 1.2;
var cubes = {}
function addCubeManual() {

    for (let index = 0; index < 10; index++) {
        var cube = new THREE.Mesh(geometry, material);
        cube.name = "Cube_1" + index;
        scene.add(cube);
        cube.position.x = _x
        cube.position.z = 5;

        cube.lookAt(camera.position);
        const pos23 = cube.position;
        const tpos_x = cube.position.z + tar;
        cubes[cube.name] = {
            mesh: cube,
            defaultPos: pos23,
            tpos_x: tpos_x,
            playForward: true
        }

        var cube4 = new THREE.Mesh(geometry, material);
        cube4.name = "Cube_4" + index;
        scene.add(cube4);
        cube4.position.x = _x
        cube4.position.y = 2.0
        cube4.position.z = 5;
        cube4.lookAt(camera.position);
        const pos24 = cube4.position;
        const tpos2_x = cube4.position.z + tar;
        cubes[cube4.name] = {
            mesh: cube4,
            defaultPos: pos24,
            tpos_x: tpos2_x,
            playForward: true
        }

        _x += 2.0;

        var cube2 = new THREE.Mesh(geometry, material2);
        cube2.name = "Cube_2" + index;
        scene.add(cube2);
        cube2.position.x = _x2
        cube2.position.z = 5;

        cube2.lookAt(camera.position);
        // cubes[cube2.name] = cube2
        const pos2 = cube2.position;
        const tpos_x1 = cube2.position.z + tar;
        cubes[cube2.name] = {
            mesh: cube2,
            defaultPos: pos2,
            tpos_x: tpos_x1,
            playForward: true
        }


        var cube3 = new THREE.Mesh(geometry, material3);
        cube3.name = "Cube_3" + index;
        scene.add(cube3);
        cube3.position.x = _x2
        cube3.position.y = 2.0
        cube3.position.z = 5;

        cube3.lookAt(camera.position);
        // cubes[cube3.name] = cube3
        const pos = cube3.position;
        const tpos_x2 = cube3.position.z + tar;
        cubes[cube3.name] = {
            mesh: cube3,
            defaultPos: pos,
            tpos_x: tpos_x2,
            playForward: true
        }
        _x2 -= 2.0;


    }
}
// addCubeManual();

anim = true;
//create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
var stats;
function createStats() {
    var stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0';
    stats.domElement.style.top = '0';

    return stats;
  }

  stats = createStats();
  document.body.appendChild( stats.domElement );
//animation loop
const animate = () => {
    requestAnimationFrame(animate);

    if (anim) {
        for (let index = 0; index < Object.keys(cubes).length; index++) {
            const element = Object.keys(cubes)[index];
            cubes[element].mesh.rotation.z += 0.05;
            cubes[element].mesh.rotation.y += 0.05;

            if (cubes[element].playForward)
                cubes[element].mesh.position.z += 0.05;
            else
                cubes[element].mesh.position.z -= 0.05;

            if (parseFloat(cubes[element].mesh.position.z).toFixed(2) == '7.00')
                cubes[element].playForward = false;
            else if (parseFloat(cubes[element].mesh.position.z).toFixed(2) == '1.00')
                cubes[element].playForward = true;

            // console.log(cubes[element].mesh.position.z)



            // if (cubes[element].playForward && cubes[element].mesh.position.z <= 7) {
            //     cubes[element].mesh.position.z += 0.05;
            //     console.log(">>>>>> ", cubes[element].mesh.position.z, "  :  ", cubes[element].tpos_x)
            // }
            // else if (cubes[element].mesh.position.z > 4) {
            //     cubes[element].mesh.position.z -= 0.05;
            //     // console.log(">>>>>> ", cubes[element].mesh.position.z, "  :  ", cubes[element].defaultPos.z)
            // }



        }
    }

    renderer.render(scene, camera);
    stats.update();
};

animate();

document.body.appendChild(renderer.domElement);

function addCubeDynamic() {

    var xIncrementer = 0.0;
    var yIncrementer = 0.0;
    var matIndex = 0;
    for (let xIndex = 0; xIndex < 10; xIndex++) {
        for (let yIndex = 0; yIndex < 15; yIndex++) {

            if (yIncrementer == 0) {
                addCube(xIncrementer, yIncrementer, 0, mats[matIndex], "Cube_xP_yP" + xIndex + "_" + yIndex)
                if (xIncrementer != 0)
                    addCube(-xIncrementer, yIncrementer, 0, mats[matIndex], "Cube_xN_yP" + xIndex + "_" + yIndex)
            }
            else {
                addCube(xIncrementer, yIncrementer, 0, mats[matIndex], "Cube_xP_yP" + xIndex + "_" + yIndex)
                addCube(xIncrementer, -yIncrementer, 0, mats[matIndex], "Cube_xP_yN" + xIndex + "_" + yIndex)
                if (xIncrementer != 0) {
                    addCube(-xIncrementer, yIncrementer, 0, mats[matIndex], "Cube_xN_yP" + xIndex + "_" + yIndex)
                    addCube(-xIncrementer, -yIncrementer, 0, mats[matIndex], "Cube_xN_yN" + xIndex + "_" + yIndex)
                }
                // addCube(xIncrementer,-yIncrementer,0,material,"Cube_Negative"+xIndex+"_"+yIndex)
            }
            // console.log("Cube_" + xIndex + "_" + yIndex)
            xIncrementer += 2.0
        }
        xIncrementer = 0.0
        yIncrementer += 2.0
        matIndex++
        if (matIndex > mats.length)
            matIndex = 0;
    }
}

addCubeDynamic();
function addCube(x, y, z, mat, name) {
    var cube = new THREE.Mesh(geometry, mat);
    cube.name = name;
    scene.add(cube);
    cube.position.x = x
    cube.position.y = y;
    cube.position.z = z;

    cube.lookAt(camera.position);
    const defaultPos = cube.position;
    const targetPos = cube.position.z + tar;
    cubes[cube.name] = {
        mesh: cube,
        defaultPos: defaultPos,
        targetPos: targetPos,
        playForward: true
    }
}
