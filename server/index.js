const express = require('express')
const app = express()
const mysql = require('mysql')
const csvtojson = require('csvtojson')

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'root',
    databasename:'30NSEStocks'
});

db.connect((err) => {
    if(err) return console.error('error: ' +err.message);

    db.query("DROP Table sample", (err, drop) => {
        var createStatament = 
        "CRERATE TABLE sample (S.No. int, Name char(50), Current Market Price DECIMAL(50, 2), Market Cap DECIMAL(50, 2), StockP/E DECIMAL(50, 2), Dividend Yield DECIMAL(50, 2), Roce% DECIMAL(50, 2), " + 
        "ROE Previous Annun DECIMAL(50, 2), Debt to Equity DECIMAL(10, 2), EPS DECIMAL(50, 2), Reserves DECIMAL(50, 2), Debt DECIMAL(50, 2))"

        db.query(createStatament, (err, drop) => {
            if(err)
                console.log("ERROR:", err);
        });
    });
});

const fileName = "30 NSE Stocks Info.csv";
csvtojson().fromFile(fileName).then(source => {
    for(var i = 0; i<source.length; i++) {
        var S_No = source[i]["S.No."]
            Name = source[i]["Name"],
            Current_Market_Price = source[i]["Current Market Price"],
            Market_Cap = source[i]["Market Cap"],
            StockP_E = source[i]["StockP/E"],
            Dividend_Yield = source[i]["Dividend Yield"],
            ROE_Previous_Annun = source[i]["ROE Previous Annun"],
            Debt_to_Equity = source[i]["Debt to Equity"],
            EPS = source[i]["EPS"],
            Reserves = source[i]["Reserves"],
            Debt = source[i]["Debt"]

            var insertStatament = `INSERT INTO sample values(?,?,?,?,?,?,?,?,?,?,?)`;
            var items = [S_No, Name, Current_Market_Price, Market_Cap, StockP_E, Dividend_Yield, ROE_Previous_Annun, Debt_to_Equity, EPS, Reserves, Debt];

            db.query(insertStatament, items, (err, results, fields) => {
                if(err) {
                    console.log("unable to insert item at row", i+1);
                    return console.log(err);
                }
            });
    }
    console.log("All items stored into database successfully");
})
// app.post('/', (req, res) => {

// })

app.listen(3001, ()=>{
    console.log("Server is running  on port 3001")
});