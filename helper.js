



function checkValidInput(data_query){
    let result = [];

    for(let i=0;i<data_query.length;i++){
        let value = Number(data_query[i]);

        if (Number.isNaN(value)){
            return new Error(`The value ${data_query[i]} is not valid number`)
        }
        result.push(value);
    }
    return result;
}

function getMeanValue(data){
    let sum=0
    for(value of data){
        sum +=value
    }
    return Math.floor(sum/data.length);
}

function getMedianValue(data){
    return data[Math.floor(data.length/2)];
}

function getModeValue(data){
    let dict={}
    for (key of data){
        dict[key] = dict[key] ? dict[key]+1:1;
    }
    let max = 0;
    for (const item of data){
        if (max<dict[item]) max=item;
    }
    return max
}

module.exports = {checkValidInput,getMeanValue,getMedianValue, getModeValue}