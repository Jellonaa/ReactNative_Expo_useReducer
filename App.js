import { Button, FlatList, StyleSheet, TextInput, View, Text } from 'react-native'
import { useReducer, useState } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, {text: action.task}]
    case "REMOVE":
      return state.filter((todo, index) => index !== action.index)
    default:
      return state
  }
}

export default function App() {
  const [task, setTask] = useState('')
  const [todos, dispatch] = useReducer(reducer, [])

  const renderItem = ({item, index}) => {
    return (
      <Text
        key={index}
        onPress={() => handleRemoveTodo(index)}
        style={styles.row}
      >
        {item.text}
      </Text>
    )
  }

  const handleAddTodo = (task) => {
    if (task !== '') {
      dispatch({ type: 'ADD', task })
    }
  }

  const handleRemoveTodo = (index) => {
    dispatch({ type: 'REMOVE', index })
  }

  return (
    <View style={styles.container}>
      <View style={styles.add}>
        <TextInput placeholder="Add new..." value={task} onChangeText={text => setTask(text)} />
        <Button title="Save" onPress={() => handleAddTodo(task)} />
      </View>
      <FlatList data={todos} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 32
  },
  row: {
    padding: 8
  },
});
