import { View } from "react-native";
import { WebView } from 'react-native-webview';

const Browser = ({navigation, route}) => {
    const {uri} = route.params;
    return(
        <View style={{flex: 1}}>
            <WebView source={{uri: uri }}/>
        </View>
    )
}

export default Browser