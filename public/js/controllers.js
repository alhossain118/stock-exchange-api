'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $state, $auth, User) {
  $scope.isAuthenticated = () => $auth.isAuthenticated();

  $scope.logout = () => {
    User.logout()
      .then(() => {
        $state.go('home');
      })
  };

  $scope.authenticate = provider => {
    User.authenticate(provider)
      .then(res => {
        $state.go('home');
      })
      .catch(err => {
        console.log('err:', err);
      })
  };
});

app.controller('loginCtrl', function($scope, $state, User) {
  $scope.login = () => {
    User.login($scope.user)
      .then(res => {
        console.log('res:', res);
        $state.go('profile');
      })
      .catch(err => {
        console.log('err:', err);
      });
  };
});

app.controller('registerCtrl', function($scope, $state, User) {
  $scope.register = () => {
    if($scope.user.password !== $scope.user.password2) {
      $scope.user.password = null;
      $scope.user.password2 = null;
      alert('Passwords must match.  Try again.');
    } else {
      User.signup($scope.user)
        .then(res => {
          console.log('res:', res);
          $state.go('login');
        })
        .catch(err => {
          console.log('err:', err);
        });
    }
  };
});

app.controller('profileCtrl', function($scope, Profile, User, nonRegisteredUsers, stockSaveService) {
  console.log("Profile", Profile);
  console.log("User", User);
  $scope.user = Profile;

  $scope.changedEmail;
  $scope.inputField = true;
  $scope.editEmail = user => {
    console.log("whaaat");
    $scope.inputField = false;
    $scope.changedEmail = Profile.email
  };
  $scope.saveEdit = () => {
    console.log($scope.changedEmail);
    User.editProfile({ email: $scope.changedEmail})
      .then((res) => {
        $scope.user = res.data;
      })
    // $scope.changedEmail
  }

  $scope.editProfilePage = (user) => {
    console.log(user);
  }

  $scope.submitStockName = (id) => {
    console.log(id.Name);

    nonRegisteredUsers.getStocks(id.Name)
      .then(res => {

        $scope.stocks = [];
        $scope.stocks.push(res.data)
        console.log("Response", $scope.stocks);
      })

  }
  $scope.savedStocksArray = [];

  $scope.saveStock = (name) => {
    // $scope.name.symbol = $scope.name.Symbol;
    $scope.superStock = {
      symbol:name.Symbol
    }
    console.log($scope.superStock);
    $scope.savedStocksArray.push(name.Symbol)

    stockSaveService.saveTheStock($scope.superStock)

  }
  $scope.superButton = () => {
    console.log($scope.savedStocksArray);
  }

});

app.controller('usersCtrl', function($scope, User, Users) {
  console.log('usersCtrl');
  $scope.users = Users;

  $scope.sendMessage = user => {
    User.sendMessage(user);
  };


  $scope.inputField = true;

  $scope.$on('message', function(ev, data) {
    console.log('data:', data);
  });
});

app.controller('profileEditCtrl', function ($scope, $state,User, $stateParams, Profile){
  console.log(Profile);
  console.log('$stateParams', $stateParams);

  // $scope.emailValue = Profie.email;
  $scope.emailValue = Profile.email
  $scope.bioDataValue = Profile.bioData;
  $scope.editProfile = () =>{
    User.editProfile({email: $scope.emailValue, bioData: $scope.bioDataValue})
      .then((res) => {
        console.log(res);
        console.log($scope.user);
        $scope.user = res.data
      })
    Profile.email = $scope.emailValue
    Profile.bioData = $scope.bioDataValue;

    $state.go('profile')
  }
  // $scope.changedEmail = Profile.email

})
app.controller('nonRegisteredUsersCtrl', function($scope,nonRegisteredUsers){
  console.log('nonRegisteredUsersCtrl');

  $scope.getGeneralStocks = (stock) => {
    console.log("stock", stock.Name);
    // console.log('clicked');
    nonRegisteredUsers.getStocks(stock.Name)
      .then(res => {

        $scope.stocks = [];
        $scope.stocks.push(res.data)
        console.log("Response", $scope.stocks);
      })
  }

})

app.controller('savedStocksCtrl', function($scope,stockSaveService,nonRegisteredUsers){
  console.log('savedStocksCtrl');

  stockSaveService.getSavedStock()
    .then(res => {
      $scope.savedStockArray = [];
      /////////////////////////////////////////
// res.data.symbol

  console.log("Line 177:", res.data[0].symbol); // => 3



/////Working on This bit to update page

  // for(var i =0; i < res.data.length; i++){
  //   stockSaveService.getOneStock(res.data[i].symbol)
  //     .then(res =>{
  //       console.log("RESSSSSSS", res);
  //
  //     })
  // }
  // console.log("Line 177:", res.data.[0].symbol);

      // nonRegisteredUsers.getStocks(res.data[0].symbol)
      //   .then(response =>{
      //     console.log("Super Response", response);
      //   })



///////////////////////////////////////////
      $scope.savedStockArray = res.data
///////////////////////////////////////////




      console.log("RESPONSE", res);
    })
  $scope.deleteStock = (key, index) => {
    console.log(key);
    stockSaveService.removeStock(key._id)
      .then(res => {
        $scope.savedStockArray.splice(index,1)
      })
  }
})
