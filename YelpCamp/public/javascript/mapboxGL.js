mapboxgl.accessToken = mapboxToken;

const campgroundLocation = campground.geometry.coordinates;

const map = new mapboxgl.Map({
    container: "mapbox-geolocation", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: campgroundLocation, // starting position [lng, lat]
    zoom: 9, // starting zoom
});

const centeredMarker = new mapboxgl.Marker()
    .setLngLat(campgroundLocation)
    .addTo(map);
