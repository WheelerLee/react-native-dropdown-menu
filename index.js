'use strict';

import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Image, TouchableOpacity, ScrollView, Animated, Easing, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

class DropdownMenu extends Component {

  constructor(props, context) {
    super(props, context);

    var selectIndex = new Array(this.props.data.length);
    for (var i = 0; i < selectIndex.length; i++) {
      selectIndex[i] = 0;
    }
    this.state = {
      activityIndex: -1,
      selectIndex: selectIndex,
      rotationAnims: props.data.map(() => new Animated.Value(0))
  };

    this.defaultConfig = {
      bgColor: 'grey',
      tintColor: '#333333',
      activityTintColor: "red",
      arrowImg: require('./img/dropdown_arrow.png'),
      checkImage: require('./img/menu_check.png')
    };

  }

  renderChcek(index, title) {
    var activityIndex = this.state.activityIndex;
    if (this.state.selectIndex[activityIndex] == index) {
      var checkImage = this.props.checkImage ? this.props.checkImage : this.defaultConfig.checkImage;
      return (
        <View style={{flex: 1, justifyContent: 'space-between', alignItems: "center", paddingHorizontal: 15, flexDirection: 'row'}} >
    <Text
      style={[
        styles.item_text_style,
        this.props.optionTextStyle,
        {color: this.props.activityTintColor ? this.props.activityTintColor : this.defaultConfig.activityTintColor}
    ]} >
      {title}
    </Text>
      <Image
      source={checkImage}
      style={{tintColor: this.props.activityTintColor ? this.props.activityTintColor : this.defaultConfig.activityTintColor}} />
    </View>
    );
    } else {
      return (
        <View style={{flex: 1, justifyContent: 'space-between', alignItems: "center", paddingHorizontal: 15, flexDirection: 'row'}} >
    <Text style={[
        styles.item_text_style,
        this.props.optionTextStyle,
        {color: this.props.tintColor ? this.props.tintColor : this.defaultConfig.tintColor}
    ]} >{title}</Text>
      </View>
    );
    }
  }

  renderActivityPanel() {
    if (this.state.activityIndex >= 0) {

      var currentTitles = this.props.data[this.state.activityIndex];

      var heightStyle = {};
      if (this.props.maxHeight && this.props.maxHeight < currentTitles.length * 44) {
        heightStyle.height = this.props.maxHeight;
      }

      return (
        <View style={{position: 'absolute', left: 0, right: 0, top: 40, bottom: 0}}>
    <TouchableOpacity onPress={() => this.openOrClosePanel(this.state.activityIndex)} activeOpacity={1} style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
    <View style={{opacity: 0.4, backgroundColor: 'black', flex: 1 }} />
    </TouchableOpacity>

      <ScrollView style={[{position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: 'white'}, heightStyle]} >
      {
        currentTitles.map((title, index) =>
        <TouchableOpacity key={index} activeOpacity={1} style={{flex: 1, height: 44}} onPress={this.itemOnPress.bind(this, index)} >
        {this.renderChcek(index, title)}
      <View style={{backgroundColor: '#F6F6F6', height: 1, marginLeft: 15}} />
      </TouchableOpacity>
      )
      }
    </ScrollView>
      </View>
    );
    } else {
      return (null);
    }
  }

  openOrClosePanel(index) {

    this.props.bannerAction ? this.props.bannerAction() : null;

    // var toValue = 0.5;
    if (this.state.activityIndex == index) {
      this.closePanel(index);
      this.setState({
        activityIndex: -1,
      });
      // toValue = 0;
    } else {
      if (this.state.activityIndex > -1) {
        this.closePanel(this.state.activityIndex);
      }
      this.openPanel(index);
      this.setState({
        activityIndex: index,
      });
      // toValue = 0.5;
    }
    // Animated.timing(
    //   this.state.rotationAnims[index],
    //   {
    //     toValue: toValue,
    //     duration: 300,
    //     easing: Easing.linear
    //   }
    // ).start();
  }

  openPanel(index) {
    Animated.timing(
      this.state.rotationAnims[index],
      {
        toValue: 0.5,
        duration: 300,
        easing: Easing.linear
      }
    ).start();
  }

  closePanel(index) {
    Animated.timing(
      this.state.rotationAnims[index],
      {
        toValue: 0,
        duration: 300,
        easing: Easing.linear
      }
    ).start();
  }

  itemOnPress(index) {
    if (this.state.activityIndex > -1) {
      var selectIndex = this.state.selectIndex;
      selectIndex[this.state.activityIndex] = index;
      this.setState({
        selectIndex: selectIndex
      });
      if (this.props.handler) {
        this.props.handler(this.state.activityIndex, index);
      }
    }
    this.openOrClosePanel(this.state.activityIndex);
  }

  renderDropDownArrow(index) {
    var icon = this.props.arrowImg ? this.props.arrowImg : this.defaultConfig.arrowImg;
    return (
      <Animated.Image
    source={icon}
    style={{
      width:6,
        height:4,
        marginLeft: 8,
        tintColor: (index === this.state.activityIndex) ? (this.props.activityTintColor ? this.props.activityTintColor : this.defaultConfig.activityTintColor) : (this.props.tintColor ? this.props.tintColor : this.defaultConfig.tintColor),
        transform: [{
        rotateZ: this.state.rotationAnims[index].interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        })
      }]
    }} />
  );
  }

  render() {

    return (
      <View style={{flexDirection: 'column', flex: 1}} >
  <View style={{
      flexDirection: 'row',
        backgroundColor: this.props.bgColor ? this.props.bgColor : this.defaultConfig.bgColor}} >
    {
      this.props.data.map((rows, index) =>
      <TouchableOpacity
      activeOpacity={1}
      onPress={this.openOrClosePanel.bind(this, index)}
      key={index}
      style={{flex: 1, height: 48, alignItems: "center", justifyContent: "center"}} >
    <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center"}} >
    <Text
      style={[
        styles.title_style,
        this.props.titleStyle,
        {color: (index === this.state.activityIndex) ?
          (this.props.activityTintColor ? this.props.activityTintColor : this.defaultConfig.activityTintColor)
          :
          (this.props.tintColor ? this.props.tintColor : this.defaultConfig.tintColor)}
    ]} >
      {rows[this.state.selectIndex[index]]}
    </Text>
    {this.renderDropDownArrow(index)}
    </View>
    </TouchableOpacity>
    )
    }
  </View>
    {this.props.children}

    {this.renderActivityPanel()}

  </View>
  );
  }

}

DropdownMenu.propTypes = {
  bgColor: PropTypes.string,
  tintColor: PropTypes.string,
  activityTintColor: PropTypes.string,
  arrowImg: PropTypes.number,
  checkImage: PropTypes.number,
  data: PropTypes.array,
  bannerAction: PropTypes.func,
  optionTextStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  maxHeight: PropTypes.number
}

const styles = StyleSheet.create({
  title_style: {
    fontSize: 14
  },
  item_text_style: {
    color: '#333333',
    fontSize: 14
  }
});

export default DropdownMenu;
