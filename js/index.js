'use strict';

var fs = require('fs-extra');
var mkdirp  = require('mkdirp');
var path = require('path');
var glob = require('glob');
var replace = require("replace");
var copydir = require('copy-dir');
var dragDrop = require('drag-drop');
var $ = require('jQuery');
var rem  = require('remove-html-element');

const holder = document.getElementById('dropTarget')
    holder.ondragover = (e) => {
        //拖入和成功状态
        document.getElementById('dropTarget').classList.add('act');
        document.getElementById('dropTarget').classList.remove('succ');
        return false;
        
    }
    holder.ondragleave = holder.ondragend = (e) => {
        //拖入和成功状态
        document.getElementById('dropTarget').classList.remove('act');
        document.getElementById('dropTarget').classList.remove('succ');
        return false;
    }
    holder.ondrop = (e) => {
        //拖入和成功状态
        document.getElementById('dropTarget').classList.remove('act');
        document.getElementById('dropTarget').classList.remove('succ');
        e.preventDefault()
        for (let f of e.dataTransfer.files) {
        console.log('File(s) you dragged here: ', f.path);
        var wxmlPath = path.dirname(f.path)+'/wxml/'; //在当前目录新建一个wxml文件夹 注意最后
        var wxmlFilePath = wxmlPath+'*'; 

        //创建目录
        if (!fs.existsSync(wxmlPath)){
            fs.mkdirSync(wxmlPath);
        }
        //拷贝文件 两个参数都是文件名称
        fs.copy(f.path, wxmlPath+path.basename(f.path,'.html')+'.wxml', function (err) {
            if (err) return console.error(err)
        });

        setTimeout(function(){
            //替换标签
            glob(wxmlFilePath, {nodir: true}, function (err, files) {
                if (err) {
                    return console.error("替换标签失败");
                }
                files.forEach( function (file){

                    //head标签内内容
                    var regex = /<![\s\S]*?<\/head>/;
                    fs.readFile(file, 'utf8', function (err,data) {
                        if (err) {
                            return console.log(err);
                        }
                        let m;
                        if ((m = regex.exec(data)) !== null) {
                            m.forEach((match, groupIndex) => {
                                var result = data.replace(`${match}`, '');
                                fs.writeFile(file, result, 'utf8', function (err) {
                                 if (err) return console.log(err);
                                });
                            });
                        }
                    });
                    //view
                    replace({
                        regex: "(<body|<article|<aside|<ul|<li|<ol|<caption|<dd|<dl|<dt|<footer|<header|<section|<table|<thead|<tbody|<tr|<td|<th|<h1|<h2|<h3|<h4|<h5|<h6|<div|<p)",
                        replacement: "<view",
                        paths: [file],
                    });
                    //html
                     replace({
                        regex: "(</html>)",
                        replacement: "",
                        paths: [file],
                     });

                    //view 
                     replace({
                        regex: "(</body>|</article>|</aside>|</ul>|</li>|</ol>|</caption>|</dd>|</dl>|</dt>|</footer>|</header>|</nav>|</section>|</table>|</thead>|</tbody>|</tr>|</td>|</th>|</h1>|</h2>|</h3>|</h4>|</h5>|</h6>|</div>|</p>)",
                        replacement: "</view>",
                        paths: [file],
                     });


                     // img标签
                     replace({
                        regex: '(<img.*?\>)',
                        replacement: '$1</image>',
                        paths: [file],
                     });
                     // image标签增加属性
                     replace({
                        regex: "(<img)",
                        replacement: '<image mode=""',
                        paths: [file],
                     });
                   //nav
                     replace({
                        regex: "(<nav>)",
                        replacement: "<view>",
                        paths: [file],
                     });
                    //nav
                     replace({
                        regex: "(<nav )",
                        replacement: "<view ",
                        paths: [file],
                     });
                     //text
                     replace({
                        regex: "(<i>|<s>|<b>)",
                        replacement: "<text>",
                        paths: [file],
                     });
                     //text
                     replace({
                        regex: "(<i |<s |<b )",
                        replacement: "<text ",
                        paths: [file],
                     });
                     //text
                     replace({
                        regex: "(<span|<strong)",
                        replacement: "<text",
                        paths: [file],
                     });
                     replace({
                        regex: "(</span>|</s>|</b>|</i>|</strong>)",
                        replacement: "</text>",
                        paths: [file],
                     });

                     //navigator
                     replace({
                        regex: "(<a)",
                        replacement: "<navigator",
                        paths: [file],
                     });
                     replace({
                        regex: "(</a>)",
                        replacement: "</navigator>",
                        paths: [file],
                     });
          });
        }) 
        //替换标签  
        },2000);
        
        // 成功状态
        document.getElementById('dropTarget').classList.add('succ');


    }
    return false;
}


  





























