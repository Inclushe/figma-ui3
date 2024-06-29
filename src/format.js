console.log("redirecting");
const scripts = document.getElementsByTagName("script");
const figmaAppScript = Array.from(document.getElementsByTagName("script")).find(
	(script) =>
		script.src.includes("figma_app-") &&
		script.src.includes(".min.js.br") &&
		!script.src.includes("runtime~figma_app"),
);
const figmaAppScriptSrc = String(figmaAppScript.src);
figmaAppScript.remove();
fetch(figmaAppScriptSrc + "?v")
	.then((res) => res.text())
	.then((text) => {
		// Find and replace instances of these strings:
		text = text.replace(/e\?"ui3":"ui2"/, '"ui3"');
		text = text.replace(/c\(e\)?"ui3":"ui2"/, '"ui3"');
		text = text.replace(/version:"ui2",/, 'version:"ui3",');
		text = text.replace(
			/initialVersion:a="ui2"}\)/,
			'initialVersion:a="ui3"})',
		);
		text = text.replace(/"ui2"===o.version/, "false");
		const blob = new Blob([text], { type: "text/javascript" });
		const newScript = document.createElement("script");
		newScript.src = URL.createObjectURL(blob);
		newScript.type = "text/javascript";
		newScript.defer = true;
		document.body.appendChild(newScript);
	});
console.log(figmaAppScriptSrc);
