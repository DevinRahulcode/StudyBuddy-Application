import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const PRIMARY_COLOR = "#00796B";
const COMPLETED_COLOR = "#B0BEC5";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) setTasks(JSON.parse(storedTasks));
    } catch (error) {
      console.error(error);
    }
  };

  const saveTasks = async (tasksToSave) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasksToSave));
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = { id: Date.now().toString(), text: newTask, completed: false };
    setTasks([task, ...tasks]);
    setNewTask("");
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskRow}>
      <TouchableOpacity onPress={() => toggleComplete(item.id)} style={styles.statusDot}>
        <View
          style={[
            styles.dot,
            { backgroundColor: item.completed ? PRIMARY_COLOR : "#ccc" },
          ]}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.taskText,
          item.completed && { color: COMPLETED_COLOR, textDecorationLine: "line-through" },
        ]}
      >
        {item.text}
      </Text>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <MaterialCommunityIcons name="trash-can-outline" size={24} color="#E53935" />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={["#E0F7FA", "#B2DFDB"]} style={styles.container}>
      <View style={styles.inputBar}>
        <TextInput
          placeholder="Add a new task..."
          placeholderTextColor="#555"
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <MaterialCommunityIcons name="plus" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>📝 My Tasks</Text>
      
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nothing here yet! Add a task 🚀</Text>
        }
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15, paddingTop: 40 },
  inputBar: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  input: { flex: 1, fontSize: 16, color: "#333" },
  addBtn: {
    marginLeft: 12,
    backgroundColor: PRIMARY_COLOR,
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#222" },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 12,
    marginBottom: 8,
  },
  statusDot: { marginRight: 12 },
  dot: { width: 18, height: 18, borderRadius: 9 },
  taskText: { flex: 1, fontSize: 16, color: "#333" },
  emptyText: { textAlign: "center", marginTop: 50, color: "#555", fontSize: 16 },
});
