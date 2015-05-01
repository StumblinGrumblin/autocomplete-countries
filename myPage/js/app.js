$(document).ready(function() {
  var csvData;
  var select = 0;

  var post = function post() {
      select = $('.select').index();
      $('#selected ul').append("<li><img src='./images/flags/"
            + csvData[select].ico_128
            + "' alt='flag'/>"
            + "<div><p><strong>"
            + csvData[select].abbr
            + "</strong></p>"
            + csvData[select].name
            + "</div></li>"
          );
      select = 0;
      $('form').find("input[type=text]").val("");
      $('form').find("li").removeClass("show");
  };

  var selector = function selector(pos) {
    $(pos).addClass('select');
    $(pos).siblings().removeClass('select');
  };

  // Populate results table from parsed CSV data
  $.get('./js/countries.json', function (data) {

    csvData = data;
    
    $.each(csvData, function (index, item) {
      $('#res').append("<li><img src='./images/flags/"
        + item.ico_32
        + "' alt='flag'/>"
        + "<span>"
        + item.abbr
        + "</span><span>"
        + item.name
        + "</span></li>"
        );
    })
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
    post();
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
