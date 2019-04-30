
cc.Class({
    extends: cc.Component,

    onLoad () {
        this.node.on('touchmove', this.onTouchMove.bind(this), this.node);
    },

    onTouchMove(touch){
        let shapeDragStatus = this.node.parent.getChildByName('shape').getComponent(cc.Toggle).isChecked;
        let rigidDragStatus = this.node.parent.getChildByName('rigid').getComponent(cc.Toggle).isChecked;
        if(shapeDragStatus){ 
            this.node.x += touch.getDeltaX();
            this.node.y += touch.getDeltaY();
        }
        
        if(rigidDragStatus){
            let collider = this.node.getComponent(cc.PhysicsPolygonCollider)
            let x = collider.offset.x + touch.getDeltaX();
            let y = collider.offset.y + touch.getDeltaY();
            collider.offset = cc.v2(x,y)
            collider.apply()
        }
    }
});
