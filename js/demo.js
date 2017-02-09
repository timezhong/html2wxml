'use strict';

var fs = require('fs-extra');
var mkdirp  = require('mkdirp');
var path = require('path');
var glob = require('glob');
var replace = require("replace");
var copydir = require('copy-dir');
var dragDrop = require('drag-drop');

var wxmlFilePath = "/Users/timezhong/Documents/html2wxml/html/wxml/"+"*";


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




























