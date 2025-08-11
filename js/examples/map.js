!function(e,t){

/*
// ToDo:
// - delete numbers from srcolls
// - check map animation and zoom
*/

/*
//
// checkin fields:
//
// name
// lon
// lat
// region
// desc
// type
// img
//
*/

var ICONS = {
  checkin_group_function: function(cluster) {
    return L.divIcon({
      className: 'group-icon',
      html: cluster.getChildCount(),
      iconSize: null});
  },
  main_type: new L.divIcon({className: 'church-icon church_live-icon', iconSize: null}),
  church_keepers: new L.divIcon({className: 'church-icon church_keepers-icon', iconSize: null}),
  church_save: new L.divIcon({className: 'church-icon church_save-icon', iconSize: null}),
};


class Map {
  startZoom = 4;
  checkinZoom = 6;
  clusterZoom = 6;
  slideButton;

  config = {
    minZoom: 4,
    maxZoom: 20,
    zoomControl: false,
    attributionControl: false,
  };

  clusterConfig = {
    showCoverageOnHover: false,
    maxClusterRadius: 25,
    zoomToBoundsOnClick: false,
    disableClusteringAtZoom: this.clusterZoom,
    iconCreateFunction: ICONS['checkin_group_function'],
  }

  constructor(checkinArray) {
    this.checkins = checkinArray;
    this.sidebar = new Sidebar(checkinArray);
    this.slideButton = document.querySelector(".next-button");

    let map = L.map('map', this.config);
    var yandexLayer = new L.yandex();
    map.addLayer(yandexLayer);
    L.control.zoom({
       position:'topright'
    }).addTo(map);
    this.map = map;

    this._initMarkers();
    this._initHandlers();

    this.markerClick(this._markers[0], this.startZoom);
  }

  deactivateIcon() {
    var activeIcon = document.querySelector(".active-icon");
    if (activeIcon) {
      activeIcon.classList.remove("active-icon");
    }
  }

  slideSidebar() {
    this.sidebar.hide();
    this.deactivateIcon();
  }

  markerClick(marker, zoom = this.checkinZoom) {
    let newZoom = Math.max(zoom, this.map.getZoom());
    if(!this.map.hasLayer(marker)) {
      newZoom = this.clusterZoom;
    }
    this.map.setView(marker.getLatLng(), newZoom);
    this.deactivateIcon();
    marker._icon.classList.add('active-icon');

    this.sidebar.set(marker.options.id);
    this.sidebar.update();
  }

  _initMarkers() {
    let markerGroup = L.markerClusterGroup(this.clusterConfig);
    let markers = Array(this.checkins.length);

    this.checkins.forEach((checkin, index) => {

      var marker = L.marker(
        checkin.latlon,
        {
          icon: ICONS[checkin.type], 
          id: index,
        }
      );
      markerGroup.addLayer(marker);
      markers[index] = marker;
    });


    markerGroup.on('clusterclick', function (a) {
      var bounds = a.layer.getBounds().pad(0.5);
      this.map.fitBounds(bounds);
    }.bind(this));

    markerGroup.on("click", function (e) {
      if (e.layer instanceof L.Marker) {
        this.markerClick(e.layer);
      }
    }.bind(this));

    markerGroup.on('clustermouseover', function(event) {
      var marker = event.layer;
      if (marker && marker._icon && marker._icon.style) {
        marker._icon.style.zIndex = 99;
      }
    });

    markerGroup.on('clustermouseout', function(event) {
        var marker = event.layer;
        if (marker && marker._icon && marker._icon.style) {

          marker._icon.style.zIndex = 9;
        }
    });

    // Not useful if map starts from 0 marker:
    // resize map to fit all markers
    this.map.fitBounds(markerGroup.getBounds());//, {maxZoom: 19});
    this.map.setZoom(this.startZoom);

    this.map.addLayer(markerGroup);
    this._markers = markers;
  }

  _initHandlers() {
    // handle blur
    this.map.addEventListener("keydown", () => {
      event.target.blur();
    });

    this.slideButton.addEventListener("click", () => {
      //this.slideSidebar();
      var id = this.sidebar.next();
      let marker = this._markers[id];
      this.markerClick(marker);
    });
  }
};


class Sidebar {
  upb; // scrollUpButton;
  dwb; // scrollDownButton;

  c; // sidebarContainer;
  h; // sidebarHeader;
  a; // sidebarAddress;
  d; // sidebarDescription;

  constructor(checkinArray) {
    this.checkins = checkinArray;
    this.id = 0;
    this._initElements();
    this._initHandlers();
  }

  _initElements() {
    this.upb = document.querySelector('.scroll-up-button');
    this.dwb = document.querySelector('.scroll-down-button');

    this.c = document.querySelector('#sidebar-container');
    this.h = document.querySelector('#sidebar-header');
    this.r = document.querySelector('#sidebar-region');
    this.d = document.querySelector('#sidebar-description');
    this.i = document.querySelector('#sidebar-image');
  }

  _initHandlers() {
    this.dwb.addEventListener("click", () => {
      this.d.scrollBy({
          top: this.d.scrollHeight,
          behavior: 'smooth'
      });
      this.dwb.style.display = 'none';
      this.upb.style.display = 'inline-block';
    });

    this.upb.addEventListener("click", () => {
      this.d.scrollBy({
          top: -this.d.scrollHeight,
          behavior: 'smooth'
      });
      this.dwb.style.display = 'inline-block';
      this.upb.style.display = 'none';
    });
  }

  update() {
    this.c.style.display = 'block';

    let checkin = this.checkins[this.id];

    if (checkin.img) {
      this.i.style.display = 'inline-block';
      this.i.src = checkin.img;
      this.c.classList.remove('sidebar-container-with-no-image');
    } else {
      this.i.style.display = 'none';
      this.c.classList.add('sidebar-container-with-no-image');
    }
    this.h.innerText = checkin.name;
    // this.r.innerText = checkin.region;
    this.d.innerText = checkin.desc;
    this.d.style["max-height"] = "none";
    var descriptionHeight = this.c.clientHeight - this.d.offsetTop;
    if (descriptionHeight < this.d.clientHeight) {
      this.dwb.style.display = 'inline-block';
      // 34 for up/down button size
      this.d.style["max-height"] = descriptionHeight - 34 + "px";
    } else {
      this.dwb.style.display = 'none';
      this.upb.style.display = 'none';
    }
  }

  hide() {
    this.c.style.display = 'none';
  }

  next() {
    return (this.id + 1) % this.checkins.length;
  }

  set(id) {
    this.id = id;
  }

  get() {
    return this.id;
  }
}

// Export the library
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Map;
} else {
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return Map;
    });
  } else {
    t.Map = Map;
  }
}
}(window, window);