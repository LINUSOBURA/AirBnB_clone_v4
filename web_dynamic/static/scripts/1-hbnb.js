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
});
