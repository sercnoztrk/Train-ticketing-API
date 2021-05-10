# Ada-Yaz-l-m-API

In order to run this API "node app.js" command needs to be executed from the project folder. JSON object also can be post using "node post.js" command with following object structure below provided in the file.

{
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
}

Then the response returns from server application similiar to below object:

{
  'RezervasyonYapılabilir': true,
  YerlasimAyrinti: [ { VagonAdi: 'Vagon 3', KisiSayisi: 5 } ]
}
