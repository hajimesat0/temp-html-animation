class Application {
    constructor() {
        // サイズを指定
        this.width = 960;
        this.height = 540;
    }

    Init(canvas) {
        this.canvas = canvas;
        
        // レンダラーを作成
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        // レンダラー側で影を有効に
        this.renderer.shadowMap.enabled = true;

        // シーンを作成
        this.scene = new THREE.Scene();

        // カメラを作成
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height);
        // カメラの初期座標を設定
        this.camera.position.set(500, 500, 500);

        // カメラコントローラーを作成
        this.controls = new THREE.OrbitControls(this.camera, this.canvas);

        // 光源を作成
        {
            // const light = new THREE.DirectionalLight(0xffffff, 4, 2000, Math.PI / 2, 0.2, 1.5);
            const light = new THREE.DirectionalLight(0xffffff, 2);
            // const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
            light.position.set(500, 300, 500);
            light.castShadow = true; // 影を落とす設定
            // light.shadow.mapSize.width = 2048;
            // light.shadow.mapSize.height = 2048;
            this.scene.add(light);
        }

        this.Setup();
        this.InnerLoop();
    }


    InnerLoop() {
        // レンダリング
        this.renderer.render(this.scene, this.camera);
        this.Loop();
        window.requestAnimationFrame(this.InnerLoop.bind(this));
    }


    // 最初に一度だけ呼ばれる
    Setup() {
        {
            const material = new THREE.MeshStandardMaterial({
                color: Math.round((Math.random() - 0.5) * 0xffffff),
                roughness: 0.1,
                metalness: 0.2,
//                wireframe: true
            });

            this.group = new THREE.Group();
            this.scene.add( this.group );

            const geometry = new THREE.ConeGeometry(45, 45, 45);
            this.mesh = new THREE.Mesh(geometry, material);
            this.mesh.position.x = 0;
            this.mesh.position.y = 0;
            this.mesh.position.z = 0;
            this.mesh.receiveShadow = true;
            this.mesh.castShadow = true;
            this.group.add(this.mesh);

            const geometry_cylinder = new THREE.CylinderGeometry(20,20,30,50);
            const mesh_cylinder = new THREE.Mesh(geometry_cylinder, material);
            mesh_cylinder.position.x = 0;
            mesh_cylinder.position.y = 30;
            mesh_cylinder.position.z = 0;
            mesh_cylinder.receiveShadow = true;
            mesh_cylinder.castShadow = true;
            this.group.add(mesh_cylinder);

            this.group.rotation.x = Math.PI;
        }

        this.time = 0;
    }


    // 再描画の度に呼ばれる
    Loop() {
        this.time ++;
        this.group.position.y += 10*Math.sin(this.time/5);
    }
}
