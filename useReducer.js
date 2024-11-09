import React, { useReducer } from 'react';
import { View, FlatList, Button, Text } from 'react-native';

const initialState = {
  data: [{ id: 1, value: 'Default Item' }],
};

let nextId = 2;

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { data: [...state.data, { id: nextId++, value: action.payload }] };
    case 'DELETE':
      return { data: state.data.filter(item => item.id !== action.payload) };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = () => {
    const newItem = `Item ${state.data.length + 1}`;
    dispatch({ type: 'ADD', payload: newItem });
  };

  const deleteItem = (id) => {
    if (state.data.length > 0) {
      dispatch({ type: 'DELETE', payload: id });
    }
  };

  return (
    <View>
      <Button title="Add Item" onPress={addItem} />
      <FlatList
        data={state.data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:10, marginBottom:10}}>
            <Text style={{height:30, paddingLeft:10, width:250, borderRadius:20, borderWidth:1}}>{item.value}</Text>
            <Button title="Delete" onPress={() => deleteItem(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default App;