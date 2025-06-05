import {ScrollView, useWindowDimensions} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedRef,
  useDerivedValue,
  useScrollViewOffset,
} from 'react-native-reanimated';

const MainContainer = () => {
  const {width, height} = useWindowDimensions();
  const testData: string[] = ['red', 'blue', 'orange'];
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const scrollViewOffset = useScrollViewOffset(scrollViewRef);
  const activeIndex = useDerivedValue(() => {
    console.log(Math.floor(scrollViewOffset.value / width));

    return Math.floor(scrollViewOffset.value / width);
  });

  return (
    <ScrollView
      style={{
        width: width,
        // overflow: 'hidden',
        paddingTop: 20,
      }}
      stickyHeaderIndices={[1]}>
      {/* top Headers */}
      <Animated.View
        style={{
          backgroundColor: 'red',
          width: width,
          height: height * 0.4,
        }}
      />
      <Animated.View
        style={{
          backgroundColor: 'yellow',
          width: width,
          height: height * 0.06,
          zIndex: 1,
        }}
      />
      {/* slides */}
      <Animated.ScrollView
        style={{gap: width * 0.1}}
        horizontal={true}
        snapToInterval={width}
        decelerationRate={'fast'}
        scrollEventThrottle={16}
        ref={scrollViewRef}>
        {testData.map(color => {
          return (
            <Animated.View
              style={{
                backgroundColor: color,
                width: width,
                height: height * 2,
              }}
              key={color}
            />
          );
        })}
      </Animated.ScrollView>
    </ScrollView>
  );
};

export default MainContainer;
