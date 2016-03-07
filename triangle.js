var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );  //html에서 id로 객체생성
    
    gl = WebGLUtils.setupWebGL( canvas );                 //canvas객체 setup. webgl 지원안하면 NULL return
    if ( !gl ) { alert( "WebGL isn't available" ); }      //webgl이 지원되지 않을 시 경고창


    var vertices = new Float32Array([-1, -1, -0.5, 1, 0, -1, 0, -1, 0.5, 1, 1, -1]);

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 6 );
}
