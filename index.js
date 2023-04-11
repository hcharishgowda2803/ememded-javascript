import express from "express";
import pdf from "html-pdf"
import ejs from "ejs"


const templateHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Invoice</title>
    <style>
        .company-info {
            float: left;
            width: 50%;
        }

        .signature-info {
            float: left;
            width: 50%;
            margin-top: 10px;
        }

        .merchant-info {
            margin-top: 20px;
            float: none;
            width: 50%;
        }

        .invoice-info {
            float: right;
            width: 50%;
            text-align: right;
            margin-top: 50px;
        }

        .invoice-date {
            float: right;
            width: 50%;
            text-align: right;
            margin-top: -120px;
        }

        .text-center {
            text-align: center;
        }

        .text-capitalize{
           text-transform: capitalize;
        }


        .logo {
            display: inline-block;
            width: 150px;
            height: 50px;
            margin-top: 20px;
        }

        .bold {
            font-weight: bold;
        }

        body {
            padding: 50px; /* Add 50px padding to both the left and right sides */
        }

        .note {
            margin-top: 100px
        }
       thead{
           background-color: gray;
       }

    </style>
</head>
<body>
<div class="company-info">
    <img src="https://res.cloudinary.com/tipplr/image/upload/v1681129415/tipplr-logo_tdsrfx.png" alt="Company Logo" class="logo">
    <h3>Food Space Technology pvt ltd</h3>
    <p>#12 Crescent Cunningham Road<br>
        Bangalore,Karnataka 56001<br>
        GSTIN:29AAECF1747N1Z6<br>
    </p>
</div>
<div class="invoice-info">
    <h1 class="bold">Tax Invoice</h1>
    <h4><span>#INV-</span>002298</h4>
</div>
<div class="merchant-info">
    <div style="font-weight: 500">Bill To Partner</div>
    <div style="font-weight: 700;font-size: medium;padding-top: 5px"><%= data.partnerDetails.name %></div>
    <div style="font-weight: 500"><%= data.partnerDetails.address%></div>
    <div style="font-weight: 500">GSTIN:<%= data.partnerDetails.gst_number%></div>
</div>
<div class="invoice-date">
     <h4><span>Invoice Date :</span><%= data.partnerDetails.date %></h4>
    <h4><span>Weekly Payment :</span>Due on Receipt</h4>
</div>

<div class="merchant-info">
    <h4><span>Place of Supply:</span>Karnataka(29)</h4>
</div>
<div class="merchant-info">
    <h5><span>Subject:</span>Tax invoice</h5>
</div>
<div>
    <table class="table table-bordered" style="border-collapse: collapse; width: 100%;">
        <thead>
        <tr>
            <% Object.keys(data.invoiceData[0]).forEach(function(key) { %>
                <th class="text-center text-capitalize" scope="col"><%= key %></th>
            <% }); %>
        </tr>
        </thead>
        <tbody>
        <% data.invoiceData.forEach(function(item) { %>
            <tr class="text-center" style="border-bottom: 1px solid black">
                <% Object.values(item).forEach(function(value) { %>
                    <td><%= value %></td>
                <% }); %>
            </tr>
        <% }); %>
        <tr>
            <td></td>
        </tr>
        <tr>
            <td></td>
        </tr>
        <% for (var key in data.charges) { %>
            <tr style="padding-top: 15px">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2" class="text-center text-capitalize"><strong><%= data.charges[key].header %></strong></td>
                <td class="text-center"><%= data.charges[key].value %></td>
            </tr>
        <% } %>
        </tbody>
    </table>
</div>
<div class="note">
    <div>Notes</div>
    <div>Please check the attached appendix for more payment details,Thanks for your business</div>
</div>
<div class="signature-info">
    <img style="width: 100px;height: 100px" src="https://res.cloudinary.com/tipplr/image/upload/v1681129421/tipplrsignature_koesgp.png" alt="Signature Logo" class="logo">
</div>
</body>
</html>
`


const actualData = {
    invoiceData : [{
        slno: '1',
        description: 'Tipplr service charge',
        hsn: '9963',
        quantity: '3',
        service_charge: '20',
        cgst: '50',
        sgst: '50',
        amount: '600',
        subtotal: '500',
    }],
    charges:[
        {
            key_name: 'cgst',
            value: '50',
            header: 'CGST',
            id:2
        },
        {
          key_name: 'sgst',
          value: '50',
          header: 'Sgst',
            id:3
        },
        {
            key_name: 'amount',
            value: '600',
            header: 'Total',
            id:4

        },
        {
            key_name: 'sub_total',
            value: '500',
            header: 'Sub Total',
            id:1
        },
        {
            key_name: 'amount_in_words',
            value: 'Six Hundred Only',
            header: 'Amount In Words',
            id:5
        },
    ],
    partnerDetails:{
        name:'Purple Suites',
        address:'#374 7th block koramangala Bangalore,Karnataka 56001',
        gst_number:'29AAECF1747N1ZU',
        date:'12/02/2022'
    }
}


const app = express();
const PORT = 3500



app.set('view engine', 'ejs');


app.get('/invoice', (req, res) => {
    const templateurl = ejs.render(templateHtml,{data:actualData});
    // res.send(templateurl)
    pdf.create(templateurl, {}).toFile('invoice.pdf', function(err) {
        if (err) {
            console.error(err);
            res.send('Failed to generate PDF');
        } else {
            console.log('File saved successfully');
            res.send('File saved successfully');
        }
    });
})


app.listen(PORT, () => {
    console.log('port is listing', PORT)
})
