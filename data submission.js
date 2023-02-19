const difference = 0.25;

function processFile(){
    var file = document.querySelector('#myFile').files[0];
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function(event){
      var csv = event.target.result; const datas = [];
      var rows = csv.split('\n');
      for (var i = 1; i < rows.length; i++) {var cols = rows[i].split(','); datas.push(cols);}
      const odata = [];
      for(var col_start = 1; col_start < datas[0].length; col_start++)
      {
        var cols = [];
        for (var row_track = 0; row_track < datas.length; row_track++) {var temp = parseFloat(datas[row_track][col_start].replace(/(\r\n|\n|\r)/gm, "")); cols.push(temp);}
        odata.push(cols);
      }
      console.log("ODATA");
      console.log(odata);

      const times = []

      for (var col = 0; col < odata[0].length; col++)
      {
        var apnea = false
        for(var row = 1; row < odata.length; row++)
        {
          if(Math.abs(odata[row][col] - odata[row-1][col])/(odata[row][col]) >= difference)  { console.log(row, col, odata[row][col]);  apnea = true; }
        }
        let temp2 = " "+ col.toString();
        if(apnea){times.push(temp2);}

      }

      console.log(times);

      let text = "An apnea episode may have occured at the following time periods: " + times.toString();
      
      document.querySelector("#resultstoprint").innerText=text;

    }    


  }
