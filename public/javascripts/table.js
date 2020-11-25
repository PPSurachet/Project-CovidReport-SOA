$(function () {
    $("#CountryTable").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#showData tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('#myTable').DataTable();
})