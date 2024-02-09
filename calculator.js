const express = require('express');
const ExpressError = require('./expressError');
const fs = require('fs');
const {checkValidInput, getMeanValue, getMedianValue, getModeValue} = require('./helper')
const app = express()

app.use(express.json());



app.get('/mean', (req,res, next)=>{
    try{
        if (Object.keys(req.query).length ===0)
        {      
            throw new ExpressError('Empty input is bad request', 400);
        }
        let data = req.query.nums.split(',');
        let values = checkValidInput(data);
        if (values instanceof Error){
            throw new ExpressError(values.message, 400);
        } 
        let avg = getMeanValue(values);
        let result ={
            operation: 'mean',
            value: avg
        }      
        // Check for the 'save' query parameter and if it's set to 'true'
        if (req.query.save && req.query.save === 'true') {
            // Convert the result object to a string
            const resultString = JSON.stringify(result);
            // Write the result to 'results.json' file
            fs.writeFile('results.json', resultString, (err) => {
                if (err) {
                    throw new ExpressError('Error writing file', 500);
                }
                // If save operation is successful, send back the result
                return res.send(result);
            });
        } else {
            // If 'save' is not true, just return the result
            return res.send(result);
        }
    }
    catch (e){
        next(e);
    }
})

app.get('/median', (req,res, next)=>{
    try{
        if (Object.keys(req.query).length ===0)
        {      
            throw new ExpressError('Empty input is bad request', 400);
        }
        let data = req.query.nums.split(',');
        let values = checkValidInput(data);
        if (values instanceof Error){
            throw new ExpressError(values.message, 400);
        } 
        let median = getMedianValue(values);
        let result ={
            operation: 'median',
            value: median
        } 
        // Check for the 'save' query parameter and if it's set to 'true'
        if (req.query.save && req.query.save === 'true') {
            // Convert the result object to a string
            const resultString = JSON.stringify(result);
            // Write the result to 'results.json' file
            fs.writeFile('results.json', resultString, (err) => {
                if (err) {
                    throw new ExpressError('Error writing file', 500);
                }
                // If save operation is successful, send back the result
                return res.send(result);
            });
        } else {
            // If 'save' is not true, just return the result
            return res.send(result);
        }
    }
    catch (e){
        next(e);
    }
})

app.get('/mode', (req,res,next)=>{
    try{
        
        if (Object.keys(req.query).length ===0)
        {      
            throw new ExpressError('Empty input is bad request', 400);
        }
        let data = req.query.nums.split(',');
        let values = checkValidInput(data);
        if (values instanceof Error){
            throw new ExpressError(values.message, 400);
        } 
        let mode = getModeValue(values);
        let result ={
            operation: 'mode',
            value: mode
        } 
        // Check for the 'save' query parameter and if it's set to 'true'
        if (req.query.save && req.query.save === 'true') {
            // Convert the result object to a string
            const resultString = JSON.stringify(result);
            // Write the result to 'results.json' file
            fs.writeFile('results.json', resultString, (err) => {
                if (err) {
                    throw new ExpressError('Error writing file', 500);
                }
                // If save operation is successful, send back the result
                return res.send(result);
            });
        } else {
            // If 'save' is not true, just return the result
            return res.send(result);
        }
    }
    catch (e){
        next(e);
    }
})

app.get('/all', (req,res,next)=>{
    try{
        
        if (Object.keys(req.query).length ===0)
        {      
            throw new ExpressError('Empty input is bad request', 400);
        }
        let data = req.query.nums.split(',');
        let values = checkValidInput(data);
        if (values instanceof Error){
            throw new ExpressError(values.message, 400);
        } 
        let mean = getMeanValue(values);
        let median = getMedianValue(values);
        let mode = getModeValue(values);

        let result ={
            operation: "all",
            mean: mean,
            median: median,
            mode: mode
        } 
        // Check for the 'save' query parameter and if it's set to 'true'
        if (req.query.save && req.query.save === 'true') {
            // Convert the result object to a string
            const resultString = JSON.stringify(result);
            // Write the result to 'results.json' file
            fs.writeFile('results.json', resultString, (err) => {
                if (err) {
                    throw new ExpressError('Error writing file', 500);
                }
                // If save operation is successful, send back the result
                return res.send(result);
            });
        } else {
            // If 'save' is not true, just return the result
            return res.send(result);
        }
    }
    catch (e){
        next(e);
    }
})

app.use((req, res, next)=>{
    const e = new ExpressError("Page Not Found", 404)
    next(e);
  })
  

app.use(function (err, req, res, next) {
    let status = err.status || 500;
    let message = err.msg;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
  });
  


app.listen(3000,()=>{
    console.log("Server running on port 3000")
})