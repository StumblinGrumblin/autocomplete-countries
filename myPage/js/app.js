var csvData;
var results;
function findCountry(cName) {
  return $.grep(csvData, function (n, i) {
    return n.name == cName;
  });
};
$(document).ready(function() {
  var people = ['Peter Bishop', 'Nicholas Brody', 'Gregory House', 'Hank Lawson', 'Tyrion Lannister', 'Nucky Thompson'];
  var cache = {};
  var drew = false;

  $.get('countries.csv', function (data) {
    csvJSON(data);
  });

  $('#selectCountry').on("keyup", function (event) {
    var query = $("#selectCountry").val()
    if ($('#selectCountry').val().length > 0) {

      if (query in cache) {
        results = cache[query];
      } else {
        results = $.grep(csvData, function (item) {
          return item.name == RegExp(query, "i");
        });
        cache[query] = results;
      }

      if (drew == false) {
        $('#selectCountry').after('<ul id="res"></ul>');
        drew = true;

        $("#res").on("click", "li", function () {
          $("#selectCountry").val($(this).text());
          $("#res").empty();
        });
      } else {
        $("#res").empty();
      }
      for (name in results) {
        $("#res").append("<li>" + results[name].name + "</li>" );
      }
    } else if (drew) {
      $("#res").empty();
    }

  });
  $('form').submit(function (event) {
    console.log("Handler for .submit() called.");
    $('#selected ul').append("<li><img src='images/flags/"
      + csvData[0].imgLG
      + "' alt='flag'/>"
      + "<div><p><strong>"
      + csvData[0].abbr
      + "</strong></p>"
      + csvData[0].name
      + "</div></li>"
      );
    event.preventDefault();
    $(this).find("input[type=text]").val("");
  });



})

function csvJSON(csv){
  var
    headers = ["name", "abbr", "imgSM", "imgLG"],
    lines = csv.split("\n"),
    result = [];
  for(var i = 0; i < lines.length; i++){
    var
      currentline = lines[i].split(","),
      key = currentline[0].toString(),
      obj = {},
      obj2 = {};
    for(var j = 0; j < headers.length; j++){
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);

  }
  //return result; //JavaScript object
  return csvData = result; //JSON

}
