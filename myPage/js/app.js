var csvData;
$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "countries.csv",
    dataType: "text",
    success: function (result) {
      processCSV(result);
      $.each(csvData, function (i, name) {
        console.log("Index #:" + i + ": " + name[1]);
        $('#selected ul').append("<li><img src='images/flags/"
          + name[3]
          + "' alt='flag'/>"
          + "<span><strong>"
          + name[1]
          + "</strong></span></br>"
          + name[0]
          + "</li>"
          );
      });
    }

  });
  $('form').submit(function (event) {
    console.log("Handler for .submit() called.");
    event.preventDefault();
    $(this).find("input[type=text]").val("");
  });
})

function processCSV(text) {
    var
      allTextLines = text.split(/\r\n|\n/),
      columns = 4,
      lines = [];

    for (var i=0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == columns) {

            var tarr = [];
            for (var j=0; j < columns; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    csvData = lines;
}
