//$Id$
var ZCSecurity = new function(){

	this.isURLXSSVulnerable = function (urlString) {
		if(urlString){
			var urlStringLowerCase =  urlString.trim().toLowerCase();
			var linkEl =  document.createElement('a');
			linkEl.href = urlStringLowerCase;
			var urlprotocol = linkEl.protocol;
			if (urlprotocol.indexOf("javascript:") === 0 || urlprotocol.indexOf("vbscript:") ===0 || urlprotocol.indexOf("data:") ===0){
	            return true;}
			urlStringLowerCase =  urlStringLowerCase.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, "\"").replace(/'/g, "'");
			try {
	            var n = decodeURIComponent(ZCSecurity.safariCheck(urlStringLowerCase)).replace(/[^\w:]/g, "").toLowerCase();
	        } catch (i) {}
	        if (n.indexOf("javascript:") === 0 || n.indexOf("vbscript:") === 0 || n.indexOf("data:") ===0) {
	            return true;
	        }
		}
		return false;
	}
	this.safariCheck = function (e) {
		return e.replace(/&([#\w]+);/g, function(e, t) {
		        if (t === "colon"){
		            return ":";}
		        if (t.charAt(0) === "#") {
		            return t.charAt(1) === "x" ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1));
		        }
		        return "";
		    });
	}
}();

