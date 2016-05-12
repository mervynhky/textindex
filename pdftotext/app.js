var canvas = document.createElement('canvas');
var context = null;
var textLayer = document.createElement('div');
textLayer.className = 'textLayer';



function App(curPage) {
    var self = this;
    this.complete = 0;
    console.log("curPage in App is : " + curPage);

    this.pdfToText = function (data) {
        var div = document.getElementById('viewer');

        // render the first pages
        var pdf = new PDFJS.PDFDoc(data);
        //var total = pdf.numPages;

        //for (i = 1; i <= total; i++){
        var page = pdf.getPage(curPage);

        canvas.id = 'page' + curPage;
        canvas.mozOpaque = true;
        div.appendChild(canvas);

        canvas.width = page.width;
        canvas.height = page.height;

        context = canvas.getContext('2d');
        context.save();
        context.fillStyle = 'rgb(255, 255, 255)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();


        self.setMessage("Rendering...");

        document.body.appendChild(textLayer)

        page.startRendering(context, function () {
                //if (++self.complete == total){
                if (++self.complete == curPage) {
                    self.setMessage("Finished rendering. Extracting text...");

                    window.setTimeout(function () {
                        var layers = [];
                        var nodes = document.querySelectorAll(".textLayer > div");
                        for (var j = 0; j < nodes.length; j++) {
                            layers.push(nodes[j].textContent + "\n");
                        }
                        self.sendOutput(layers.join("\n"));
                        //console.log("TEXT LAYERS MERGED: " + layers.join("\n"));
                        self.setMessage("( ͡° ͜ʖ ͡°) Done!");
                    }, 1000);
                }
            },
            textLayer);
        //}
    };

    this.receiveInput = function (event) {
        if (event.source != parent) return;
        if (!event.data.byteLength) return alert("The PDF data needs to be an ArrayBuffer");
        self.setMessage("Received data");
        self.pdfToText(event.data);
    }

    this.sendOutput = function (text) {
        var recipient = parent.postMessage ? parent : (parent.document.postMessage ? parent.document : undefined);
        recipient.postMessage(text, "*");
    };

    this.setMessage = function (text) {
        document.getElementById("message").textContent = text;
    }

    window.addEventListener("message", self.receiveInput, true);
    self.setMessage("Ready");
    self.sendOutput("ready");
}

function Apple(curPage) {
    var self = this;
    this.complete = 0;
    console.log("curPage in App is : " + curPage);


    this.pdfToText = function (data) {
        var div = document.getElementById('viewer');

        // render the first pages
        var pdf = new PDFJS.PDFDoc(data);
        //var total = pdf.numPages;

        //for (i = 1; i <= total; i++){
        var page = pdf.getPage(curPage);

        canvas.id = 'page' + curPage;
        canvas.mozOpaque = true;
        div.appendChild(canvas);

        canvas.width = page.width;
        canvas.height = page.height;

        context = canvas.getContext('2d');
        context.save();
        context.fillStyle = 'rgb(255, 255, 255)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();


        self.setMessage("Rendering...");

        document.body.appendChild(textLayer)

        page.startRendering(context, function () {
                    self.setMessage("Finished rendering. Extracting text...");

                    window.setTimeout(function () {
                        var layers = [];
                        var nodes = document.querySelectorAll(".textLayer > div");
                        for (var j = 0; j < nodes.length; j++) {
                            layers.push(nodes[j].textContent + "\n");
                        }
                        self.sendOutput(layers.join("\n"));
                        //console.log("TEXT LAYERS MERGED: " + layers.join("\n"));
                        self.setMessage("( ͡° ͜ʖ ͡°) Done!");
                    }, 1000);
            },
            textLayer);
    };

    this.receiveInput = function (event) {
        if (event.source != parent) return;
        if (!event.data.byteLength) return alert("The PDF data needs to be an ArrayBuffer");
        self.setMessage("Received data");
        self.pdfToText(event.data);
    }

    this.sendOutput = function (text) {
        var recipient = parent.postMessage ? parent : (parent.document.postMessage ? parent.document : undefined);
        recipient.postMessage(text, "*");
    };

    this.setMessage = function (text) {
        document.getElementById("message").textContent = text;
    }

    window.addEventListener("message", self.receiveInput, true);
    self.setMessage("Ready");
    self.sendOutput("ready");
}

//function AppTwo(curPage) {
//    var self = this;
//    this.complete = 0;
//
//    this.pdfToText = function (data) {
//        var div = document.getElementById('viewer');
//        var pdf = new PDFJS.PDFDoc(data);
//        console.log("CURPAGE IS: " + curPage);
//        var page = pdf.getPage(curPage);
//        canvas.id = 'page' + curPage;
//        canvas.mozOpaque = true;
//        div.appendChild(canvas);
//
//        canvas.width = page.width;
//        canvas.height = page.height;
//
//        context = canvas.getContext('2d');
//        context.save();
//        context.fillStyle = 'rgb(255, 255, 255)';
//        context.fillRect(0, 0, canvas.width, canvas.height);
//        context.restore();
//
//        self.setMessage("Rendering...");
//
//        page.startRendering(context, function () {
//            if (self.complete == curPage) {
//                self.setMessage("Finished rendering. Extracting text...");
//
//                window.setTimeout(function () {
//                    var layers = [];
//                    var nodes = document.querySelectorAll(".textLayer > div");
//                    for (var j = 0; j < nodes.length; j++) {
//                        layers.push(nodes[j].textContent + "\n");
//                    }
//                    self.sendOutput(layers.join("\n"));
//                    self.setMessage("( ͡° ͜ʖ ͡°) Done!");
//                }, 1000);
//            }
//        }, textLayer);
//    };
//
//    this.receiveInput = function (event) {
//        if (event.source != parent) return;
//        if (!event.data.byteLength) return alert("The PDF data needs to be an ArrayBuffer");
//        self.setMessage("Received data");
//        self.pdfToText(event.data);
//    }
//
//    this.sendOutput = function (text) {
//        var recipient = parent.postMessage ? parent : (parent.document.postMessage ? parent.document : undefined);
//        recipient.postMessage(text, "*");
//    };
//
//    this.setMessage = function (text) {
//        document.getElementById("message").textContent = text;
//    }
//
//    window.addEventListener("message", self.receiveInput, true);
//    self.setMessage("Ready");
//    self.sendOutput("ready");
//}