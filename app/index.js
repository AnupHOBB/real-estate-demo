import * as THREE from 'three'
import * as ENGINE from 'engine'
import { GLTFLoader } from 'gltf-loader'
import { Sidebar } from './Sidebar.js'

const MODEL_FOLDER = '../assets/'
const MODEL_PATH = MODEL_FOLDER + 'Armchair.glb'
const ENV_MAP_PATH = MODEL_FOLDER + 'CGSkies_0339_freecopy.jpg'

window.onload = () => {
    let sidebar = new Sidebar(document.getElementById('sidebar'))
    sidebar.hide()
    let sidebarImage = sidebar.getElementById('image')
    let sidebarText = sidebar.getElementById('text')
    document.querySelector('canvas').addEventListener('mousedown', e => sidebar.hide())
    let sceneManager = new ENGINE.SceneManager(document.querySelector('canvas'))
    let input = new ENGINE.InputManager('Input', document.querySelector('canvas'))
    sceneManager.register(input)
    let cameraManager = new ENGINE.OrbitalCameraManager('Camera', 50, new THREE.Vector3(0, 0.5, 0))
    cameraManager.addPitchRestriction(np => { return [np.y >= 0 && np.y <= 2, np] })
    cameraManager.setPosition(0, 0.5, 2)
    cameraManager.registerInput(input)
    sceneManager.register(cameraManager)
    sceneManager.setActiveCamera('Camera')
    let directLight = new ENGINE.DirectLight('DirectLight', new THREE.Color(1, 1, 1), 1, 1)
    directLight.setPosition(0, 50, -2)
    sceneManager.register(directLight)
    let ambientLight = new ENGINE.AmbientLight('AmbientLight', new THREE.Color(1, 1, 1), 1)
    sceneManager.register(ambientLight)
    new THREE.TextureLoader().load(ENV_MAP_PATH, texture => sceneManager.setEnvironmentMap(texture))
    new GLTFLoader().load(MODEL_PATH, model => {
        let meshModel = new ENGINE.MeshModel('Model', model)
        let material = new THREE.MeshBasicMaterial({opacity: 0, transparent: true, color: 0xffffff})
        let box1 = new THREE.BoxGeometry(0.75, 0.4, 0.75)
        let mesh1 = new ENGINE.StaticModel('Box1', box1, material, false, true)
        mesh1.setPosition(0, 0.32, 0)
        meshModel.addDrawable(mesh1)
        let box2 = new THREE.BoxGeometry(0.75, 1.1, 0.3)
        let mesh2 = new ENGINE.StaticModel('Box2', box2, material, false, true)
        mesh2.setPosition(0, 0.6, -0.4)
        meshModel.addDrawable(mesh2)
        sceneManager.register(meshModel)
    })
    let hotSpot1 = new ENGINE.Hotspot('Hotspot1', new THREE.Vector3(-0.3, 0.5, 0.4))
    hotSpot1.setOnClick(e => {
        sidebarImage.src = './assets/eredin.jpg'
        sidebarText.innerHTML = 'EREDIN BREACC GLAS'   
        if (!sidebar.isVisible())
            sidebar.show()
    })
    sceneManager.register(hotSpot1)
    let hotSpot2 = new ENGINE.Hotspot('Hotspot2', new THREE.Vector3(0.3, 0.5, 0.4))
    hotSpot2.setOnClick(e => {
        sidebarImage.src = './assets/gaunter.jpg'
        sidebarText.innerHTML = 'GAUNTER O DIMM' 
        if (!sidebar.isVisible())
            sidebar.show()
    })
    sceneManager.register(hotSpot2)
    let hotSpot3 = new ENGINE.Hotspot('Hotspot3', new THREE.Vector3(-0.05, 0.75, -0.22))
    hotSpot3.setOnClick(e => {
        sidebarImage.src = './assets/detlaff.jpg'
        sidebarText.innerHTML = 'DETLAFF VAN DER ERETEIN'  
        if (!sidebar.isVisible())
            sidebar.show()
    })
    sceneManager.register(hotSpot3)
}