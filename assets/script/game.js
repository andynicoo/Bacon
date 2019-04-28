
cc.Class({
    extends: cc.Component,

    properties: {
        touchPt: {
            default: null,
            type: cc.Node,
            displayName: "节点"
        },
    },

    onLoad () {
        cc.director.getPhysicsManager().enabled = true
        
        this.touchPt.on('touchmove', this.onTouchMove, this.touchPt);
    },

    onTouchMove(touch){
        this.x += touch.getDeltaX();
        this.y += touch.getDeltaY();
    },

    start () {
        cc.loader.loadRes("bbbbb.json", function (err, aa) {
             console.log(aa,111)
            // cc.loader.load(aa.nativeUrl, function(err, result2){
            //     console.log(result2);
            // });
        });
        // let joint = prefabA.addComponent(cc.DistanceJoint);
        // joint.distance = 10;
        // joint.collideConnected = true;
        // joint.anchor = new cc.Vec2(-10,0);
        // joint.connectedAnchor = new cc.Vec2(10,0);
        // joint.connectedBody = prefabB.getComponent(cc.RigidBody);
    }
});
