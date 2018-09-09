var clock = new THREE.Clock();
    var renderer;
    var groupArray = [];
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

     function jonsLoader() {
         var _this = this;
        function success(data){
            _this.initSinObject(data);
		}
		
		function readFile(callback){
			var req = new XMLHttpRequest();
			req.open("GET","../libs/Math.json",true);
			req.addEventListener("load",function(){
				if( req.status<400 )
                    callback(req.responseText);
			})
			req.send(null);

		}
		readFile(success)

     }
    function  initSinObject(data) {
        var mathData = JSON.parse(data);
        for(var i=0;i<mathData.length;i++){
        var group = new THREE.Group();  
        var axerhelp = new THREE.AxesHelper(7);
        group.add(axerhelp);
        group.position.set(mathData[i].data.position._x,
            mathData[i].data.position._y,
            mathData[i].data.position._z
            );
            group.rotation.set(mathData[i].data.rotation._x,
                mathData[i].data.position._y,
                mathData[i].data.position._z
                );

     

        if(mathData[i].MathObject == "sin"){
            var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
            var geometry = new THREE.Geometry();
            var curve1 = new THREE.SplineCurve( [
                new THREE.Vector2( Math.PI * 0.5, 0),
                new THREE.Vector2( Math.PI * 0.5, Math.sin(Math.Pi*0.5) ),
            ] );
            var points1 = curve1.getPoints( 10 );
            var geometry1 = new THREE.BufferGeometry().setFromPoints( points1 );
    
            var material1 = new THREE.LineBasicMaterial( { color : 0xff0000 } );
    
    // Create the final object to add to the scene
            var splineObject1 = new THREE.LineSegments( geometry1, material1 );
    
            group.add(splineObject1);
    
    
            var curve2 = new THREE.SplineCurve( [
                new THREE.Vector2( Math.PI * 1.5, 0),
                new THREE.Vector2( Math.PI * 1.5, Math.sin(Math.Pi*1.5) ),
            ] );
    
            var points2 = curve2.getPoints( 10 );
            var geometry2 = new THREE.BufferGeometry().setFromPoints( points2 );
    
            var material2 = new THREE.LineBasicMaterial( { color : 0xff0000 } );
    
    // Create the final object to add to the scene
            var splineObject2 = new THREE.LineSegments( geometry2, material2 );
    
            group.add(splineObject2);
    
        for(var j=0;j<6.3;){
            geometry.vertices.push(new THREE.Vector3( j,Math.sin(j),0) );
            j+=0.01;}
            var line = new THREE.Line( geometry, material );
            group.add(line);
            groupArray.push(group);
            scene.add(group);
            console.log(scene);
            
        }else if(mathData[i].MathObject == "cos"){
            var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
            var geometry = new THREE.Geometry();
            var curve1 = new THREE.SplineCurve( [
                new THREE.Vector2( Math.PI * 1, 0),
                new THREE.Vector2( Math.PI * 1, Math.cos(Math.Pi) ),
            ] );
            var points1 = curve1.getPoints( 10 );
            var geometry1 = new THREE.BufferGeometry().setFromPoints( points1 );
    
            var material1 = new THREE.LineBasicMaterial( { color : 0xff0000 } );
    
    // Create the final object to add to the scene
            var splineObject1 = new THREE.LineSegments( geometry1, material1 );
    
            group.add(splineObject1);
    
    
            var curve2 = new THREE.SplineCurve( [
                new THREE.Vector2( Math.PI * 2, 0),
                new THREE.Vector2( Math.PI * 2, Math.cos(Math.Pi* 2) ),
            ] );
    
            var points2 = curve2.getPoints( 10 );
            var geometry2 = new THREE.BufferGeometry().setFromPoints( points2 );
    
            var material2 = new THREE.LineBasicMaterial( { color : 0xff0000 } );
    
    // Create the final object to add to the scene
            var splineObject2 = new THREE.LineSegments( geometry2, material2 );
    
            group.add(splineObject2);
    
            for(var j=0;j<6.3;){
            geometry.vertices.push(new THREE.Vector3( j,Math.cos(j),0) );
            j+=0.01;
        }
        var line = new THREE.Line( geometry, material );
        group.add(line);
        groupArray.push(group);
        scene.add(group);
        }

        // for(var i=0;i<6.3;){
        //     geometry.vertices.push(new THREE.Vector3( i,Math.cos(i),0) );
        //     i+=0.1;
        
        // }
        // for(var i=0;i<3.2;){
        //     geometry.vertices.push(new THREE.Vector3( i,Math.tan(i),0) );
        //     i+=0.1;
        //
        // }
        // for(var i=0;i<6.3;){
        //     geometry.vertices.push(new THREE.Vector3( i,Math.atan(i),0) );
        //     i+=0.1;
        
        // }

   
        }
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
        jonsLoader();
        initCamera();
        initRender();
        initScene();
        initLight();
        initControls();
        animate();

        window.onresize = onWindowResize;
    }