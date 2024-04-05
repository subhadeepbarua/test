const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5001;
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());


const unitNoRoute = require('./routes/fetchUnits')
const designNoRoute = require('./routes/fetchDesignNo')
const fetchAccounitgRoute = require('./routes/fetchAccounting')
const fetchProducPanelRoute = require('./routes/fetchProductPanel')
const fetchMaterialRoute = require('./routes/fetchMaterial')
const fetchJobworkRoute = require('./routes/fetchJobwork')
const fetchJobberDetRoute = require('./routes/fetchJobberDet')
const allDataRoute = require('./routes/fetchAll')
const storeInvoiceRoute = require('./routes/storeInvoice')
const addElementRoute = require('./routes/addElement')
const searchInvoiceRoute = require('./routes/searchInvoice')
const fetchHeaderRoute = require('./routes/fetchHeader')

app.use('/data/fetch_accounting',fetchAccounitgRoute)
app.use('/data/fetch_productpanel',fetchProducPanelRoute)
app.use('/data/fetch_material',fetchMaterialRoute)
app.use('/data/fetch_jobwork',fetchJobworkRoute)
app.use('/data/fetch_jobberdetails',fetchJobberDetRoute)
app.use('/data/unit_no',unitNoRoute)
app.use('/data/design_no',designNoRoute)
app.use('/data/all',allDataRoute)
app.use('/save/invoice',storeInvoiceRoute)
app.use('/save/element', addElementRoute)
app.use('/search/invoice', searchInvoiceRoute)
app.use('/data/header',fetchHeaderRoute)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });