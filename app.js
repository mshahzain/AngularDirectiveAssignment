var NarrowApp = angular.module("NarrowItDownApp",[]);

NarrowApp.controller("NarrowItDownController", NarrowItDownController);

NarrowApp.service("MenuSearchService", MenuSearchService);

NarrowItDownController.$inject = ["MenuSearchService"];

NarrowApp.directive("foundItems", foundItems);

function foundItems()
{
  var ddo =
  {  //direct definition object
    templateUrl : './foundItems.html'
  };
  return ddo;
}

function NarrowItDownController(MenuSearchService)
{

  var narrow = this;
  narrow.searchTerm= "";
  narrow.displayItems = [];
  narrow.getMatchedMenuItems = function(searchTerm)
  {

    var promise = MenuSearchService.getMenuItems();
    promise.then(function(response)
    {
      var foundItems = [];

      var obj = response.data.menu_items;

      for(let i = 0; i < obj.length; i++)
      {
        if(obj[i].name.includes(narrow.searchTerm))
        {
            foundItems.push(obj[i]);
        }
      }
      console.log(foundItems);
      narrow.displayItems = foundItems;
      return foundItems
    }).catch(function(error){
      console.log("Something went wrong with API");
    });

  }


}

MenuSearchService.$inject = ["$http"];

function MenuSearchService($http)
{
  var service = this;
  service.getMenuItems = function()
  {
    var response = $http({
      method : "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    });

    return response;

  };
};
