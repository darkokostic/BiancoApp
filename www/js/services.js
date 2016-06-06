angular.module('starter.services', [])

.factory('BneroAppFactory', function($http) {
    //SETTINGS

    /* Gallery */

    /* Other Designs */
    var urlOtherDesigns = 'http://b-nero.com/app/public/api/otherdesigns';

    /* Our Designs */
    var urlHomes = 'http://b-nero.com/app/public/api/ourdesigns/0';
    var urlOffices = 'http://b-nero.com/app/public/api/ourdesigns/1';
    var urlCompanies = 'http://b-nero.com/app/public/api/ourdesigns/2';
    var urlOurDesignsImages = 'http://b-nero.com/app/public/api/ourdesignsimages/';

    /* Project Gallery */
    var urlProjectGallery = 'http://b-nero.com/app/public/api/galleries/';

    /* Finished Projects */
    var urlFinishedProjects = 'http://b-nero.com/app/public/api/projects/0';

    /* Projects Insite */
    var urlInsiteProjects = 'http://b-nero.com/app/public/api/projects/1';

    /* Shop */
    var urlShopCategories = 'http://b-nero.com/app/public/api/shopcats/0';
    var urlShopSubCategories = 'http://b-nero.com/app/public/api/shopcats/';
    var urlShopSubCategoriesItems = 'http://b-nero.com/app/public/api/shopitems/';

    /* Advertisements */
    var urlAdvHeader = 'http://b-nero.com/app/public/api/ads/0';
    var urlAdvSubHeader = 'http://b-nero.com/app/public/api/ads/1';

    /* Contact and About us data and favorite system */
    var urlContactAboutFav = 'http://b-nero.com/app/public/api/extras';

    var urlHomeSlider = 'http://b-nero.com/app/public/api/homepage';

    var BneroAppFactory = {};
    //END - SETTINGS

    BneroAppFactory.getOtherDesigns = function() {
        return $http.get(urlOtherDesigns, {
           headers: {}
           })
        .then(function(response) {
            return response.data;
        });
    };

    BneroAppFactory.getHomes = function() {
        return $http.get(urlHomes, {
           headers: {}
           })
        .then(function(response) {
            return response.data;
        });
    };

    BneroAppFactory.getOffices = function() {
        return $http.get(urlOffices, {
           headers: {}
           })
        .then(function(response) {
            return response.data;
        });
    };

    BneroAppFactory.getCompanies = function() {
        return $http.get(urlCompanies, {
           headers: {}
           })
        .then(function(response) {
            return response.data;
        });
    };

    BneroAppFactory.getOurDesignsImages = function(ourDesignsId) {
        return $http.get(urlOurDesignsImages + ourDesignsId, {
           headers: {}
           })
        .then(function(response) {
            return response.data;
        });
    };

    BneroAppFactory.getFinishedProjects = function() {
        return $http.get(urlFinishedProjects, {
           headers: {}
           })
        .then(function(response) {
            return response.data;
        });
    };

    BneroAppFactory.getInsiteProjects = function() {
        return $http.get(urlInsiteProjects, {
           headers: {}
           })
        .then(function(response) {
            return response.data;
        });
    };

    BneroAppFactory.getProjectGallery = function(projectId) {
        return $http.get(urlProjectGallery + projectId, {
           headers: {}
           })
        .then(function(response) {
            return response.data;
        });
    };
    BneroAppFactory.getShopCategories = function() {
        return $http.get(urlShopCategories, {
           headers: {}
           })
        .then(function(response) {
            return response.data;
        });
    };

    BneroAppFactory.getShopSubCategories = function(id) {
        return $http.get(urlShopSubCategories + id, {
           headers: {}
           })
        .then(function(response) {
            return response.data;
        });
    };

    BneroAppFactory.getShopSubCategoriesItems = function(id) {
        return $http.get(urlShopSubCategoriesItems + id, {
           headers: {}
           })
        .then(function(response) {
            return response.data;
        });
    };

    BneroAppFactory.getAdvHeader = function() {
        return $http.get(urlAdvHeader, {
           headers: {}
           })
        .then(function(response) {
            return response.data;
        });
    };

    BneroAppFactory.getAdvSubHeader = function() {
        return $http.get(urlAdvSubHeader, {
           headers: {}
           })
        .then(function(response) {
            return response.data;
        });
    };

    BneroAppFactory.getContactAbout = function() {
        return $http.get(urlContactAboutFav, {
           headers: {}
           })
        .then(function(response) {
            return response.data;
        });
    };

    BneroAppFactory.getHomeSlider = function() {
        return $http.get(urlHomeSlider, {
           headers: {}
           })
        .then(function(response) {
            return response.data;
        });
    };

    return BneroAppFactory;
})
