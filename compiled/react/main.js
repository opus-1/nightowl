Views.add("Main#index", {
  render: function() {
    return React.createElement("div", null, 
      "here it is" + ' ' +
      "haha" + ' ' +
      "bill" + ' ' +
      "Hellos ", this.props.name
    );
  }
});
