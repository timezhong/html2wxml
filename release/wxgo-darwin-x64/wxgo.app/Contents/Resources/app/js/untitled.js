'use strict';

var fs = require('fs-extra');
var mkdirp  = require('mkdirp');
var path = require('path');
var glob = require('glob');
var replace = require("replace");
var copydir = require('copy-dir');
var dragDrop = require('drag-drop');


dragDrop('#dropTarget', function (files) {

//waterfall
async.waterfall([  
    function (callback){  
        getHtml();
        callback(null, 'one', 'two');  
    },  
    function(arg1, arg2, callback){ 
        replace(); 
        callback(null, 'three');  
    } 
], function (err, result) {  
   // result now equals 'done'      
});  
//waterfall


    var wxmlPath = path.dirname(files[0].path)+'/wxml/'; //在当前目录新建一个wxml文件夹 注意最后
    var wxmlFilePath = wxmlPath+'*'; //svgsprite目录
    
    //创建目录
    if (!fs.existsSync(wxmlPath)){
        fs.mkdirSync(wxmlPath);
        console.log("创建wxml目录成功")
    }
    console.log(wxmlPath);
    
    //获取文件信息
    files.forEach(function (file) {
        var reader = new FileReader()
        reader.addEventListener('load', function (e) {
            var arr = new Uint8Array(e.target.result)
            var buffer = new Buffer(arr)

        })
        reader.addEventListener('error', function (err) {
            console.error('FileReader error' + err)
        })
        reader.readAsArrayBuffer(file);

        //拷贝文件 两个参数都是文件名称
        fs.copy(file.path, wxmlPath+path.basename(file.path,'.html')+'.wxml', function (err) {
            if (err) return console.error(err)
            console.log("html文件拷贝成功")
        });
        
    });

    console.log("准备替换标签");


    replace();
    function replace(){
    
    //替换标签
    glob(wxmlFilePath, {nodir: true}, function (err, files) {
      if (err) {
          return console.error("替换标签失败");
      }
      files.forEach( function (file){


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
            regex: "(</navigator>)",
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
    };
    
    
    
  
})

  





























