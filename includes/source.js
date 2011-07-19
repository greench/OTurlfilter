/*
 * Smart Ads Blocker - Presentation
 * Inspired from http://www.floppymoose.com
 */

 // TODO : Select element by mouse and add to pattern
 //function blockScript( ) { @TODO
 //	items = JS.split("::");
 // 	for (i = 0; i < items.length; i++) {
 // 		if(items[i].search(/currentMark/) != -1) {
 // 			JS.replace(items[i]+"::","");
 // 		}
 // 	}
//}

//function pauseJavascript() { @TODO
//	items = document.getElementsByTagName("script");
//	for (i = 0; i < items.length; i++)
// 	{
// 		JS += items[i].src + "::";
// 		items[i].parentNode.removeChild(items[i]);
// 	}
//}

//function resumeJavascript() { @TODO
//	items = JS.split("::");
//	for (i = 0; i < items.length; i++)
//	{
//		var elem = document.createElement("script");
//		elem.src = items[i];
//		elem.type="text/javascript";
//		document.getElementsByTagName("head")[0].appendChild(elem);
//	}
//	return;
//}



SABmisc = {
	/* Misc functions - clean, search, mark etc. */
	clean : function(/* String */ str) {
		/* Clean unwanted space in string */
		str = str.replace("\n","");
		str = str.replace("\r","");
		return str;
	},
	identify : function(/* String */ str) {
		// Identify the mark
		if(str.substr(0,1) == "#") {
			SAB.identify = "id";
		} else if(str.substr(0,1) == ".") {
			SAB.identify = "class";
		} else {
			SAB.identify = "href";
		}
	}
}

SAB = {
	/* SAB init */
	mark : "",
	identify : "href",
	init : function() {
		if (!document.styleSheets[0]) {
			var cssEl  = document.createElement('link');
			cssEl.type = 'text/css';
			cssEl.rel = 'stylesheet';
			document.getElementsByTagName('body')[0].appendChild(cssEl);
		}
		var style = document.styleSheets[0];
		// Start Insert
		//opera.postError(this.identify)
		switch (this.identify) {
			case 'href':
			style.insertRule('a[href*="'+this.mark+'"]{display:none}', 0);
			style.insertRule('iframe[src*="'+this.mark+'"]{display:none}', 0);
			//style.insertRule('img[src*="'+this.mark+'"]{display:none}', 0);
			break;
			case 'class':
			case 'id':
			style.insertRule(this.mark+'{display:none}', 0);
			break;
		}
		// End of Insert
	}
}

opera.extension.onmessage = function(event){
	var pattern = event.data;
	var standard = pattern.split("\n");
	opera.postError(pattern);

	// Standard - solid blocking
	stdCount = standard.length;
	for (i = 0; i < stdCount; i++)
	{
		mark = SABmisc.clean(standard[i]);
		SABmisc.identify(standard[i]);
		SAB.mark = mark;
		SAB.init();
	}
	// Standard - solid blocking end
}