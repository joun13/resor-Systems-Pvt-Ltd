const csv = require("csv-parser");
const fs = require("fs");
const moment = require("moment");

exports.csv = (req, res) => {
  const results = [];
  fs.createReadStream("Data.csv")
    .pipe(csv())
    .on("data", (data) => {
      console.log(data);
      if (data.Type) {
        data["?Index"] = undefined;
        console.log(data);
        results.push(data);
      }
    })
    .on("end", () => {
      if (!results.length) {
        return res.status(500).json({
          error: "CSV file did not parsed",
        });
      }
      // var result = [];
      // var final = [];
      // var arr = [];
      // var arr1 = [];
      // for (var i = 0; i < results.length; i++) {
      //   arr.push(results[i].Type);
      //   arr1.push(moment(results[i].Date, "DD MM YY").format("MM"));
      // }
      // // console.log(arr);
      // // console.log(arr1);

      // var unique = arr.filter((item, i, ar) => ar.indexOf(item) === i);

      // //console.log("unique array is   "+unique);

      // function getAllIndexes(arr, val) {
      //   var indexes = [],
      //     i = -1;
      //   while ((i = arr.indexOf(val, i + 1)) != -1) {
      //     indexes.push(i);
      //   }
      //   return indexes;
      // }

      // for (i = 0; i < 4; i++) {
      //   var index = arr.indexOf(unique[i]);

      //   var indexes = getAllIndexes(arr, arr[index]);
      //   var indexes2 = getAllIndexes(arr1, arr1[index]);

      //   var sum = 0;

      //   for (var j = 0; j < indexes.length; j++) {
      //     if (indexes2.includes(indexes[j])) {
      //       sum += results[indexes[j]].Number;
      //     }
      //   }
      //   final.push({ Type: arr[index], Number: sum, Date: arr1[index] });
      //   //console.log()
      // }

      var final = [];
      function index(obj) {
        var inx;
        final.find((d) => {
          if (
            d.Type == obj.Type &&
            moment(d.Date, "DD MM YY").format("MM") ==
              moment(obj.Date, "DD MM YY").format("MM")
          ) {
            inx = final.indexOf(d);
          }
        });
        return inx;
      }

      for (var i = 0; i < results.length; i++) {
        for (var j = 1; j < results.length - 1; j++) {
          if (
            results[i].Type == results[j].Type &&
            moment(results[i].Date, "DD MM YY").format("MM") ==
              moment(results[j].Date, "DD MM YY").format("MM")
          ) {
            if (index(results[j])) {
              var finalIndex = index(results[j]);
              final[finalIndex].Number =
                parseInt(final[finalIndex].Number) +
                parseInt(results[i].Number);
              break;
            } else {
              final.push({
                Type: results[j].Type,
                Number: results[j].Number,
                Date: moment(results[j].Date, "DD MM YY").format("MMM"),
              });
            }
          }
        }
      }
      return res.json(final);
    });
};

// var data = [{
//   type:'A',
//   number:20,
//   date:"1/2/20"
// },{
//   type:'A',
//   number:20,
//   date:"1/2/20"
// },{
//   type:'B',
//   number:20,
//   date:"1/3/20"
// },{
//   type:'B',
//   number:20,
//   date:"1/2/20"
// },{
//   type:'B',
//   number:20,
//   date:"1/2/20"
// },{
//   type:'B',
//   number:20,
//   date:"1/2/20"
// },{
//   type:'C',
//   number:20,
//   date:"1/4/20"
// },{
//   type:'D',
//   number:20,
//   date:"1/5/20"
// },{
//   type:'D',
//   number:20,
//   date:"1/5/20"
// }]
// var result = [];
//   var arr = [];
//   var arr1 = []
// for(var i=0;i<data.length;i++){

//  arr.push(data[i].type)
//   arr1.push(data[i].date)

// }
//  //console.log(arr);
// // console.log(arr1);

// var unique = arr.filter((item, i, ar) => ar.indexOf(item) === i);
// var unique2 = arr1.filter((item, i, ar) => ar.indexOf(item) === i);

// //console.log("unique array is   "+unique);
// //console.log("unique array is   "+unique2);

// function getAllIndexes(arr, val) {
//     var indexes = [], i = -1;
//     while ((i = arr.indexOf(val, i+1)) != -1){
//         indexes.push(i);
//     }
//     return indexes;
// }

// for(i=0;i<4;i++){
//   var index = arr.indexOf(unique[i]);
//   var index2 = arr.indexOf(unique2[i]);

//   var indexes = getAllIndexes(arr, arr[index]);
// var indexes2 = getAllIndexes(arr1, arr1[index2]);
//   //console.log(indexes,indexes2)

// var sum = 0;

// for(var j=0;j<indexes.length;j++){

//       if(indexes2.includes(indexes[j])){
//     sum += data[indexes[j]].number;
//   }
// }

// console.log({type:arr[index],number:sum,date:arr1[index]})

// }

// console.log(result)
