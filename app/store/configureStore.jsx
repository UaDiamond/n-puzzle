import * as Redux from 'redux';
import reducer from 'reducers';


const defaultState = {
    gameSize: null,
    movesCount: null,
    startTime: null,
    tiles: [],
    wonGame: null
};

const configure = function(initialState = defaultState) {
    return Redux.createStore(reducer, initialState, Redux.compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
};


export default configure;