const http = require('http')

console.clear()

const data = JSON.stringify({
    "Tren":
    {
        "Ad":"Baskent Ekspres",
        "Vagonlar":
        [
            {"Ad":"Vagon 1", "Kapasite":100, "DoluKoltukAdet":68},
            {"Ad":"Vagon 2", "Kapasite":90, "DoluKoltukAdet":62},
            {"Ad":"Vagon 3", "Kapasite":80, "DoluKoltukAdet":50},
            {"Ad":"Vagon 4", "Kapasite":120, "DoluKoltukAdet":80}
        ]
    },
    "RezervasyonYapilacakKisiSayisi":5,
    "KisilerFarkliVagonlaraYerlestirilebilir":false
})

const options = {
    hostname: '127.0.0.1',
    port: 3000,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
}

console.log(JSON.parse(data));
console.log(JSON.parse(data).Tren);

const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    res.on('data', d => {
        process.stdout.write(d)
    })
})

req.on('error', error => {
    console.error(error)
})

req.write(data)
req.end()