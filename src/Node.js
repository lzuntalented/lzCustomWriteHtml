/**
 * Created by lz on 2018/2/23.
 */
/**
 * 节点描述
 */
class Node {
    constructor(deep, text = '', children = []) {
        // 节点深度
        this.deep = deep;
        // 节点文本
        this.text = text;
        // 节点子元素集合
        this.children = children;
    }
}

module.exports = Node;