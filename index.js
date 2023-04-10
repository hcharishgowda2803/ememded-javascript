import express from "express";


const invoiceData = {
    slno:'1',
    description:'Tipplr service charge',
    hsn:'9963',
    quantity:'3',
    service_charge:'20',
    cgst:'50',
    sgst:'50',
    amount:'500'
}

const app = express();
const PORT = 3500





app.set('view engine', 'ejs');


app.get('/invoice',(req,res)=>{
  res.render('index',{data:invoiceData})
})




app.listen(PORT,()=>{
    console.log('port is listing',PORT)
})
