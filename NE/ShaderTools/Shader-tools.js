class ShaderTool{
    static instanceCount = 0;
    constructor(){
        this.instanceCount ++;
        console.log("new shader tool,count:"+this.instanceCount);
    }
    /**
     * to initiate the shader program using vshader and fshader;
     * @param {webGL context} gl 
     * @param {vertex shader} vshader 
     * @param {fragment shader} fshader 
     */
    initShaders(gl, vshader, fshader) {//tools for webGL
        let program = createProgram(gl, vshader, fshader);
        if(!program){
            console.log("cannot create program\n");
            return false;
        }
        gl.useProgram(program);
        gl.program = program;

        return true;
    }
    /**
     * to create a GL program which is used to using shaders we write;
     * @param {webGL context} gl 
     * @param {vertex shader} vshader 
     * @param {fragment shader} fshader 
     */
    createProgram(gl, vshader, fshader) {
        let vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
        let fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);

        if(!vertexShader || !fragmentShader){
            return null;
        }

        let program = gl.createProgram();
        if(!program){
            console.log("failed to create Program");
            return null;
        }

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        gl.linkProgram(program);

        let linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if(!linked){
            console.log("cannot link program："+gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            gl.deleteShader(fragmentShader);
            gl.deleteShader(vertexShader);
            return null;
        }
        return program;
    }
    /**
     * to use source code of shader to loadshader,then delete shader;
     * @param {webGL context} gl 
     * @param {shader type,(vertexShader || fragmentShader)} type 
     * @param {the glsl code of the shader} shader_source 
     */
    loadShader(gl, type, shader_source) {
        let shader = gl.createShader(type);
        if(shader ==null){
            console.log("cannot create shader\n");
            return null;
        }

        gl.shaderSource(shader, shader_source);
        gl.compileShader(shader);

        let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            console.log('Failed to compile shader: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }
 }
module.exports={
    ShaderTool:ShaderTool,
}