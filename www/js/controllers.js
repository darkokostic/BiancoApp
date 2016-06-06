angular.module('starter.controllers', [])

.controller('MainCtrl', ['$state', function($state) {
  this.onTabSelected = function(_scope){
    // if we are selectng the home title then
    // change the state back to the top state
    if ( _scope.title === 'تسوق') {
      setTimeout(function() {
        $state.go('tabs.shop', {});
      },5);
    }

    if ( _scope.title === 'الالبوم') {
      setTimeout(function() {
        $state.go('tabs.gallery', {});
      },5);
    }
  }
  this.onTabDeselected = function(){
  }
}])

.controller('HomeCtrl', function($window, $scope, BneroAppFactory, $interval, $rootScope, $timeout) {
  BneroAppFactory.getAdvSubHeader()
  .then(function (data) {
    var c=0;
    $scope.adv=data[c];
    $interval(function(){
        c++;
        if(c == data.length) {
          c = 0;
        }
        $scope.adv=data[c];
    },10000);
  })
  .catch(function (object, error) {
      console.log('error');
    });

    BneroAppFactory.getHomeSlider()
    .then(function (data) {
        var desc = [];
        for(var i = 0; i < data.length; i++) {
            if (i == 0) {
                desc[i] = data[data.length - 1];
            } else {
                desc[i] = data[data.length - 1 - i];
            }
        }
        $scope.slides = desc;
    })
    .catch(function (object, error) {
        console.log('error');
    });

    $timeout(function() {
        var swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev'

                    });
        }, 4000);
})

.controller('GalleryCtrl', function($scope, $ionicHistory, BneroAppFactory, $interval) {

  BneroAppFactory.getAdvHeader()
  .then(function (data) {
    var c=0;
    $scope.adv=data[c];
    $interval(function(){
        c++;
        if(c == data.length) {
          c = 0;
        }
        $scope.adv=data[c];
    },10000);
  })
  .catch(function (object, error) {
      console.log('error');
  });
})

.controller('GallerySingleViewCtrl', function($scope, $ionicHistory) {
    $scope.myGoBack = function () {
        $ionicHistory.goBack();
    };
})

.controller('ShopCtrl', function($scope, $ionicHistory, BneroAppFactory, $interval) {
    BneroAppFactory.getShopCategories()
    .then(function (data) {
          $scope.categories = data;
    })
    .catch(function (object, error) {
        console.log('error');
    });

    BneroAppFactory.getAdvHeader()
    .then(function (data) {
      var c=0;
      $scope.adv=data[c];
      $interval(function(){
          c++;
          if(c == data.length) {
            c = 0;
          }
          $scope.adv=data[c];
      },10000);
    })
    .catch(function (object, error) {
        console.log('error');
    });
})

.controller('ShopSubCategoriesCtrl', function($scope, $stateParams, BneroAppFactory, $ionicHistory, $interval) {
    $scope.myGoBack = function () {
        $ionicHistory.goBack();
    };
    var id = $stateParams.shopCatID;

    BneroAppFactory.getShopSubCategories(id)
    .then(function (data) {
        $scope.subCategories = data;
    })
    .catch(function (object, error) {
        console.log('error');
    });

    BneroAppFactory.getAdvHeader()
    .then(function (data) {
      var c=0;
      $scope.adv=data[c];
      $interval(function(){
          c++;
          if(c == data.length) {
            c = 0;
          }
          $scope.adv=data[c];
      },10000);
    })
    .catch(function (object, error) {
        console.log('error');
    });
})

