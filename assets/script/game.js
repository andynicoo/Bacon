
cc.Class({
    extends: cc.Component,

    properties: {
        dragSwitch: cc.Node
    },

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = /* cc.PhysicsManager.DrawBits.e_aabbBit | */ cc.PhysicsManager.DrawBits.e_pairBit | cc.PhysicsManager.DrawBits.e_centerOfMassBit | cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;
        this.down({a:'1'},'1.json')
    },
    start () {
        cc.loader.loadRes("bbbbb.json", function (err, aa) {
            // console.log(aa,111)
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
    },
    down (content, filename) {
        var eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        // 字符内容转变成blob地址
        var blob = new Blob([JSON.stringify(content, null, 2)], {
			type: "data:application/json;charset=utf-8"
		});
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    }
});
