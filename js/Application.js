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
            const spotLight = new THREE.SpotLight(0xffffff, 4, 2000, Math.PI / 2, 0.2, 1.5);
            spotLight.position.set(500, 300, 500);
            spotLight.castShadow = true; // 影を落とす設定
            spotLight.shadow.mapSize.width = 2048;
            spotLight.shadow.mapSize.height = 2048;
            this.scene.add(spotLight);
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
        // マス目を作成
        {

            const geometry = new THREE.BoxGeometry(45, 45, 45);

            // 立方体の作成
            // 立方体のマテリアルとジオメトリを作成
            const material = new THREE.MeshStandardMaterial({
                color: Math.round((Math.random() - 0.5) * 0xffffff),
                roughness: 0.1,
                metalness: 0.2,
            });
            const box = new THREE.Mesh(geometry, material);
            box.position.x = 0;
            box.position.y = 0;
            box.position.z = 0;

            // 影の設定
            box.receiveShadow = true;
            box.castShadow = true;
            this.scene.add(box);

        }
    }


    // 再描画の度に呼ばれる
    Loop() {

    }
}
