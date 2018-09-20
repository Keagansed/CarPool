// local version
// export default "http://localhost:3001"
// export default "http://192.168.88.58:3001"

// live version
// export default "https://backend.carpool.iminsys.com"

// debug version
// export default ""

let server = "";

if(process.env.NODE_ENV === 'production') {
    server = "https://backend.carpool.iminsys.com/"
}else {
    server = "";
}

export default server;