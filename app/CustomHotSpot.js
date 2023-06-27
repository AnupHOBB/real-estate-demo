import * as ENGINE from 'engine'

/**
 * Represents the hotspots that appera attached onto a 3D model
 */
export class CustomHotspot extends ENGINE.Hotspot
{
    /**
     * @param {String} name name of the hotspot used in sending and receiving messages
     * @param {THREE.Vector3} worldPosition position of the hotspot in world space
     */
    constructor(name, worldPosition)
    {
        super(name, worldPosition)
        this.shouldRender = true
    }

    /**
     * Displays the hotspot
     */
    show()
    {
        if (this.shouldRender)
            super.show()
    }

    onSceneStart(sceneManager) { this.show() }

    /**
     * Called by OrbitalCameraManager every frame.
     * This function performs the actual zoom in and out process once it has started in onMessage.
     * @param {SceneManager} sceneManager the SceneManager object
     */
    onSceneRender(sceneManager)
    {
        let [rasterCoord, showHotSpot] = sceneManager.getRasterCoordIfNearest(this.worldPosition)
        if (showHotSpot)
        {    
            this.setRasterCoordinates(rasterCoord.x, rasterCoord.y)
            this.show()
        }
        else
            super.hide()
    }

    /**
     * Called by SceneManager as soon as the object gets unregistered in SceneManager.
     * @param {SceneManager} sceneManager the SceneManager object
     */
    onSceneEnd(sceneManager) { super.hide() }
}