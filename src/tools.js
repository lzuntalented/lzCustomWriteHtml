/**
 * Created by lz on 2018/2/23.
 */
/**
 * 获取字符串左边有多少空白
 * @param str
 * @returns {Number}
 */
function getSpaceBefore(str){
    const result = str.replace(/(^\s)*[^\s].*/, '$1');
    return result.length;
}

/**
 * 获取栈顶元素
 * @param {Array} stack
 * @returns {*}
 */
function getStackTop(stack) {
    return stack[stack.length - 1];
}

/**
 * 栈顶出栈
 * @param {Array} stack
 */
function stackPop(stack){
    stack.pop();
}

function isObject(obj) {
    return typeof obj === 'object';
}

function isUndefined(obj) {
    return typeof obj === 'undefined';
}

module.exports = {
    getSpaceBefore,
    getStackTop,
    stackPop,
    isObject,
    isUndefined
};