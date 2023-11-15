import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { DatabaseConnectionProvider } from './database/connection';
import TodoList from './todolist';

export default function App() {
  return (
    <DatabaseConnectionProvider>
      <StatusBar style="auto" />
       <SafeAreaView style={{ flex: 1 }}>
        <TodoList />
      </SafeAreaView>
    </DatabaseConnectionProvider>
  );
}