.controller('ShopSingleViewCtrl', function($scope, $rootScope, $ionicHistory, BneroAppFactory, $interval, $stateParams, $cordovaSocialSharing, $localStorage, $ionicPopup, $timeout) {
    $scope.myGoBack = function () {
        $ionicHistory.goBack();
    };
    $scope.addFavorite = function(item) {
        var alreadyAdded = false;
        var shopItem = item;
        if($localStorage.favorites.length == 0) {
            $localStorage.favorites.push(shopItem);
        } else {
            for(var i = 0; i < $localStorage.favorites.length; i++) {
                if($localStorage.favorites[i].id == item.id) {
                    alreadyAdded = true;
                }
            }
            if(alreadyAdded == false) {
                $localStorage.favorites.push(shopItem);
                alert('Added to favorites!');
            } else {
                alert('Already in favorites!');
            }
        }
    };
    $scope.query = {title: ''};
    var id = $stateParams.id;

    BneroAppFactory.getShopSubCategoriesItems(id)
    .then(function (data) {
        var desc = [];
        for(var i = 0; i < data.length; i++) {
            if (i == 0) {
                desc[i] = data[data.length - 1];
            } else {
                desc[i] = data[data.length - 1 - i];
            }
        }
        $scope.subCategorieItems = desc;
        $scope.share = function(id) {
          for(var i = 0; i < data.length; i++) {
            if(id == data[i].id) {
              var img = data[i].img;
              $cordovaSocialSharing.share("Bianco Nero", "Bianco Nero", "http://b-nero.com/app/public/shopitems/" + img, null);
            }
          }
        }
    })
    .catch(function (object, error) {
        console.log('error');
    });

    $scope.doRefresh = function() {
        $timeout( function() {
        //simulate async response
        BneroAppFactory.getShopSubCategoriesItems(id)
        .then(function (data) {
            var desc = [];
            for(var i = 0; i < data.length; i++) {
                if (i == 0) {
                    desc[i] = data[data.length - 1];
                } else {
                    desc[i] = data[data.length - 1 - i];
                }
            }
            $scope.subCategorieItems = desc;
            $scope.share = function(id) {
              for(var i = 0; i < data.length; i++) {
                if(id == data[i].id) {
                  var img = data[i].img;
                  $cordovaSocialSharing.share("Bianco Nero", "Bianco Nero", "http://b-nero.com/app/public/shopitems/" + img, null);
                }
              }
            }
        })
        .catch(function (object, error) {
            console.log('error');
        });
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');

      }, 1000);

    };

    BneroAppFactory.getAdvSubHeader()
    .then(function (data) {
      var c=0;
      $scope.adv=data[c];
      $interval(function(){
          c++;
          if(c == data.length) {
            c = 0;
          }
          $scope.adv=data[c];
      },10000);
    })
    .catch(function (object, error) {
        console.log('error');
    });


    //Ionic popup
    if($rootScope.featureFavorite == true) {
        $scope.showPopup = function(myObject) {
            var myPopup = $ionicPopup.show({
            template: '',
            title: '',
            subTitle: '',
            scope: $scope,
            buttons: [
                {
                    text: '',
                    type: 'button-positive ion-star',
                    onTap: function(e) {
                        $scope.addFavorite(myObject);
                    }
                },
                {
                    text: '',
                    type: 'ion-android-share-alt',
                    onTap: function(e) {
                        $scope.share(myObject.id);
                    }
                },
                { text: 'Close' }
            ]
          });
          myPopup.then(function(res) {
            console.log('Tapped!', res);
          });
      };
  } else {
      $scope.showPopup = function(myObject) {
          var myPopup = $ionicPopup.show({
          template: '',
          title: '',
          subTitle: '',
          scope: $scope,
          buttons: [
              {
                  text: '',
                  type: 'ion-android-share-alt',
                  onTap: function(e) {
                      $scope.share(myObject.id);
                  }
              },
              { text: 'Close' }
          ]
        });
        myPopup.then(function(res) {
          console.log('Tapped!', res);
        });
    };
  }
})

.controller('OurDesignsCtrl', function($scope, BneroAppFactory, $ionicHistory, $interval) {
  $scope.myGoBack = function () {
      $ionicHistory.goBack();
  };

  BneroAppFactory.getAdvHeader()
  .then(function (data) {
    var c=0;
    $scope.adv=data[c];
    $interval(function(){
        c++;
        if(c == data.length) {
          c = 0;
        }
        $scope.adv=data[c];
    },10000);
  })
  .catch(function (object, error) {
      console.log('error');
  });

})

