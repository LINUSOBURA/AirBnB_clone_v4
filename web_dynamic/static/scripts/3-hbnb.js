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

  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({}),
    success: function (places) {
      console.log(places);
      $.each(places, function (i, place) {
        $(".places").append(`
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest}</div>
              <div class="number_rooms">${place.number_rooms}</div>
              <div class="number_bathrooms">${place.number_bathrooms}</div>
            </div>
            <div class="user">
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>
        `);
      });
    },
    error: function (xhr, status, error) {
      console.error(xhr, status, error);
    },
  });
});
