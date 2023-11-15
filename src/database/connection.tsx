import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { DataSource } from "typeorm";
import { TodoModel } from './entities/todo.entity';
import { Migrate1700080465419 } from './migrations/1700080465419-migrate';
import { TodosRepository } from "./todo.repository";

interface DatabaseConnectionContextData {
  todosRepository: TodosRepository;
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData,
);

type Props = {
  children: ReactNode
}

export const DatabaseConnectionProvider: React.FC<Props> = ({ children }) => {
  const [connection, setConnection] = useState<any>(null);

  const connect = useCallback(async () => {
    const datasource = new DataSource({
      type: 'expo',
      database: 'todos.db',
      driver: require('expo-sqlite'),
      entities: [TodoModel],
      migrations: [Migrate1700080465419],
      migrationsRun: true,
      synchronize: false,

    });

    const init = await datasource.initialize();

    setConnection(init);
  }, []);

  useEffect(() => {
    if (!connection) {
      connect();
    }
  }, [connect, connection]);

  if (!connection) {
    return <ActivityIndicator />;
  }

  return (
    <DatabaseConnectionContext.Provider
      value={{
        todosRepository: new TodosRepository(connection),
      }}
    >
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

export function useDatabaseConnection() {
  const context = useContext(DatabaseConnectionContext);

  return context;
}