/**
 * Created by lz on 2018/2/23.
 */
const fs = require('fs');
const _path = require('path');
const ParseTpl = require('./ParseTpl');
const RenderHtml = require('./RenderHtml');

// 模板文件路径
const tplPath = _path.resolve(__dirname, '../tpl') + '/';
// 输出文件路径
const outputPath = _path.resolve(__dirname, '../output') + '/';
// 语言配置文件路径
const configPath = _path.resolve(__dirname, './config') + '/';

/**
 * 解析命令行参数
 * 携带两个参数 path language
 * path 可以为文件或目录
 * language 解析语言配置文件
 * @returns {{path: string, lng: string}}
 */
function parseArgs() {
    const result = {
        path: '',
        lng: ''
    };
    const arguments = process.argv.splice(2);
    const len = arguments.length;
    if (len === 0) {
        console.error('无效的参数');
        return;
    } else if (len === 1) {
        result.path = arguments[0].trim();
    } else {
        result.path = arguments[0].trim();
        result.lng = arguments[1].trim();
    }
    return result;
}

/**
 * 显示错误信息并退出程序
 * @param str
 */
function showErrorAndExit(str) {
    console.error(str);
    process.exit()
}

const obj = parseArgs();
if (obj) {
    let lng;
    // 检查语言配置
    if (obj.lng !== '') {
        try {
            fs.readFileSync(configPath + obj.lng + '.js');
            lng = require(configPath + obj.lng);
        } catch (e) {
            showErrorAndExit(obj.lng + ' 语言配置文件不存在，请检查!');
        }
    }

    const filePath = tplPath + obj.path;
    let handler;
    try {
        handler = fs.statSync(filePath);
    } catch (e) {
        showErrorAndExit(obj.path + ' 语言配置文件不存在，请检查!');
    }

    if (handler.isDirectory()) {

        // 检查输出目录是否存在
        try {
            handler = fs.statSync(outputPath + obj.path);
        } catch (e) {
            fs.mkdirSync(outputPath + obj.path);
        }

        const files = fs.readdirSync(filePath);
        for (let len = files.length, i = len - 1; i >= 0; --i) {
            run(obj.path + '/' + files[i], lng);
        }
    } else {
        run(obj.path, lng);
    }
}

/**
 * 執行解析
 * @param path
 * @param lng
 */
function run(path, lng) {
    let tpl = fs.readFileSync(tplPath + path, 'utf-8');
    tpl = tpl.split('\r\n');
    const tree = new ParseTpl(tpl);

    const renderHtml = new RenderHtml(tree.parse(), lng);
    const html = renderHtml.parse();

    const output = outputPath + path + '.html';
    fs.writeFile(output, html, function (err) {
        console.log('输出文件 ' + path + '.html : ' + (err ? '失败' : '成功'));
    })
}
