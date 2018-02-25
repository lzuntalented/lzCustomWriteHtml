/**
 * Created by lz on 2018/2/23.
 */
const { isObject, isUndefined } = require('./tools') ;
const Node = require('./Node') ;
const DefaultConfig = require('./config');
const RenderFuncs = require('./RenderFunc');

class RenderHtml {
    constructor(data = '', lng = '') {
        this.data = data;
        this.language = lng;
        this.initVars();

        this.run();
    }

    initVars() {
        this.result = '';
        if (this.language !== '' && isObject(this.language)) {
            this.language = [].concat(this.language, DefaultConfig);
        }
    }

    run() {
        this.result = this.changeToHtml(this.data);
    }

    /**
     * 解析文本内容，取出标签名和属性列表
     * @param str
     * @returns {{alias: string, attrs: string}}
     */
    parseText(str) {
        const result = {
            alias: '',
            attrs: ''
        };

        // 手动纯文本实例
        if (str.startsWith('!')) {
            result.alias = (Math.random() * 1000) + '-lz-' + str;
        }

        let list = str.split('[');
        // 取出标签别名
        result.alias = list[0];
        if (list.length > 1) {
            let attrs = list[1].trim();
            if (attrs.length > 0) {
                // 去除最后的]
                if (attrs[attrs.length - 1] === ']') {
                    attrs = attrs.substr(0, attrs.length - 1);
                }
                list = attrs.split(',');
                let tmp = ' ';
                list.forEach(it => {
                    it = it.trim();
                    // 为属性添加引号
                    tmp += it.replace(/([^=]*)=(.*)/i, '$1="$2" ');
                });
                result.attrs = tmp;
            }
        }
        return result;
    }

    changeToHtml(obj){
        const text = this.parseText(obj.text.trim());
        const alias = text.alias;

        const info = this.findTag(alias);
        let tag;
        let result = '';

        if (alias !== '' && info) {
            tag = info.tag;
            result += '<' + tag + text.attrs + '> \n';
        }

        if (alias === '' || info) {
            if (obj.children) {
                let tmp = [];
                for(let len = obj.children.length, i = 0; i < len; ++i) {
                    tmp.push(this.changeToHtml(obj.children[i]));
                }
                // 自定义渲染处理
                if (info !== null && info.render >= 0 && RenderFuncs[info.render]) {
                    tmp = RenderFuncs[info.render](tmp);
                }
                result += tmp.join('');
            }
        } else {
            result += alias;
        }

        if (alias !== '' && info) {
            result += '</' + tag + '> \n';
        }
        return result;
    }

    parse(){
        return this.result;
    }

    /**
     * 获取当前别名对应的配置
     * @param alias
     * @returns {*}
     */
    findTag(alias) {
        const list = this.language;
        for (let len = list.length, i = len - 1; i >= 0; --i){
            if (list[i].alias === alias) {
                return list[i];
            }
        }
        return null;
    }
}

module.exports = RenderHtml;