.controller('HomesCtrl', function($scope, BneroAppFactory, $ionicHistory, $interval, $cordovaSocialSharing, $timeout) {
    $scope.myGoBack = function () {
        $ionicHistory.goBack();
    };
    $scope.query = {title: ''};
    BneroAppFactory.getHomes()
    .then(function (data) {
        var desc = [];
        for(var i = 0; i < data.length; i++) {
            if (i == 0) {
                desc[i] = data[data.length - 1];
            } else {
                desc[i] = data[data.length - 1 - i];
            }
        }
        $scope.projects = desc;
    })
    .catch(function (object, error) {
        console.log('error');
    });

    $scope.doRefresh = function() {
        $timeout( function() {
        //simulate async response
        BneroAppFactory.getHomes()
        .then(function (data) {
            var desc = [];
            for(var i = 0; i < data.length; i++) {
                if (i == 0) {
                    desc[i] = data[data.length - 1];
                } else {
                    desc[i] = data[data.length - 1 - i];
                }
            }
            $scope.projects = desc;
        })
        .catch(function (object, error) {
            console.log('error');
        });
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');

      }, 1000);

    };

    BneroAppFactory.getAdvSubHeader()
    .then(function (data) {
      var c=0;
      $scope.adv=data[c];
      $interval(function(){
          c++;
          if(c == data.length) {
            c = 0;
          }
          $scope.adv=data[c];
      },10000);
    })
    .catch(function (object, error) {
        console.log('error');
    });

})

.controller('GallerySubCategoryCtrl', function($scope, BneroAppFactory, $ionicHistory, $interval, $cordovaSocialSharing, $stateParams, $timeout) {
    $scope.myGoBack = function () {
        $ionicHistory.goBack();
    };
    var subCatId = $stateParams.id;
    $scope.query = {title: ''};

    BneroAppFactory.getOurDesignsImages(subCatId)
    .then(function (data) {
        var desc = [];
        for(var i = 0; i < data.length; i++) {
            if (i == 0) {
                desc[i] = data[data.length - 1];
            } else {
                desc[i] = data[data.length - 1 - i];
            }
        }
        $scope.projects = desc;

          $scope.share = function(id) {
            for(var i = 0; i < data.length; i++) {
              if(id == data[i].id) {
                var img = data[i].img;
                $cordovaSocialSharing.share("Bianco Nero", "Bianco Nero", "http://b-nero.com/app/public/galleries/" + img, null);
              }
            }
          }
    })
    .catch(function (object, error) {
        console.log('error');
    });

    $scope.doRefresh = function() {
        $timeout( function() {
        //simulate async response
        BneroAppFactory.getOurDesignsImages(subCatId)
        .then(function (data) {
            var desc = [];
            for(var i = 0; i < data.length; i++) {
                if (i == 0) {
                    desc[i] = data[data.length - 1];
                } else {
                    desc[i] = data[data.length - 1 - i];
                }
            }
            $scope.projects = desc;

              $scope.share = function(id) {
                for(var i = 0; i < data.length; i++) {
                  if(id == data[i].id) {
                    var img = data[i].img;
                    $cordovaSocialSharing.share("Bianco Nero", "Bianco Nero", "http://b-nero.com/app/public/galleries/" + img, null);
                  }
                }
              }
        })
        .catch(function (object, error) {
            console.log('error');
        });
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');

      }, 1000);

    };

    BneroAppFactory.getAdvSubHeader()
    .then(function (data) {
      var c=0;
      $scope.adv=data[c];
      $interval(function(){
          c++;
          if(c == data.length) {
            c = 0;
          }
          $scope.adv=data[c];
      },10000);
    })
    .catch(function (object, error) {
        console.log('error');
    });

})

