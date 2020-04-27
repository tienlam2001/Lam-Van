      /*
      <script src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.js" >
        <script src= "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js">
        <script src="OrbitControl.js">
      */
      /* This program is created for fun purpose.*/
      /* This Program will show you the reference of the coronavirus nowadays */

      var text ;  /* Variable text define for the display the number of the victim of the Covid - 19 */
var mess
      var scene, camera,renderer; /* Variables for the to make up the Threejs */
      var moon;
      var controls;/* Control allow you to rotate every position on the scene*/
      var radius = 35;/* The Radius of the Sphere*/
      let textureLoader = new THREE.TextureLoader();
      function makeScene(){ /*Scene maker function, in this scene , we are going to create Threejs tools to support the 3D opJect*/
        updateVirus();    // Calling the Function to update the tree
        setInterval(updateVirus,20000);
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1,1000);
        camera.position.z = 100;


        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);


          makePattern();      /* Creating the scene*/
          // makeMoon();
          space();


          controls = new THREE.OrbitControls(camera, renderer.domElement);  /* Creating new Orbit Controls*/
          controls.autoRotate = true;
          controls.maxDistance = 200;
          controls.update();

      }
      makeScene(); /* Calling the Scene function*/

      animation();  /*Calling the animation function*/

      function space(){
            let galaxyGeometry = new THREE.SphereGeometry(200, 32, 32);
            let galaxyMaterial = new THREE.MeshBasicMaterial({
              side: THREE.BackSide
            });
            let galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);

            // Load Galaxy Textures
            textureLoader.crossOrigin = true;
            textureLoader.load("https://i0.wp.com/ivrpa.org/wp-content/uploads/2016/08/360vr_space3002_opt.jpg?fit=770%2C385&ssl=1",
              function(texture) {
                galaxyMaterial.map = texture;
                scene.add(galaxy);
              }
            );
      }
      /*function updateVirus(){
        const url='https://api.covid19api.com/summary';
        $.get( url , function( data ) {
        }).done(function(data){
          var response = 0;
          response = data.Global.TotalConfirmed;
          var respone = Math.floor(response / 1000);

          makeVirus(respone);

          text = response.toString();
          text = text.replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,");
          document.getElementById('myNumber').innerHTML = "CoronaVirus Case : " + text;

        });

      }*/
      function updateVirus(){
        $.ajax({
          url: "https://wrapapi.com/use/tienlam2001/lam/Name/0.0.1",
          method: "POST",
          data: {
            "wrapAPIKey": "Uz9vLAS1JZEw1j9Z1PX7JVQebpZ2gKny"
          }
        }).done(function(data) {
          var response = "";
          var integer = 0;
          response = data.data["#victim"][4];
          //makeVirus(respone);
          var convertNum = response.replace(/(\d+)?,(\d+\s?)/g, '$1$2');
          integer = parseInt(convertNum);
          console.log(integer + "" +typeof integer);
          var virus = Math.floor(integer / 10000);
          makeVirus(virus);
          console.log(typeof data.data["#victim"][4]);
          text = response.replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,");
          document.getElementById('myNumber').innerHTML = "CoronaVirus Case : " + response;

        });


      }

      function makeVirus(n){          /* Get the number for the Update function and create a new little dot on the scene*/

        for(var lcv = 0; lcv < n; lcv++){
          scene.add(littleDot(Math.PI * Math.random()*2,  Math.PI * Math.random()*2,Math.PI * Math.random()*2));
        }
      }

      function makePattern(){/*Function to create Sphere*/

        var geometry = new THREE.SphereGeometry(radius,40,40);            /* Sphere geometry*/
        var material = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.FrontSide}); /*Material Lambert, this material can affected by light so I kinda like to use it*/
        var light = new THREE.DirectionalLight( 0x3232D3, 1 );/*Create light effect*/


        light.position.set( 10, 0, 1);
        scene.add(light);

         mess = new THREE.Mesh(geometry, material);
        mess.position.set(0,0,0);
        textureLoader.crossOrigin = true;
        textureLoader.load("https://farm9.staticflickr.com/8090/8363574863_697909095b_b.jpg",
          function(texture) {
            material.map = texture;
            scene.add(mess);
          }
        );






      }

      // function makeMoon(){/*Function to create Sphere*/
      // 
      //   var geometryMoon = new THREE.SphereGeometry(10,20,20);            /* Sphere geometry*/
      //   var materialMoon = new THREE.MeshBasicMaterial({color: 0xfff32f, side: THREE.FrontSide}); /*Material Lambert, this material can affected by light so I kinda like to use it*/
      // 
      // 
      //    moon = new THREE.Mesh(geometryMoon, materialMoon);
      //     moon.position.set(100,20,10);
      //    // textureLoader.crossOrigin = true;
      //    // textureLoader.load("https://netrinoimages.s3.eu-west-2.amazonaws.com/2015/02/20/385337/100201/moon_texture_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1258985_o.png",
      //    //   function(texture) {
      //    //    materialMoon.map = texture;
      //   scene.add(moon);
      //    //  }
      //    // );
      // 
      // 
      // 
      // 
      // 
      // 
      // }

      function animation(){ // Stop the object bedding      /* Create animation for the scene*/
        requestAnimationFrame(animation);
        controls.update();
        renderer.render(scene,camera);

      }

      window.addEventListener('resize', ()=> {  /*Seem like responsive web for threejs*/
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      });



      function littleDot(x,y,z){          /*Making the Virus*/
        var stemMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
        var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        var messDot = new THREE.Mesh(cubeGeometry, stemMaterial );

        messDot.position.set(0, radius, 0 );
        messDot.scale.set(0.1,1,0.3);

        var corona = new THREE.Group();
        corona.add(messDot);
        corona.rotation.set(x,y,z);

        return corona;

      }


