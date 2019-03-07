 function initShaders(gl, vshader, fshader) {//tools for webGL
        let program = createProgram(gl, vshader, fshader);
        if(!program){
            console.log("cannot create program\n");
            return false;
        }
        gl.useProgram(program);
        gl.program = program;

        return true;
    }
    function createProgram(gl, vshader, fshader) {
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
    function loadShader(gl, type, shader_source) {
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