# react-native-dropdown-menu

A `<DropdownMenu>` component for react-native.It is very easy to use.

 ![image](https://github.com/WheelerLee/react-native-dropdown-menu/blob/master/screenshot.gif?raw=true)

## Install
```shell
npm i --save react-native-dropdown-menu
```

## Usage
```js
var DropdownMenu = require('react-native-dropdown-menu');

var Demo = React.createClass({

  render() {
    var data = [["C", "Java", "JavaScript"], ["Python", "Ruby"], ["Swift", "Objective-C"]];
    return (
      <View style={{flex: 1}} >
        <DropdownMenu style={{flex: 1}} data={data} maxHeight={410}
          handler={(selection, row) => alert(data[selection][row]} >
          ...
        </DropdownMenu>
      </View>
    );
  }
```
