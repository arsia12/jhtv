import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'mobx-react';
import { useStores } from './src/store/useStores';

const MobXApp = () => {
    return(
        <Provider store={useStores}>
            <App />
        </Provider>
    )
}


AppRegistry.registerComponent(appName, () => MobXApp);
