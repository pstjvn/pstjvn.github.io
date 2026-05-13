window.__a = 123;
function createHtmlToWrite() {
    return (
        "<h1>This value is inserted from parent context inline: " +
        window.__a +
        "</h1><script>function test() { console.log(&quot;This is from inline script executed in iframe context&quot;); }test();" +
        "let s = document.createElement(&quot;script&quot;);s.src=&quot;http://localhost:8000/execute.js&quot;;document.body.appendChild(s);</sc" +
        "ript>"
    );
}
function createDocumentWriteString() {
    return `javascript:document.write('${createHtmlToWrite()}')`;
}
function createDynamicIframe() {
    return `<iframe src="${createDocumentWriteString()}" />`;
}
