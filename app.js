const http = require('http')
const port = 3000

console.clear()

const server = http.createServer((req, res) => {
  let body = [];
  const { header, method, url } = req

  let bodyOutput = {
    "RezervasyonYapılabilir":true,
    "YerlasimAyrinti": []
  }

  function calcCapRate(seats, cap) {
    return (seats / cap) * 100
  }

  req.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    data = JSON.parse(body)
    for(let i = 0; i < data.Tren.Vagonlar.length; i++) {
      data.Tren.Vagonlar[i].dolulukOrani = calcCapRate(data.Tren.Vagonlar[i].DoluKoltukAdet, data.Tren.Vagonlar[i].Kapasite)
      if (data.KisilerFarkliVagonlaraYerlestirilebilir) {
        while (data.Tren.Vagonlar[i].dolulukOrani < 70 && data.RezervasyonYapilacakKisiSayisi > 0) {
          data.Tren.Vagonlar[i].DoluKoltukAdet++
          data.Tren.Vagonlar[i].dolulukOrani = calcCapRate(data.Tren.Vagonlar[i].DoluKoltukAdet, data.Tren.Vagonlar[i].Kapasite)
          data.RezervasyonYapilacakKisiSayisi--
          if ((bodyOutput.YerlasimAyrinti.length >= 1) && (bodyOutput.YerlasimAyrinti[bodyOutput.YerlasimAyrinti.length - 1].VagonAdi === data.Tren.Vagonlar[i].Ad)) {
            bodyOutput.YerlasimAyrinti[bodyOutput.YerlasimAyrinti.length - 1].KisiSayisi++
          } else {
            bodyOutput.YerlasimAyrinti.push({ VagonAdi: data.Tren.Vagonlar[i].Ad, KisiSayisi: 1})
          }
        }
      } else {
        let seats = data.Tren.Vagonlar[i].DoluKoltukAdet + data.RezervasyonYapilacakKisiSayisi
        if ((data.RezervasyonYapilacakKisiSayisi != 0) && (calcCapRate(seats, data.Tren.Vagonlar[i].Kapasite) <= 70)) {
          data.Tren.Vagonlar[i].DoluKoltukAdet += data.RezervasyonYapilacakKisiSayisi
          data.Tren.Vagonlar[i].dolulukOrani = calcCapRate(data.Tren.Vagonlar[i].DoluKoltukAdet, data.Tren.Vagonlar[i].Kapasite)
          bodyOutput.YerlasimAyrinti.push({ VagonAdi: data.Tren.Vagonlar[i].Ad, KisiSayisi: data.RezervasyonYapilacakKisiSayisi})
          data.RezervasyonYapilacakKisiSayisi -= data.RezervasyonYapilacakKisiSayisi
        }
      }
    }
    if (data.RezervasyonYapilacakKisiSayisi != 0) {
      bodyOutput.RezervasyonYapılabilir = false
      bodyOutput.YerlasimAyrinti = []
    }
    console.log("\n", bodyOutput);
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    const responseBody = { header, method, url, bodyOutput }
    res.write(JSON.stringify(responseBody, null, 2))
    res.end()
  })
})

server.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});