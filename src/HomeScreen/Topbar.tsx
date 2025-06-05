import {useWindowDimensions} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useScrollViewOffset,
  withSpring,
} from 'react-native-reanimated';

const Topbar = () => {
  const {width, height} = useWindowDimensions();
  const testData: string[] = ['red', 'blue', 'orange'];

  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const scrollViewOffset = useScrollViewOffset(scrollViewRef);

  const translateY = useDerivedValue(() => {
    console.log(Math.min(Math.max(scrollViewOffset.value, 0), height * 0.05));

    return Math.min(Math.max(scrollViewOffset.value, 0), height * 0.05);
  });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: withSpring(-translateY.value)}],
  }));

  return (
    <Animated.ScrollView
      style={{
        width: width,
        backgroundColor: 'orange',
        flexDirection: 'column',
      }}
      stickyHeaderIndices={[0]}
      ref={scrollViewRef}>
      <Animated.View
        style={[
          {
            width: width,
            height: height * 0.5,
            backgroundColor: 'yellow',
            position: 'absolute',
            top: 0,
            zIndex: 1,
          },
          animatedStyles,
        ]}
      />
      {testData.map(color => {
        return (
          <Animated.View
            style={{
              width,
              height: height,
              backgroundColor: color,
            }}
            key={color}
          />
        );
      })}
    </Animated.ScrollView>
  );
};

export default Topbar;
