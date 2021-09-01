const elem = document.getElementById('3d-graph');

const Graph = ForceGraph3D()
    (elem)
    .jsonUrl('miserables.json')
    .nodeLabel('id')
    .nodeThreeObject(node => {
        const sprite = new SpriteText(node.id);
        sprite.material.depthWrite = true; // make sprite background transparent
        sprite.color = node.color;
        sprite.textHeight = 4;
        return sprite;
    }).height(window.innerHeight - 60)
    .linkVisibility(true).linkColor("#000000").linkOpacity(1).linkWidth("10px")
    .backgroundColor("#FFFFFF")
    .onNodeClick(node => {
        // Aim at node from outside it
        const distance = 40;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

        Graph.cameraPosition({
                x: node.x * distRatio,
                y: node.y * distRatio,
                z: node.z * distRatio
            }, // new position
            node, // lookAt ({ x, y, z })
            1000 // ms transition duration
        );
    });

elementResizeDetectorMaker().listenTo(
    document.getElementById('3d-graph'),
    el => Graph.width(el.offsetWidth)
);
Graph.d3Force('charge').strength(-2);