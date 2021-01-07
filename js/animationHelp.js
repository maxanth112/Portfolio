
function startCompText() {

    var timePerText = 18000;
    var element = document.getElementById("comp-code");
    var details = {
        wrapperClassName: 'type-text',
        cursorClassName: 'type-cursor',
    }

    var text1 = new Typewriter(element, details);
    
    text1
        .pauseFor(500)
        .typeString('<p>Class Node {</p>')
        .typeString('<p style="text-indent: 2em;">constructor(data) {</p>')
        .typeString('<p style="text-indent: 4em;">this.data = date;</p>')
        .typeString('<p style="text-indent: 4em;">this.left = null;</p>')
        .typeString('<p style="text-indent: 4em;">this.right = null;</p>')
        .typeString('<p style="text-indent: 2em;">}</p>')
        .typeString('<p>}</p>')
        .typeString('<p>class BST {</p>')
        .pauseFor(10)
        .start();

    setTimeout(function (x) {
        element.innerHTML = "";
        var text2 = new Typewriter(element, details);

        text2
            .typeString('<p style="text-indent: 2em;">constructor() {</p>')
            .typeString('<p style="text-indent: 4em;">this.root = null;</p>')
            .typeString('<p style="text-indent: 2em;">}</p>')
            .typeString('<p>}</p>')
            .typeString('<p>insert(data) {</p>')
            .typeString('<p style="text-indent: 2em;">var newNode = new Node(data);</p>')
            .typeString('<p style="text-indent: 2em;">if (this.root === null) {</p>')
            .typeString('<p style="text-indent: 4em;">this.root = newNode;</p>')
            .pauseFor(10)
            .start();
    }, timePerText);

    setTimeout(function (x) {
        element.innerHTML = "";
        var text3 = new Typewriter(element, details);

        text3
            .typeString('<p style="text-indent: 2em;">} else {</p>')
            .typeString('<p style="text-indent: 4em;">this.insertNode(this.root, newNode);</p>')
            .typeString('<p style="text-indent: 2em;">}</p>')
            .typeString('<p>}</p>')
            .typeString('<p>insertNode(node, newNode) {</p>')
            .typeString('<p style="text-indent: 2em;">if (newNode.data < node.data) {</p>')
            .typeString('<p style="text-indent: 4em;">if (node.left === null) {</p>')
            .typeString('<p style="text-indent: 6em;">node.left = newNode;</p>')
            .typeString('<p style="text-indent: 4em;">} else {</p>')
            .pauseFor(10)
            .start();
    }, timePerText * 2);

    setTimeout(function (x) {
        element.innerHTML = "";
        var text4 = new Typewriter(element, details);

        text4
            .typeString('<p style="text-indent: 4em;">}</p>')
            .typeString('<p style="text-indent: 2em;">} else {</p>')
            .typeString('<p style="text-indent: 4em;">if (node.right === null) {</p>')
            .typeString('<p style="text-indent: 6em;">node.right = newNode;</p>')            
            .typeString('<p style="text-indent: 4em;">} else {</p>')
            .typeString('<p style="text-indent: 4em;">this.insertNode(node.right, newNode);</p>')
            .typeString('<p style="text-indent: 2em;">}</p>')
            .typeString('<p>}</p>')
            .pauseFor(10)
            .start();
    }, timePerText * 3);

    setTimeout(function (x) {
        element.innerHTML = "";
        var text5 = new Typewriter(element, details);

        text5
            .typeString('<p>removeNode(node, key) {</p>')
            .typeString('<p style="text-indent: 2em;">if (node === null) {</p>')
            .typeString('<p style="text-indent: 4em;">return null;</p>')
            .typeString('<p style="text-indent: 2em;">} else if (key < node.data) {</p>')
            .typeString('<p style="text-indent: 4em;">node.left = this.removeNode(node.left, key);</p>')
            .typeString('<p style="text-indent: 4em;">return node;</p>')
            .typeString('<p style="text-indent: 2em;">} else if (key > node.data) {</p>')
            .typeString('<p style="text-indent: 4em;">node.right = this.removeNode(node.right, key);</p>')
            .typeString('<p style="text-indent: 4em;">return node;</p>')
            .pauseFor(10)
            .start();
    }, timePerText * 4);

    setTimeout(function (x) {
        element.innerHTML = "";
        var text6 = new Typewriter(element, details);

        text6
            .typeString('<p style="text-indent: 2em;">} else {</p>')
            .typeString('<p style="text-indent: 4em;">if (node.left === null && node.right === null) {</p>')
            .typeString('<p style="text-indent: 6em;">node = null;</p>')
            .typeString('<p style="text-indent: 6em;">return node;</p>')
            .typeString('<p style="text-indent: 4em;">}</p>')
            .typeString('<p style="text-indent: 4em;">if (node.left === null) {</p>')
            .typeString('<p style="text-indent: 6em;">node = node.right;</p>')
            .typeString('<p style="text-indent: 6em;">return node;</p>')
            .typeString('<p style="text-indent: 4em;">}</p>')
            .pauseFor(10)
            .start();
    }, timePerText * 5);

    setTimeout(function (x) {
        element.innerHTML = "";
        var text7 = new Typewriter(element, details);

        text7
            .typeString('<p style="text-indent: 4em;"> else if (node.right === null) {</p>')
            .typeString('<p style="text-indent: 6em;">node = node.left;</p>')
            .typeString('<p style="text-indent: 6em;">return node;</p>')
            .typeString('<p style="text-indent: 4em;">}</p>')
            .typeString('<p style="text-indent: 4em;">var aux = this.findMinNode(node.right);</p>')
            .typeString('<p style="text-indent: 4em;">node.data = aux.data; </p>')
            .typeString('<p style="text-indent: 4em;">node.right = this.removeNode(node.right, aux.data);<p>')
            .typeString('<p style="text-indent: 4em;">return node;<p>')
            .typeString('<p style="text-indent: 2em;">}<p>')
            .typeString('<p>}<p>')
            .pauseFor(10)
            .start();
    }, timePerText * 6);
}