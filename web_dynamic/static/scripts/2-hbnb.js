$(document).ready(function () {
  let amenityNames = [];
  $("input[type='checkbox']").change(function () {
    let amenityName = $(this).data("name");
    if ($(this).is(":checked")) {
      if (amenityNames.indexOf(amenityName) === -1) {
        amenityNames.push(amenityName);
      }
    } else {
      let index = amenityNames.indexOf(amenityName);
      if (index !== -1) {
        amenityNames.splice(index, 1);
      }
    }
    console.log(amenityNames);
    $(".amenities h4").text(amenityNames.join(", "));
  });

  $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });
});
