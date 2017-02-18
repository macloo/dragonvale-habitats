$(document).ready(function() {


    buildHabitatTable();
    $('#habitatTable').DataTable({
      paging: false,
      searching: false
    });

    // habitats array comes from dragondata.json
    function buildHabitatTable() {
        for (var i = 0; i < habitats.length; i++) {
            var row = '';
            row += '<tr id="' + habitats[i].dname + '">';
            row += '<td>' + habitats[i].dname + '</td>';
            row += '<td>' + habitats[i].max_cash + '</td>';
            row += '<td>' + habitats[i].max_dragons + '</td>';
            row += '<td>' + habitats[i].level_avail + '</td>';
            row += '<td>' + habitats[i].dragon_types + '</td>';
            row += '</tr>';
            $('#habitatTable tbody').append(row);
        }
    }

}); // close document ready