.controller('InsiteProjectSubCategoryCtrl', function($scope, BneroAppFactory, $ionicHistory, $interval, $stateParams, $timeout) {
    $scope.myGoBack = function () {
        $ionicHistory.goBack();
    };
    var insiteId = $stateParams.id;
    $scope.query = {title: ''};

    BneroAppFactory.getProjectGallery(insiteId)
    .then(function (data) {
            var desc = [];
            for(var i = 0; i < data.length; i++) {
                if (i == 0) {
                    desc[i] = data[data.length - 1];
                } else {
                    desc[i] = data[data.length - 1 - i];
                }
            }
            $scope.projects = desc;

          $scope.share = function(id) {
            for(var i = 0; i < data.length; i++) {
              if(id == data[i].id) {
                var img = data[i].image;
                $cordovaSocialSharing.share("Bianco Nero", "Bianco Nero", "http://b-nero.com/app/public/galleries/" + img, null);
              }
            }
          }
    })
    .catch(function (object, error) {
        console.log('error');
    });

    $scope.doRefresh = function() {
        $timeout( function() {
        //simulate async response
        BneroAppFactory.getProjectGallery(insiteId)
        .then(function (data) {
                var desc = [];
                for(var i = 0; i < data.length; i++) {
                    if (i == 0) {
                        desc[i] = data[data.length - 1];
                    } else {
                        desc[i] = data[data.length - 1 - i];
                    }
                }
                $scope.projects = desc;

              $scope.share = function(id) {
                for(var i = 0; i < data.length; i++) {
                  if(id == data[i].id) {
                    var img = data[i].image;
                    $cordovaSocialSharing.share("Bianco Nero", "Bianco Nero", "http://b-nero.com/app/public/galleries/" + img, null);
                  }
                }
              }
        })
        .catch(function (object, error) {
            console.log('error');
        });
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');

      }, 1000);

    };

    BneroAppFactory.getAdvSubHeader()
    .then(function (data) {
      var c=0;
      $scope.adv=data[c];
      $interval(function(){
          c++;
          if(c == data.length) {
            c = 0;
          }
          $scope.adv=data[c];
      },10000);
    })
    .catch(function (object, error) {
        console.log('error');
    });

})

.controller('FinishedProjectsSubCategoryCtrl', function($scope, BneroAppFactory, $ionicHistory, $interval, $stateParams, $timeout) {
    $scope.myGoBack = function () {
        $ionicHistory.goBack();
    };
    var finishedId = $stateParams.id;
    $scope.query = {title: ''};

    BneroAppFactory.getProjectGallery(finishedId)
    .then(function (data) {
        var desc = [];
        for(var i = 0; i < data.length; i++) {
            if (i == 0) {
                desc[i] = data[data.length - 1];
            } else {
                desc[i] = data[data.length - 1 - i];
            }
        }
        $scope.projects = desc;

          $scope.share = function(id) {
            for(var i = 0; i < data.length; i++) {
              if(id == data[i].id) {
                var img = data[i].image;
                $cordovaSocialSharing.share("Bianco Nero", "Bianco Nero", "http://b-nero.com/app/public/galleries/" + img, null);
              }
            }
          }
    })
    .catch(function (object, error) {
        console.log('error');
    });

    $scope.doRefresh = function() {
        $timeout( function() {
        //simulate async response
        BneroAppFactory.getProjectGallery(finishedId)
        .then(function (data) {
            var desc = [];
            for(var i = 0; i < data.length; i++) {
                if (i == 0) {
                    desc[i] = data[data.length - 1];
                } else {
                    desc[i] = data[data.length - 1 - i];
                }
            }
            $scope.projects = desc;

              $scope.share = function(id) {
                for(var i = 0; i < data.length; i++) {
                  if(id == data[i].id) {
                    var img = data[i].image;
                    $cordovaSocialSharing.share("Bianco Nero", "Bianco Nero", "http://b-nero.com/app/public/galleries/" + img, null);
                  }
                }
              }
        })
        .catch(function (object, error) {
            console.log('error');
        });
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');

      }, 1000);

    };

    BneroAppFactory.getAdvSubHeader()
    .then(function (data) {
      var c=0;
      $scope.adv=data[c];
      $interval(function(){
          c++;
          if(c == data.length) {
            c = 0;
          }
          $scope.adv=data[c];
      },10000);
    })
    .catch(function (object, error) {
        console.log('error');
    });

})

