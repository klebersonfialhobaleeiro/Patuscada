import { Map } from './Map.js';

function initMap() {
    const lic = { lat: -14.681679156669901, lng: -42.503505778365486 };

    const map = new Map({
        zoom: 10,
        center: lic,
        markers: [lic],
        element: document.getElementById("map")
    })

    const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),
        {
            componentRestrictions: { country: "br" },
            fields: ["address_components", "geometry"]
        }
    )

    autocomplete.addListener('place_changed', (e) => {
        let local = autocomplete.getPlace();

        removeActive();
        let position = { lat: local.geometry.location.lat(), lng: local.geometry.location.lng() }

        map.changeMarkerPosition(position);
        map.createRoute(lic, position)
            .then(() => setRouteInformations(map.distanceRoute, map.durationRoute))
    });

    const cidades = document.getElementsByClassName('cidade');
    document.querySelectorAll('.cidade')
        .forEach((el) => el.addEventListener("click", function (e) {

            removeActive();
            document.getElementById("autocomplete").value = ""

            this.classList.add("active");
            let position = getPosition(this.value);

            map.changeMarkerPosition(position);
            map.createRoute(lic, position)
                .then(() => setRouteInformations(map.distanceRoute, map.durationRoute))
        })
        );

}
window.initMap = initMap;

function removeActive(){
    var elems = document.querySelectorAll(".active");
    [].forEach.call(elems, function (el) {
        el.classList.remove("active");
    });
}

function getPosition(value) {
    value = value.split(",")
    for (let i = 0; i < value.length; i++) {
        value[i] = Number(value[i])
    }
    return { lat: value[0], lng: value[1] }
}

function setRouteInformations(distance, duration) {
    let distanceElement = document.getElementById('distanceRouteMap');
    let durationElement = document.getElementById('durationRouteMap');

    distanceElement.innerText = `${distance}`;
    durationElement.innerText = `${duration}`;
}

/* FIM DO MAPS */