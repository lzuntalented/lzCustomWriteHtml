/**
 * Created by lz on 2018/2/23.
 */
const { getSpaceBefore, getStackTop, stackPop } = require('./tools') ;
const Node = require('./Node') ;

/**
 * 解析模板内容，并生成树桩结构
 */
class ParseTpl {
    /**
     * @param {Array} content 模板内容，以行为单位的数组
     * @param {Number} deep 子元素空格数量
     */
    constructor(content = [], deep = 4) {
        this.each_deep = deep;
        this.content = content;
        this.initVars();

        this.run();
    }

    /**
     * 初始化变量
     */
    initVars() {
        // 构建使用的栈结构
        this.stack = [];
        // 放入初始栈内容
        const tree = new Node(0 - this.each_deep);
        this.stack.push(tree);
    }

    run() {
        const content = this.content;
        const each_deep = this.each_deep;
        const stack = this.stack;

        let last_deep = -4;
        const len = content.length;
        let i = 0;
        while(i < len) {
            // 不处理空行
            if (content[i].trim() === '') {
                i++;
                continue;
            }

            const now_deep = last_deep + each_deep;
            const really_deep = getSpaceBefore(content[i]);
            if(really_deep === now_deep) {
                const n = new Node(now_deep, content[i]);
                const parent = getStackTop(stack);
                parent.children.push(n);
                i++;
            } else if(really_deep < now_deep) {
                stackPop(stack);
                last_deep -= each_deep;
            } else if(really_deep === now_deep + each_deep) {
                const parent = getStackTop(stack);
                const no = parent.children[parent.children.length - 1];
                stack.push(no);
                last_deep += each_deep;
            } else {
                console.error((i + 1) + '行出现错误，空格数量出错');
                break;
            }
        }
    }

    parse(){
        return this.stack[0];
    }
}

module.exports = ParseTpl;