.controller('FinishedProjectsCtrl', function($scope, BneroAppFactory, $ionicHistory, $interval, $timeout) {
    $scope.myGoBack = function () {
        $ionicHistory.goBack();
    };
    $scope.query = {title: ''};
    BneroAppFactory.getFinishedProjects()
    .then(function (data) {
        var desc = [];
        for(var i = 0; i < data.length; i++) {
            if (i == 0) {
                desc[i] = data[data.length - 1];
            } else {
                desc[i] = data[data.length - 1 - i];
            }
        }
        $scope.projects = desc;
    })
    .catch(function (object, error) {
        console.log('error');
    });

    $scope.doRefresh = function() {
        $timeout( function() {
        //simulate async response
        BneroAppFactory.getFinishedProjects()
        .then(function (data) {
            var desc = [];
            for(var i = 0; i < data.length; i++) {
                if (i == 0) {
                    desc[i] = data[data.length - 1];
                } else {
                    desc[i] = data[data.length - 1 - i];
                }
            }
            $scope.projects = desc;
        })
        .catch(function (object, error) {
            console.log('error');
        });
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');

      }, 1000);

    };

    BneroAppFactory.getAdvSubHeader()
    .then(function (data) {
      var c=0;
      $scope.adv=data[c];
      $interval(function(){
          c++;
          if(c == data.length) {
            c = 0;
          }
          $scope.adv=data[c];
      },10000);
    })
    .catch(function (object, error) {
        console.log('error');
    });
})

.controller('OtherDesignsCtrl', function($scope, BneroAppFactory, $ionicHistory, $interval, $cordovaSocialSharing, $timeout) {
    $scope.myGoBack = function () {
        $ionicHistory.goBack();
    };
    $scope.query = {title: ''};
    BneroAppFactory.getOtherDesigns()
    .then(function (data) {
        var desc = [];
        for(var i = 0; i < data.length; i++) {
            if (i == 0) {
                desc[i] = data[data.length - 1];
            } else {
                desc[i] = data[data.length - 1 - i];
            }
        }
        $scope.projects = desc;

        $scope.share = function(id) {
          for(var i = 0; i < data.length; i++) {
            if(id == data[i].id) {
              var img = data[i].img;
              $cordovaSocialSharing.share("Bianco Nero", "Bianco Nero", "http://b-nero.com/app/public/galleries/" + img, null);
            }
          }
        }
    })
    .catch(function (object, error) {
        console.log('error');
    });


    $scope.doRefresh = function() {
        $timeout( function() {
        //simulate async response
        BneroAppFactory.getOtherDesigns()
        .then(function (data) {
            var desc = [];
            for(var i = 0; i < data.length; i++) {
                if (i == 0) {
                    desc[i] = data[data.length - 1];
                } else {
                    desc[i] = data[data.length - 1 - i];
                }
            }
            $scope.projects = desc;

            $scope.share = function(id) {
              for(var i = 0; i < data.length; i++) {
                if(id == data[i].id) {
                  var img = data[i].img;
                  $cordovaSocialSharing.share("Bianco Nero", "Bianco Nero", "http://b-nero.com/app/public/galleries/" + img, null);
                }
              }
            }
        })
        .catch(function (object, error) {
            console.log('error');
        });
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');

      }, 1000);

    };

    BneroAppFactory.getAdvSubHeader()
    .then(function (data) {
      var c=0;
      $scope.adv=data[c];
      $interval(function(){
          c++;
          if(c == data.length) {
            c = 0;
          }
          $scope.adv=data[c];
      },10000);
    })
    .catch(function (object, error) {
        console.log('error');
    });
})

