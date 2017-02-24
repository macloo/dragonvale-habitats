$(document).ready(function() {

    buildHabitatTable();
    $('#habitatTable').DataTable({
      paging: false,
      searching: false
    });

    $('#dragons').hide();

    // habitats array comes from dragondata.json
    function buildHabitatTable() {
        for (var i = 0; i < habitats.length; i++) {
            var row = '';
            row += '<tr data-key="' + i + '">';
            row += '<td><a href="#">' + habitats[i].dname + '</a></td>';
            row += '<td>' + habitats[i].max_cash + '</td>';
            row += '<td>' + habitats[i].max_dragons + '</td>';
            row += '<td>' + habitats[i].level_avail + '</td>';
            row += '<td>' + habitats[i].dragon_types + '</td>';
            row += '</tr>';
            $('#habitatTable tbody').append(row);
        }
    }

    // listen for click on any row
    $('#habitatTable tbody tr').on('click', function(e){
      e.preventDefault();
      // jQuery data attribute in tr holds index of hab in JSON array
      var habIndex = $(this).data('key');
      var habObject = habitats[habIndex];
      // hide table, show form fields
      $('#selectHab').slideUp();
      $('#dragons').slideDown();
      // write data for selected hab into dt elements
      // ul li:nth-child(2)
      $('#dragons h2').text(habObject.dname);
      $('#dragons dl dd span').text(habObject.max_cash);
      $('#dragons dl dd:nth-child(4)').text(habObject.max_dragons);
      $('#dragons dl dd:nth-child(6)').text(habObject.level_avail);
      $('#dragons dl dd:nth-child(8)').text(habObject.dragon_types);
      populateForm(habObject.dragon_types);
    });

    // listen for click on link
    $('#backToTable').on('click', function(e){
      e.preventDefault();
      $('#selectHab').slideDown();
      // set inputs to empty value
      $("input").val("");
      // reset the levels menu
      $('#dragonForm fieldset div:nth-child(2) select').val("none");
      // reset two text values in HTML
      $('#total').text("");
      $('#timeToMax').text("");
      $('#dragons').hide();
    });

/*
form: id="dragonForm"
fieldset for each line, each dragon
div class="form-group" for each item
select: dragon names
select: levels
input-text: auto-fill the earnings
*/

function populateForm(choice) {
  if (choice != "Moon and Sun" && dragons != "All") {
    // types is the JSON array of dragons grouped by type
    for (var i = 0; i < types.length; i++) {
      if ( types[i].hasOwnProperty("type") && types[i].type == choice ) {
        // use that object to put dragons into the form
        var currentGroup = types[i];
        // make list alphabetical
        var list = currentGroup.dragons.sort();
        buildFormMenu(list);
        break;
      }
    }
  } else if (choice == "Moon and Sun") {
    alert("Moon and Sun");
  } else if (choice == "All") {
    alert("All");
  } else {
    alert("No dragon type was chosen.");
  }
}

function buildFormMenu(list) {
  $('#dragonForm fieldset div:first-child() select option').remove();
  var items = '';
  for (var i = 0; i < list.length; i++) {
    items += '<option value="' + list[i] + '">' + list[i] + '</option>';
  }
  $('#dragonForm fieldset div:first-child() select').append(items);
}

// listeners on the two select menus - in every fieldset
var selectDragon = $('#dragonForm fieldset div:first-child() select');
var selectLevel = $('#dragonForm fieldset div:nth-child(2) select');
$(selectDragon).on('change', function() {
  // alert( $(this).val() );
  // reset values in levels and earnings
  $(this).parent().next().find("select").val("none");
  $(this).parent().next().next().find("input").val(0);
});
$(selectLevel).on('change', function() {
  var currentLevel = $(this).val();
  // get value of the select element to the left of this one,
  // thus finding the dragon type
  var currentDragon = $(this).parent().prev().find("select").val();
  // find earnings for that dragon in the levels array
  for (var i = 0; i < levels.length; i++) {
    if ( levels[i].hasOwnProperty("Type") && levels[i].Type == currentDragon ) {
      var earns = levels[i][currentLevel];
      // write the earnings amount into the input element
      $(this).parent().next().find("input").val(earns);
      break;
    }
  }
  var totalEarnings = 0;
  // loop through all inputs on the page - only earnings are inputs
  // get total and write it into a span below the form
  $( "input" ).each(function() {
    totalEarnings += Number( $(this).val() );
  });
  totalEarnings = totalEarnings * 60;
  $('#total').text(totalEarnings);
  var timeToMax = 0;
  var max = Number( $('#dragons dl dd span').text() ) * 1000000.0;
  timeToMax = max / totalEarnings;
  $('#timeToMax').text( timeToMax );
});

}); // close document ready
