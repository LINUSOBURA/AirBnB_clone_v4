$(document).ready(function () {
  let amenityNames = [];
  let amenityIds = [];
  const amenities = {};
  newPlaces = [];
  $("input[type='checkbox']").change(function () {
    let amenityName = $(this).data("name");
    let amenityId = $(this).data("id");
    if ($(this).is(":checked")) {
      if (amenityNames.indexOf(amenityName) === -1) {
        amenityNames.push(amenityName);
        amenityIds.push(amenityId);
      }
    } else {
      let index = amenityNames.indexOf(amenityName);
      if (index !== -1) {
        amenityNames.splice(index, 1);
        amenityIds.splice(index, 1);
      }
    }
    /*console.log(amenityNames);*/
    /*console.log(amenityIds);*/
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
              <div class="price_by_night">$${place.price_by_night}</div>
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

  $(".filters button").click(function () {
    $(".places").fadeOut(300);
    let newPlace = [];
    newPlaces.length = 0;
    $.ajax({
      url: "http://0.0.0.0:5001/api/v1/places_search/",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({}),
      success: function (newPlacesData) {
        $.each(newPlacesData, function (i, newPlaceData) {
          let amenities_count = 0;
          $.get(
            "http://0.0.0.0:5001/api/v1/places/" +
              newPlaceData.id +
              "/amenities",
            function (place_amenities) {
              for (let j = 0; j < amenityIds.length; j++) {
                if (
                  place_amenities.find(
                    (amenity) => amenity.id === amenityIds[j]
                  )
                ) {
                  amenities_count += 1;
                }
              }
              if (amenities_count === amenityIds.length) {
                newPlaces.push(newPlaceData);
              }
              if (i === newPlacesData.length - 1) {
                $(".places").empty();
                $.each(newPlaces, function (j, newPlace) {
                  $(".places").append(`
                                    <article>
                                        <div class="title_box">
                                            <h2>${newPlace.name}</h2>
                                            <div class="price_by_night">$${newPlace.price_by_night}</div>
                                        </div>
                                        <div class="information">
                                            <div class="max_guest">${newPlace.max_guest}</div>
                                            <div class="number_rooms">${newPlace.number_rooms}</div>
                                            <div class="number_bathrooms">${newPlace.number_bathrooms}</div>
                                        </div>
                                        <div class="user">
                                        </div>
                                        <div class="description">
                                            ${newPlace.description}
                                        </div>
                                    </article>
                                `);
                });
                $(".places").fadeIn(300);
              }
            }
          );
        });
      },
      error: function (xhr, status, error) {
        console.error(xhr, status, error);
      },
    });
  });
});
