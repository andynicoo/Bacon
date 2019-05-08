
cc.Class({
    extends: cc.Component,

    properties: {
        dragSwitch: cc.Node
    },

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = /* cc.PhysicsManager.DrawBits.e_aabbBit | */ cc.PhysicsManager.DrawBits.e_pairBit | cc.PhysicsManager.DrawBits.e_centerOfMassBit | cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;
    },
    start () {
        let that = this
        cc.loader.loadRes('/level/level1.json', function (err, o) {
            let nodes = o.json.nodes
            if(nodes.length){
                nodes.forEach((element)=>{
                    that.createNode(element)
                })
            }

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
    // 创建节点、加载sprite
    createNode(element){
        let that = this;
        cc.loader.loadRes('/texture/' + element.self.name, cc.SpriteFrame,function(err,spriteFrame){
            let node = new cc.Node(element.self.name)
            node.position = element.self.position
            node.width = element.self.width
            node.height = element.self.height
            let sprite = node.addComponent(cc.Sprite)
            sprite.spriteFrame = spriteFrame
            cc.find('Canvas').addChild(node);
            that.createRigidBody(node,element.rigidBody)
            that.createCollider(node,element.collider)
        })
    },
    // 添加刚体
    createRigidBody(node,data){
        let rigidBody = node.addComponent(cc.RigidBody)
        rigidBody.type = cc.RigidBodyType.Static
    },
    // 添加碰撞属性
    createCollider(node,data){
        let collider = node.addComponent(cc.PhysicsPolygonCollider)
        let points = []
        collider.offset = data.offset
        collider.friction = data.friction
        collider.restitution = data.restitution
        data.points.forEach((point)=>{
            points.push(cc.v2(point))
        })
        collider.points = points
        collider.apply()
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