.controller('ProjectsInsiteCtrl', function($scope, BneroAppFactory, $ionicHistory, $interval, $timeout) {
    $scope.myGoBack = function () {
        $ionicHistory.goBack();
    };
    $scope.query = {title: ''};
  BneroAppFactory.getInsiteProjects()
    .then(function (data) {
        var desc = [];
        for(var i = 0; i < data.length; i++) {
            if (i == 0) {
                desc[i] = data[data.length - 1];
            } else {
                desc[i] = data[data.length - 1 - i];
            }
        }
        $scope.projects = desc;

          $scope.share = function(id) {
            for(var i = 0; i < data.length; i++) {
              if(id == data[i].id) {
                var img = data[i].thumbnail;
                $cordovaSocialSharing.share("Bianco Nero", "Bianco Nero", "http://b-nero.com/app/public/ourdesigns/" + img, null);
              }
            }
          }
    })
    .catch(function (object, error) {
        console.log('error');
    });

    $scope.doRefresh = function() {
        $timeout( function() {
        //simulate async response
        BneroAppFactory.getInsiteProjects()
          .then(function (data) {
              var desc = [];
              for(var i = 0; i < data.length; i++) {
                  if (i == 0) {
                      desc[i] = data[data.length - 1];
                  } else {
                      desc[i] = data[data.length - 1 - i];
                  }
              }
              $scope.projects = desc;

                $scope.share = function(id) {
                  for(var i = 0; i < data.length; i++) {
                    if(id == data[i].id) {
                      var img = data[i].thumbnail;
                      $cordovaSocialSharing.share("Bianco Nero", "Bianco Nero", "http://b-nero.com/app/public/ourdesigns/" + img, null);
                    }
                  }
                }
          })
          .catch(function (object, error) {
              console.log('error');
          });
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');

      }, 1000);

    };

    BneroAppFactory.getAdvSubHeader()
    .then(function (data) {
      var c=0;
      $scope.adv=data[c];
      $interval(function(){
          c++;
          if(c == data.length) {
            c = 0;
          }
          $scope.adv=data[c];
      },10000);
    })
    .catch(function (object, error) {
        console.log('error');
    });
})

.controller('CompaniesCtrl', function($scope, BneroAppFactory, $ionicHistory, $interval, $cordovaSocialSharing, $timeout) {
    $scope.myGoBack = function () {
        $ionicHistory.goBack();
    };
    $scope.query = {title: ''};
    BneroAppFactory.getCompanies()
    .then(function (data) {
        var desc = [];
        for(var i = 0; i < data.length; i++) {
            if (i == 0) {
                desc[i] = data[data.length - 1];
            } else {
                desc[i] = data[data.length - 1 - i];
            }
        }
        $scope.projects = desc;
    })
    .catch(function (object, error) {
        console.log('error');
    });

    $scope.doRefresh = function() {
        $timeout( function() {
        //simulate async response
        BneroAppFactory.getCompanies()
        .then(function (data) {
            var desc = [];
            for(var i = 0; i < data.length; i++) {
                if (i == 0) {
                    desc[i] = data[data.length - 1];
                } else {
                    desc[i] = data[data.length - 1 - i];
                }
            }
            $scope.projects = desc;
        })
        .catch(function (object, error) {
            console.log('error');
        });
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');

      }, 1000);

    };

    BneroAppFactory.getAdvSubHeader()
    .then(function (data) {
      var c=0;
      $scope.adv=data[c];
      $interval(function(){
          c++;
          if(c == data.length) {
            c = 0;
          }
          $scope.adv=data[c];
      },10000);
    })
    .catch(function (object, error) {
        console.log('error');
    });
})

