import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function Notification({ newMessage }) {
  const [offset] = useState(new Animated.Value(100)); // 알림창 초기 위치 설정

  useEffect(() => {
    if (newMessage.length > 0) {
      // 알림창이 나타날 때 애니메이션 실행
      Animated.timing(offset, {
        toValue: 0,
        duration: 500, // 애니메이션 지속시간 (0.5초)
        useNativeDriver: true,
      }).start();

      // 3초 후에 알림창 숨기기
      const timer = setTimeout(() => {
        Animated.timing(offset, {
          toValue: 100, // 알림창이 완전히 사라지도록 상위로 위치시킴
          duration: 500, // 애니메이션 지속시간 (0.5초)
          useNativeDriver: true,
        }).start();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [newMessage, offset]);

  return (
    <Animated.View style={[styles.notification, { transform: [{ translateY: offset }] }]}>
      {newMessage.map((item, index) => (
        <View key={index} style={{ flexDirection: 'row', margin: 10 }}>
          <Text style={{ color: 'white' }}>{item[0]}님이 </Text>
          <Text style={{ color: 'yellow' }}>{item[1]}을/를 </Text>
          <Text style={{ color: 'white' }}>잡았습니다.</Text>
        </View>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    bottom: 100,
    left: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 10,
  },
});
