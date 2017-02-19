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
    });

    // listen for click on link
    $('#backToTable').on('click', function(e){
      e.preventDefault();
      $('#selectHab').slideDown();
      $('#dragons').hide();
    });


}); // close document ready