.controller('OfficesCtrl', function($scope, BneroAppFactory, $ionicHistory, $interval, $cordovaSocialSharing, $timeout) {
    $scope.myGoBack = function () {
        $ionicHistory.goBack();
    };
    $scope.query = {title: ''};
    BneroAppFactory.getOffices()
    .then(function (data) {
        var desc = [];
        for(var i = 0; i < data.length; i++) {
            if (i == 0) {
                desc[i] = data[data.length - 1];
            } else {
                desc[i] = data[data.length - 1 - i];
            }
        }
        $scope.projects = desc;
    })
    .catch(function (object, error) {
        console.log('error');
    });

    $scope.doRefresh = function() {
        $timeout( function() {
        //simulate async response
        BneroAppFactory.getOffices()
        .then(function (data) {
            var desc = [];
            for(var i = 0; i < data.length; i++) {
                if (i == 0) {
                    desc[i] = data[data.length - 1];
                } else {
                    desc[i] = data[data.length - 1 - i];
                }
            }
            $scope.projects = desc;
        })
        .catch(function (object, error) {
            console.log('error');
        });
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');

      }, 1000);

    };

    BneroAppFactory.getAdvSubHeader()
    .then(function (data) {
      var c=0;
      $scope.adv=data[c];
      $interval(function(){
          c++;
          if(c == data.length) {
            c = 0;
          }
          $scope.adv=data[c];
      },10000);
    })
    .catch(function (object, error) {
        console.log('error');
    });
})

.controller('AboutCtrl', function($scope, BneroAppFactory, $interval) {
  BneroAppFactory.getAdvHeader()
  .then(function (data) {
    var c=0;
    $scope.adv=data[c];
    $interval(function(){
        c++;
        if(c == data.length) {
          c = 0;
        }
        $scope.adv=data[c];
    },10000);
  })
  .catch(function (object, error) {
      console.log('error');
  });

  BneroAppFactory.getContactAbout()
  .then(function (data) {
      $scope.about = data[0].about;
  })
  .catch(function (object, error) {
      console.log('error');
  });
})

.controller('FavoritesCtrl', function($scope, $ionicHistory, BneroAppFactory, $interval, $localStorage, $ionicPopup, $timeout, $cordovaSocialSharing) {
    $scope.myGoBack = function () {
        $ionicHistory.goBack();
    };

    $scope.subCategorieItems = $localStorage.favorites;

    $scope.query = {code: ''};

    $scope.share = function(shopId) {
      for(var i = 0; i < $localStorage.favorites.length; i++) {
          if($localStorage.favorites[i].id == shopId) {
              var img = $localStorage.favorites[i].img;
              $cordovaSocialSharing.share("Bianco Nero", "Bianco Nero", "http://b-nero.com/app/public/shopitems/" + img, null);
          }
      }
    }

    $scope.removeFavorite = function(shopId) {
        for(var i = 0; i < $localStorage.favorites.length; i++) {
            if($localStorage.favorites[i].id == shopId) {
                var storageFav = $localStorage.favorites;
                storageFav.splice(i, 1);
                $localStorage.favorites = storageFav;
            }
        }
    };

    BneroAppFactory.getAdvSubHeader()
    .then(function (data) {
      var c=0;
      $scope.adv=data[c];
      $interval(function(){
          c++;
          if(c == data.length) {
            c = 0;
          }
          $scope.adv=data[c];
      },10000);
    })
    .catch(function (object, error) {
        console.log('error');
    });

    //Ionic popup
    $scope.showPopup = function(myObject) {
        var myPopup = $ionicPopup.show({
        template: '',
        title: '',
        subTitle: '',
        scope: $scope,
        buttons: [
            {
                text: '',
                type: 'button-assertive ion-trash-b',
                onTap: function(e) {
                    $scope.removeFavorite(myObject.id);
                }
            },
            {
                text: '',
                type: 'button-positive ion-android-share-alt',
                onTap: function(e) {
                    $scope.share(myObject.id);
                }
            },
            { text: 'Close' }
        ]
      });
      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });
  };
})

.controller('ContactCtrl', function($scope, BneroAppFactory, $interval) {
  BneroAppFactory.getAdvHeader()
  .then(function (data) {
    var c=0;
    $scope.adv=data[c];
    $interval(function(){
        c++;
        if(c == data.length) {
          c = 0;
        }
        $scope.adv=data[c];
    },10000);
  })
  .catch(function (object, error) {
      console.log('error');
  });

  BneroAppFactory.getContactAbout()
  .then(function (data) {
      $( "div.inner" ).replaceWith( data[0].phones );
      $scope.mailbox = data[0].mailbox;
      $scope.email = data[0].email;
  })
  .catch(function (object, error) {
      console.log('error');
  });
});
