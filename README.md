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
        <DropdownMenu style={{flex: 1}}
          arrowImg={require('./img/arrow.png')}      //set the arrow icon, default is a triangle
          checkImage={require('./img/check.png')}    //set the icon of the selected item, default is a check mark
          bgColor={"red"}                            //the background color of the head, default is grey
          tintColor={"white"}                        //the text color of the head, default is white
          selectItemColor={"red"}                    //the text color of the selected item, default is red
          data={data}                                
          maxHeight={410}                            // the max height of the menu
          handler={(selection, row) => alert(data[selection][row])} >

          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
            <Text>
              Your own view Here
            </Text>
          </View>

        </DropdownMenu>
      </View>
    );
  }
```
