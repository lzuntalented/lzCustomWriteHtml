/**
 * Created by lz on 2018/2/24.
 * 自定义渲染处理函数集合
 */
/**
 * 测试
 * 渲染三栏布局
 * @param {Array} arr 子元素处理后结合
 * @returns {Array}
 */
function renderThird(arr) {
    const result = [];
    if (arr.length !== 3) {
        console.error('解析三栏布局错误，子元素只能为3个!');
        return arr;
    }

    const cls = ['main', 'left', 'right']
    arr.forEach((str, idx) => {
        result.push('<div class="' + cls[idx] + '">' + str + '</div>')
    });
    return result;
}

module.exports = [renderThird];