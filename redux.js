// App.js
import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore } from 'redux';
import { View, FlatList, Button, Text } from 'react-native';



const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';


let nextId = 2;
const addItem = (value) => ({
  type: ADD_ITEM,
  payload: { id: nextId++, value },
});

const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: id,
});


const initialState = [{ id: 1, value: 'Default Item' }];
function dataReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, { id: action.payload.id, value: action.payload.value }];
    case DELETE_ITEM:
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
}


const store = createStore(dataReducer);


const AppContent = () => {
  const data = useSelector(state => state);
  const dispatch = useDispatch();

  const handleAddItem = () => {
    const newItem = `Item ${data.length + 1}`;
    dispatch(addItem(newItem));
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <View>
      <Button title="Add Item" onPress={handleAddItem} />
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 10 }}>
            <Text style={{ height: 30, paddingLeft: 10, width: 250, borderRadius: 20, borderWidth: 1 }}>
              {item.value}
            </Text>
            <Button title="Delete" onPress={() => handleDeleteItem(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
