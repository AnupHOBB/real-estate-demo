export class Sidebar
{
    constructor(sidebarElement)
    {
        this._sidebarElement = sidebarElement
        this._children = []
        this._isVisible = true
        for (let child of this._sidebarElement.children)
            this._children.push(child)
    }

    getElementById(id)
    {
        for (let child of this._children)
            if (child.id == id)
                return child
    }

    show()
    {
        if (!this._isVisible)
        {
            this._sidebarElement.style.width = '500px'
            for (let child of this._children)
                this._sidebarElement.appendChild(child)
            this._isVisible = true
        }
    }

    hide()
    {
        if (this._isVisible)
        {
            this._sidebarElement.style.width = '0px'
            for (let child of this._children)
                this._sidebarElement.removeChild(child)
            this._isVisible = false
        }
    }

    isVisible() { return this._isVisible }
}