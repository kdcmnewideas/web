import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { GOALS } from "@/mockData";
import { Goal, ScreenName } from "@/types/types";
import { router } from "expo-router";
import {
    ArrowLeft,
    Calendar,
    Edit3,
    Plus,
    Target,
    Trash2,
} from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { useUniwind } from "uniwind";

const Goals = () => {
  const { theme } = useUniwind();
  const [goals, setGoals] = useState<Goal[]>(GOALS);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Goal>>({
    title: "",
    target: 0,
    current: 0,
    unit: "",
    deadline: "",
  });

  const handleAdd = () => {
    if (!formData.title || !formData.target) return;

    const newGoal: Goal = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      target: Number(formData.target),
      current: Number(formData.current || 0),
      unit: formData.unit || "units",
      deadline: formData.deadline,
    };

    setGoals([...goals, newGoal]);
    setIsAdding(false);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const startEdit = (goal: Goal) => {
    setEditingId(goal.id);
    setFormData(goal);
  };

  const saveEdit = () => {
    if (!formData.title || !formData.target) return;

    setGoals(
      goals.map((g) =>
        g.id === editingId ? ({ ...g, ...formData } as Goal) : g
      )
    );
    setEditingId(null);
    setFormData({});
  };

  const FormView = ({
    onSave,
    onCancel,
  }: {
    onSave: () => void;
    onCancel: () => void;
  }) => (
    <Card className="mb-6 border-primary border-2 p-6">
      <Text className="font-bold mb-4">
        {editingId ? "Edit Goal" : "New Goal"}
      </Text>
      <View className="space-y-4">
        <Label>Goal Title</Label>
        <Input
          placeholder="e.g. Master Calculus"
          value={formData.title}
          onChangeText={(e) => setFormData({ ...formData, title: e })}
        />
        <View className="grid grid-cols-2 gap-4">
          <Label>Target Value</Label>
          <Input
            placeholder="100"
            value={(formData.target || 0).toString()}
            onChangeText={(e) =>
              setFormData({ ...formData, target: Number(e) })
            }
          />
          <Label>Unit</Label>
          <Input
            placeholder="hrs, %, chapters"
            value={formData.unit}
            onChangeText={(e) => setFormData({ ...formData, unit: e })}
          />
        </View>
        <View className="grid grid-cols-2 gap-4">
          <Label>Current Progress</Label>
          <Input
            value={(formData.current || 0).toString()}
            onChangeText={(e) =>
              setFormData({ ...formData, current: Number(e) })
            }
          />
          <Label>Deadline (Optional)</Label>
          <Input
            value={formData.deadline}
            onChangeText={(e) => setFormData({ ...formData, deadline: e })}
          />
        </View>
        <View className="flex gap-3 justify-end pt-2">
          <Button variant="secondary" onPress={onCancel}>
            <Text>Cancel</Text>
          </Button>
          <Button onPress={onSave}>
            <Text>{editingId ? "Update" : "Create Goal"}</Text>
          </Button>
        </View>
      </View>
    </Card>
  );

  function onNavigate(PROFILE: ScreenName) {
    router.push(PROFILE);
  }

  return (
    <View className="max-w-4xl mx-auto gap-6 animate-fade-in pb-20 w-full">
      <View className="flex flex-row items-center justify-between mb-2">
        <View className="flex flex-row items-center gap-4">
          <Button
            variant="ghost"
            onPress={() => onNavigate(ScreenName.PROFILE)}
            className="-ml-2"
          >
            <ArrowLeft size={20} color={theme === "dark" ? "#fff" : "#000"} />
          </Button>
          <Text className="text-2xl font-bold">Learning Goals</Text>
        </View>
        {!isAdding && !editingId && (
          <Button
            onPress={() => {
              setIsAdding(true);
              setFormData({ title: "", target: 0, current: 0, unit: "" });
            }}
          >
            <Plus size={16} color={"#fff"} />
            <Text>Add Goal</Text>
          </Button>
        )}
      </View>

      {isAdding && (
        <FormView onSave={handleAdd} onCancel={() => setIsAdding(false)} />
      )}

      <View className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) =>
          editingId === goal.id ? (
            <View className="md:col-span-2" key={goal.id}>
              <FormView onSave={saveEdit} onCancel={() => setEditingId(null)} />
            </View>
          ) : (
            <Card key={goal.id} className="relative group p-6">
              <View className="flex flex-row justify-between items-start">
                <View className="bg-indigo-50 p-2 rounded-lg text-primary">
                  <Target size={24} />
                </View>
                <View className="flex flex-row gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant={"ghost"}
                    onPress={() => startEdit(goal)}
                    className="p-2"
                  >
                    <Edit3
                      size={16}
                      color={theme === "dark" ? "#fff" : "#000"}
                    />
                  </Button>
                  <Button
                    variant={"ghost"}
                    onPress={() => handleDelete(goal.id)}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-400/30"
                  >
                    <Trash2 size={16} color={"#fb2c36"} />
                  </Button>
                </View>
              </View>

              <Text className="font-bold text-lg">{goal.title}</Text>
              {goal.deadline && (
                <Text className="text-xs text-slate-400 dark:text-slate-300 flex items-center">
                  <Calendar
                    className="mr-1"
                    color={theme === "dark" ? "#cad5e2" : "#90a1b9"}
                    size={12}
                  />
                  <Text> </Text>
                  Due {new Date(goal.deadline).toLocaleDateString()}
                </Text>
              )}

              <View className="flex justify-between items-end">
                <Text className="text-slate-500 font-medium">
                  {goal.current} / {goal.target} {goal.unit}
                </Text>
                <Text className="text-xl font-bold text-primary">
                  {Math.round((goal.current / goal.target) * 100)}%
                </Text>
              </View>

              <View className="w-full bg-slate-100 rounded-full h-2">
                <View
                  className={`h-full rounded-full ${
                    goal.current / goal.target >= 1
                      ? "bg-green-500"
                      : "bg-primary"
                  }`}
                  style={{
                    width: `${Math.min(100, (goal.current / goal.target) * 100)}%`,
                  }}
                />
              </View>
            </Card>
          )
        )}

        {goals.length === 0 && !isAdding && (
          <View className="col-span-full text-center py-12 text-slate-400 bg-muted rounded-2xl border border-dashed border-border items-center">
            <Target
              className="mx-auto mb-3 opacity-20"
              color={"90a1b9"}
              size={48}
            />
            <Text className="text-slate-400">
              No goals set yet. Create one to track your progress!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Goals;
