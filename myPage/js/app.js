$(document).ready(function() {
  var csvData;
  var select = 0;

  var selection = function selection(index) {
    $('#selected ul').append("<li><img src='images/flags/"
          + csvData[index][3]
          + "' alt='flag'/>"
          + "<div><p><strong>"
          + csvData[index][1]
          + "</strong></p>"
          + csvData[index][0]
          + "</div></li>"
        );
  };

  var post = function post(item) {
      select = (item || $('.select').index());
      console.log(select);
      selection(select);
      select = 0;
      $('form').find("input[type=text]").val("");
      $('form').find("li").removeClass("show");
  };
  
  var selector = function selector(pos) {
    $(pos).addClass('select');
    $(pos).siblings().removeClass('select');
  };

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
    var query = $(this).val();
    $("#res li").each(function () {
      if ($(this).find("span:eq(1)").text().search(new RegExp("^" + query, "i")) != -1) {
        if (query) {
          $(this).addClass("show")
        } else if (query.length === 0) {
          $(this).removeClass("show select")
        }
      } else {
        $(this).removeClass("show select")
      }

      //Initialize select bar at index zero of shown objects
      var initSelect = $('#res').find($("li.show:eq(" + select + ")"));
      selector(initSelect);

      // Mouse highlight
      $('#res > li.show').mouseenter(function () {
        var mousePos = $('#res li:eq(' + $(this).index() +')');
        selector(mousePos);

      });

    })

  })

  // Submit Handler
  $('form').submit(function (event) {
    post();
    event.preventDefault();
  });


  //Click Handler
  $('body').on('click', '#res li', function () {
    select = ($(this).index());
    post(select);
  });

  // Arrow Handler
  $('body').on('keydown', function () {
    if (event.keyCode == 40) {
      select += 1;
    } else if (event.keyCode == 38) {
      select -= 1;
    }
  })
})
