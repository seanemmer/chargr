'use strict';

angular.module('core').controller('HeaderCtrl', ['$mdToast', '$location', '$http', '$mdDialog', '$scope', '$state', 'Authentication',
	function($mdToast, $location, $http, $mdDialog, $scope, $state, Authentication) {
		// Expose view variables
		$scope.state = $state;
		$scope.authentication = Authentication;

		// set selected tab based on current view state
		$scope.$watch('state.current.name', function(newVal, oldVal) {
			switch($state.current.name) {
				case 'home':
					$scope.tabIndex = 0;
					break;
				case 'planning':
					$scope.tabIndex = 0;
					break;
				case 'history':
					$scope.tabIndex = 1;
					break;
				case 'electricity':
					$scope.tabIndex = 2;
					break;
				default: 
					$scope.tabIndex = 0;
			}
		});

		$scope.tabs = [
			{
				'name': 'Charge Planning',
				'state': 'planning',
				'authenticationRequired': true
			},
			{
				'name': 'Vehicle History',
				'state': 'history',
				'authenticationRequired': true
			},
			{
				'name': 'Electricity Pricing',
				'state': 'electricity',
			}
		];

		$scope.register = function(event) {
			$mdDialog.show({
				targetEvent: event,
				templateUrl: 'modules/users/dialogs/views/register.dialog.client.view.html',
				controller: 'RegisterDialogCtrl'
			})
			.then(function() {
				$mdToast.show($mdToast.simple()
					.content('Successfully Registered!')
					.position('bottom right')
				);
			});
		};

		$scope.signIn = function(event) {
			$mdDialog.show({
				targetEvent: event,
				templateUrl: 'modules/users/dialogs/views/sign_in.dialog.client.view.html',
				controller: 'SignInDialogCtrl'
			})
			.then(function() {
				$mdToast.show($mdToast.simple()
					.content('Successfully Signed In!')
					.position('bottom right')
				);
			});
		};

		$scope.signOut = function(event) {
			$http.get('/api/auth/signout').success(function(response) {
				// If successful we clear the global user model
				$scope.authentication.user = null;
				
				$mdToast.show($mdToast.simple()
					.content('Successfully Signed Out!')
					.position('bottom right')
				);

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
