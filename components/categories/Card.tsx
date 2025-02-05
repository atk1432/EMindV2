import { StyleSheet, ViewProps, View, Pressable } from "react-native";
import { _Container, _Text, _Image } from "../ultis";
import { Container } from "@shopify/react-native-skia/lib/typescript/src/renderer/Container";
import { Link, router } from "expo-router";

interface _Card extends ViewProps {
  title?: string,
  image?: any
}

export default function Card(props: _Card) {
  return (
    <Pressable onPress={() => {
      router.navigate({ pathname: "/categories/contents/[slug]", params: { slug: 12 } })
    }}>
      <_Container style={ styles.container }>
        <_Image 
          source={ props.image } 
          resizeMode="cover" 
          style={ styles.image }
        />
        <View style={ styles.view2 }>
          <_Text style={ styles.text }>Bài test sức bền</_Text>
          <_Text style={[ styles.text, styles.textDescribe ]}>Tedfsst nhỏ hơn</_Text>
        </View>
        <View>
          <_Text style={[ styles.text, styles.score ]}>32</_Text>
        </View>
      </_Container>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: "#dddddd",
    borderWidth: 1
  },
  text: {
    color: '#85144b'
  },
  view2: {
    flex: 0.8
  },
  textDescribe: {
    fontSize: 13
  },
  score: {
    marginRight: 10,
    fontSize: 26
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10
  }
})