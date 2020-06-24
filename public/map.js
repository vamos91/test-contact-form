var myLatlng = new google.maps.LatLng(43.5283000,5.4497300
);

var myOptions = {
  zoom: 10,
  center: myLatlng,
  scrollwheel: false,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
};

var map = new google.maps.Map(document.getElementById('map'), myOptions);
var marker = new google.maps.Marker({
  position: myLatlng,
  map: map,
  title:"You are here!"
});
marker.addListener('click', function() {
    infowindow.open(map,marker);
    video.close(map, marker);
});
  marker.addListener('rightclick', function() {
    infowindow.close(map,marker);
    video.open(map, marker);
});
