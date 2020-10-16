const workercode = () => {
    this.onmessage = function(e) {
        this.postMessage(e.data);
    };
};
 
let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;