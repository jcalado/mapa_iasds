export function distanceBetween(pointA, pointB) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(pointB.lat - pointA.lat); // deg2rad below
    var dLon = deg2rad(pointB.lng - pointA.lng);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(pointA.lat)) *
        Math.cos(deg2rad(pointB.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d.toFixed(0);
  }

export function deg2rad(deg) {
    return deg * (Math.PI / 180);
}