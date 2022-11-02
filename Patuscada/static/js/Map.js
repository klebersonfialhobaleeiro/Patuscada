export class Map {
    map;
    htmlElement = document.getElementById("map");
    center = { lat: -14.681679156669901, lng: -42.503505778365486 };
    zoom = 8;
    markers;
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({ draggable: false});

    durationRoute;
    distanceRoute;

    constructor(props) {
        if (props.zoom) this.zoom = props.zoom;
        if (props.center) this.center = props.center;
        if (props.htmlElement) this.htmlElement = props.element;
        

        this.map = new google.maps.Map( this.htmlElement, {
            zoom: this.zoom,
            center: new google.maps.LatLng(this.center.lat, this.center.lng),
            disableDefaultUI: true

        }); 
      
        if (props.markers ) { 
            this.markers = props.markers.map((position) => {
                return this.createMarker(position)
            }); 
        }
        
    }

    createMarker(position) {
        try {
            return new google.maps.Marker({
                position: position,
                map: this.map,
            })
        } catch (error) {
            console.log(error)
        }
    }

    changeMarkerPosition(newPosition) {
        if (this.markers.length < 2) {
            this.markers.push( this.createMarker(newPosition) )
            return
        }
        let last = this.markers.length - 1;
        this.markers[last].setPosition(newPosition)

    }

    async createRoute(origin, destination, selectedMode = 'DRIVING') {
        
        origin = `${origin.lat}, ${origin.lng}`
        destination = `${destination.lat},${destination.lng}`
        
        this.directionsRenderer.setMap(this.map)

        let response = await this.directionsService.route({
            origin: origin ,
            destination: destination,
            travelMode : google.maps.TravelMode[selectedMode]
        })
        
        this.getDistanceAndDurationOfRoute(response)

        this.directionsRenderer.setDirections(response)

        return response;
    }

    getDistanceAndDurationOfRoute(response) {
        this.distanceRoute =  response['routes'][0]['legs'][0]['distance']['text']
        this.durationRoute =  response['routes'][0]['legs'][0]['duration']['text']
    }


}
