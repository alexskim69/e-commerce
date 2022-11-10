import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper';

export default function Test() {
    return (
        <View>
            <Text>Estamos En test component</Text>
            <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
    Press me
  </Button>
        </View>
    )
}
