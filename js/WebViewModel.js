var clock = new THREE.Clock();
    var renderer;
    var group = new THREE.Group();
    function initRender() {
        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        renderer.setSize(innerWidth, innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(0xffffff);
        document.getElementById("container").appendChild(renderer.domElement);

    }
    var camera;
    function initCamera() {
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100000);
        camera.position.set(0, 0, -10.7);
    }
    var scene;
    function initScene() {
        
     scene = new THREE.Scene();
     }

    function  initMathObject() {

        var axerhelp = new THREE.AxesHelper(7);
        group.rotation.y = Math.PI;
        group.add(axerhelp);

        var curve1 = new THREE.SplineCurve( [
            new THREE.Vector2( Math.PI/2, Math.sin(Math.PI/2) ),
            new THREE.Vector2( Math.PI/2, 0 ),
        ] );

        var points1 = curve1.getPoints( 10 );
        var geometry1 = new THREE.BufferGeometry().setFromPoints( points1 );

        var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

// Create the final object to add to the scene
        var splineObject1 = new THREE.Line( geometry1, material );

        group.add(splineObject1);


        var curve2 = new THREE.SplineCurve( [
            new THREE.Vector2( 3*Math.PI/2, 0 ),
            new THREE.Vector2( 3*Math.PI/2, Math.sin(3*Math.PI/2) ),
        ] );

        var points2 = curve2.getPoints( 10 );
        var geometry2 = new THREE.BufferGeometry().setFromPoints( points2 );

        var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

// Create the final object to add to the scene
        var splineObject2 = new THREE.Line( geometry2, material );

        group.add(splineObject2);

        var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
        var geometry = new THREE.Geometry();

        for(var i=0;i<6.3;){
            geometry.vertices.push(new THREE.Vector3( i,Math.sin(i),0) );
            if(i==1.57){

            }
            i+=0.01;
        }

        // for(var i=0;i<6.3;){
        //     geometry.vertices.push(new THREE.Vector3( i,Math.cos(i),0) );
        //     i+=0.1;
        //
        // }
        // for(var i=0;i<3.2;){
        //     geometry.vertices.push(new THREE.Vector3( i,Math.tan(i),0) );
        //     i+=0.1;
        //
        // }
        // for(var i=0;i<6.3;){
        // //     geometry.vertices.push(new THREE.Vector3( i,Math.atan(i),0) );
        // //     i+=0.1;
        // //
        // // }

        var line = new THREE.Line( geometry, material );
        group.add(line);
        scene.add(group);

    }


    function initLight() {      //灯光渲染


        var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
        scene.add( ambientLight );
        var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
        camera.add( pointLight );
        scene.add( camera );
    }

    var controls;

    function initControls() {           //控制脚本
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', render);
        controls.enableDamping = true;
        controls.dampingFactor = 0.3;
        controls.enableZoom = true;
        controls.enablePan = true;
        controls.rotateSpeed = 0.3;
        controls.zoomSpeed = 0.5;
        controls.autoRotateSpeed = 0.6;
        controls.dampingFactor = 0.6;
        controls.autoRotate = false;

    }

    function render() {
        renderer.render(scene, camera);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        render();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }


    function animate() {
        render();
        controls.update();
        requestAnimationFrame(animate);
    }


    function draw() {       //初始化方法
        initCamera();
        initRender();
        initScene();
        initMathObject();
        initLight();
        initControls();
        animate();

        window.onresize = onWindowResize;
    }