var dataSet = [
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  [ "", "", "", "", "", "" ],
  
];
//some function to convert this dummy data to relevant data
//start convert teacher or student
for(i=0;i<dataSet.length;i++){
  let random = Math.floor((Math.random() * 10) + 1);
    if(random<=5){
      dataSet[i][1]='Student';
    }
    else{
      dataSet[i][1]='IT professional';
    }
    //start convert city of person
}
  var cities = ['Jaipur', 'Mumbai', 'Delhi', 'Goa', 'Bhopal','Assam'];   
  for(i=0;i<dataSet.length;i++){
    let random = Math.floor((Math.random() * 6) + 1);
    dataSet[i][3]=cities[random-1];
  }

  //Change college name
  var college = ['aaa', 'bbb', 'ccc', 'ddd', 'eee','ffff'];   
  for(i=0;i<dataSet.length;i++){
    let random = Math.floor((Math.random() * 6) + 1);
    dataSet[i][2]=college[random-1];
  }

  //change join date
  for(i=0;i<dataSet.length;i++){
    dataSet[i][4]= Math.floor((Math.random() * 31) + 1);
  }
  //marks in percent
  for(i=0;i<dataSet.length;i++){
    dataSet[i][5]= Math.floor((Math.random() * 100) + 1);
}

  for(i=0;i<dataSet.length;i++){
      
      let r = Math.random().toString(36).substring(3);
      dataSet[i][0]= r;
      
   
  }
//end conversion of dummy data
 //end conversion of dummy data



/* Custom filtering function which will search data in column four between two values */
/* Custom filtering function which will search data in column four between two values */
$.fn.dataTable.ext.search.push(
  function( settings, data, dataIndex ) {
      var min = parseInt( $('#min').val(), 10 );
      var max = parseInt( $('#max').val(), 10 );
      var age = parseFloat( data[5] ) || 0; // use data for the age column

      if ( ( isNaN( min ) && isNaN( max ) ) ||
           ( isNaN( min ) && age <= max ) ||
           ( min <= age   && isNaN( max ) ) ||
           ( min <= age   && age <= max ) )
      {
          return true;
      }
      return false;
  }
);


$(document).ready(function() {
                                
  $('#example').DataTable( {
      //"scrollY":        "100vh",
      //"scrollCollapse": true,
      //"paging":         false,
      //ajax sourced data
      //"ajax": '../ajax/data/arrays.txt' instead of data as i
      //"scrollX": true, responsive 
      data: dataSet,
      columns: [
          { title: "Name" },
          { title: "User type" },
          { title: "college" },
          { title: "City" },
          { title: "Start date" },
          { title: "Percent Scored" }
      ],
  } );
  //Draw the new table
  var table = $('#example').DataTable();
  $('#min, #max').keyup( function() {
    table.draw();                  
  } ); 

  //send email function
  //traverse your db or JSON object converted to array with the parameter forn the #min #max input field and take email address of the students to whom email has to be sent 
   

} );




