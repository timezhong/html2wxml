'use strict';

var fs = require('fs-extra');
var mkdirp  = require('mkdirp');
var path = require('path');
var glob = require('glob');
var replace = require("replace");
var copydir = require('copy-dir');
var dragDrop = require('drag-drop');


const holder = document.getElementById('dropTarget')
  holder.ondragover = () => {
    return false;
  }
  holder.ondragleave = holder.ondragend = () => {
    return false;
  }
  holder.ondrop = (e) => {
    e.preventDefault()
    for (let f of e.dataTransfer.files) {
    console.log('File(s) you dragged here: ', f.path);
    var wxmlPath = path.dirname(f.path)+'/wxml/'; //在当前目录新建一个wxml文件夹 注意最后
    var wxmlFilePath = wxmlPath+'*'; //svgsprite目录
    
    console.log(wxmlPath);

    //创建目录
    if (!fs.existsSync(wxmlPath)){
        fs.mkdirSync(wxmlPath);
        console.log("创建wxml目录成功")
    }

    //拷贝文件 两个参数都是文件名称
    fs.copy(f.path, wxmlPath+path.basename(f.path,'.html')+'.wxml', function (err) {
        if (err) return console.error(err)
        console.log("html文件拷贝成功")
    });

    setTimeout(function(){
        //替换标签
    glob(wxmlFilePath, {nodir: true}, function (err, files) {
      if (err) {
          return console.error("替换标签失败");
      }
      files.forEach( function (file){

        console.log(files.length);

        console.log("替换标签");
          //view
         replace({
            regex: "(<body|<article|<aside|<ul|<li|<ol|<caption|<dd|<dl|<dt|<footer|<header|<nav|<section|<table|<thead|<tbody|<tr|<td|<th|<h1|<h2|<h3|<h4|<h5|<h6|<div|<p|<em)",
            replacement: "<view",
            paths: [file],
         });

         replace({
            regex: "(</body>|</article>|</aside>|</ul>|</li>|</ol>|</caption>|</dd>|</dl>|</dt>|</footer>|</header>|</nav>|</section>|</table>|</thead>|</tbody>|</tr>|</td>|</th>|</h1>|</h2>|</h3>|</h4>|</h5>|</h6>|</div>|</p>|</em>)",
            replacement: "</view>",
            paths: [file],
         });


         //text
         replace({
            regex: "(<span)",
            replacement: "<text",
            paths: [file],
         });
         replace({
            regex: "(</span>)",
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

         //input type text 
         replace({
            regex: '(<input type="text")',
            replacement: "<input",
            paths: [file],
         });

         //input type checkbox 
         replace({
            regex: '(<input type="checkbox")',
            replacement: "<checkbox",
            paths: [file],
         });

         //input type radio 
         replace({
            regex: '(<input type="radio")',
            replacement: "<radio",
            paths: [file],
         });


      });
    }) 
    //替换标签  
    },2000);
    





    }
    return false;
  }


  





























