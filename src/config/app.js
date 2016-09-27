var Controller = {
  add: function(controllerName, actions){
    var c = this;
    Object.keys(actions).forEach(function(action){
        c[controllerName + "#" + action] = actions[action];
    })
  }
}
var Views = {
  add: function(key, component){
    this[key] = React.createClass(component);
  }
}
var Routes = {
  construct: {},
  add: function(key, action){
    this.construct[key] = {
      component: Views[action],
      action: Controller[action]
    }
  }
}

var App = {
  Views: Views,
  Controller: Controller,
  Routes: Routes,
  start: function(){
    Object.keys(this.Routes.construct).forEach(function(key){
      page(key, function(){
        var component = this.Routes.construct[key].component;
        var controllerAction = this.Routes.construct[key].action;
        if(controllerAction){
            controllerAction();
        }
        ReactDOM.render(React.createElement(component), document.querySelector("#app"));
      });
    })
    page()
  }
}
