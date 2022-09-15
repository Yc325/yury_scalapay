const axios = require('axios'); //get axios will be used to get Req.
const { parseAsync } = require('json2csv'); //get json2csv will be used to convert JSON to CSV

/*
    The following function calls Scalapay API and display the response in a specific format
    Function accepts 2 parameters API URL and API Token
    If 2 parameters are correct then it return JSON data
*/
async function doGetRequest(ApiToken,apiURL) {

    try {
        //check if ApiToken has been set
        if (!ApiToken){
            throw new Error("API TOKEN HAS NOT BEEN SET");
        }
        //check if apiURL has been provided
        if (!apiURL){
            throw new Error("API URL HAS NOT BEEN PROVIDED");
        }

        //Send Get Request
        const response = await axios.get(
            apiURL, {
                responseType: "json",
                headers:
                    {
                        'Authorization': `Bearer ${ApiToken}`
                    }
            });


        return response.data;

    } catch (err){
        console.error(err);
    }

}
/*
    The following function calls doGetRequest function to get JSON data
    Then it converts JSON to (stdout) as CSV
*/

async function convertToCsv() {
    /*
    select columns to be displayed and
    rename configuration.minimumAmount.amount to minimumAmount and
    configuration.maximumAmount.amount to maximumAmount
    */
    const fields =
        [   'type',
            'product',
            {label:'minimumAmount',value:'configuration.minimumAmount.amount'},
            {label:'maximumAmount',value:'configuration.maximumAmount.amount'},
        ];

    //create ApiURL
    const apiURL = 'https://integration.api.scalapay.com/v3/configurations';
    //read token from .env
    const token = "qhtfs87hjnc12kkos";

    //Get JSON data from GET Request
    const results = await doGetRequest(token,apiURL);

    //convert json to csv
    try {
        parseAsync(results, {fields})
            .then(csv => {
                console.log(csv)
            })
            .catch(err => console.error(err));

    }catch (err){
        console.error(err);
    }


}
//export module to use it in index.js
module.exports = {convertToCsv};


