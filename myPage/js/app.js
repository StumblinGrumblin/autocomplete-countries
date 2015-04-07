$(document).ready(function() {
  var csvData;
  $.ajax({
    url: "countries.csv",
    type: 'GET',
    dataType: 'text',
    success: function (data) {
      csvData = CSVToArray(data);
      $.each(csvData, function (index, item) {
        $('#res').append("<li><img src='images/flags/"
          + item[2]
          + "' alt='flag'/>"
          + "<span>"
          + item[1]
          + "</span><span>"
          + item[0]
          + "</span></li>"
          );
      })
    }
  });

  // Search field and res list handler
  $('#selectCountry').on("keyup", function (event) {
    var query = $(this).val()
    $("#res li").each(function () {
      if ($(this).find("span:eq(1)").text().search(new RegExp(query, "i")) != -1) {
        if (query) {
          $(this).addClass("show")
          if($(this).is($("#res li.show:first"))) {
            $('#res li.show').not(this).removeClass('select');
            $(this).addClass('select');
          }
        } else if (query.length === 0) {
          $(this).removeClass("show select")
        }
      } else {
        $(this).removeClass("show select")
      }
    })
  })

  // Submit Handler
  $('form').submit(function (event) {
    var select = $('.select').index();
    console.log(select);
    $('#selected ul').append("<li><img src='images/flags/"
          + csvData[select][3]
          + "' alt='flag'/>"
          + "<div><p><strong>"
          + csvData[select][1]
          + "</strong></p>"
          + csvData[select][0]
          + "</div></li>"
        );
    event.preventDefault();
    $(this).find("input[type=text]").val("");
    $(this).find("li").removeClass("show");
  })
})

// function csvJSON(csv){
//   var
//     headers = ["name", "abbr", "imgSM", "imgLG"],
//     clean = csv.replace(/['"]+/g, ''),
//     lines = clean.split("\n"),
//     result = [];
//   for(var i = 0; i < lines.length; i++){
//     var
//       currentline = lines[i].split(","),
//       obj = {};
//     for(var j = 0; j < headers.length; j++){
//       obj[headers[j]] = currentline[j];
//     }
//
//     result.push(obj);
//
//   }
//   return csvData = result; //JSON
//
// }

function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}
