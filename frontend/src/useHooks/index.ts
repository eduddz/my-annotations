import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export const useApi = () => ({
    add: async(task: string, color: string, clicked: number, id_users: string) => {
        const response = await api.post("/add-task", {
            task, color, clicked, id_users
        });

        return response.data[0];
    },
    showTask: async(id_users: string) => {
        const response = await api.post("/my-tasks", {
            id_users
        });
        
        return response.data;
    },
    register: async(name: string, email: string, password: string) => {
        const response = await api.post("/add-user", {
            name, email, password
        });

        return response.data;
    },
    login: async(email: string, password: string) => {
        const response = await api.post("/my-user", {
            email, password
        });

        return response.data[0];
    },
    deleteTask: async(id_tasks: number) => {
        const response = await api.delete("/delete-task", {
            data: { 
                id_tasks
            }
        });

        return response.data[0];
    },
    patchTasksTask: async(task: string, id_tasks: number) => {
        const response = await api.patch("/patch-tasks-task", {
            task, id_tasks
        });

        return response.data[0];
    },
    patchTasksClicked: async(clicked: number, id_tasks: number) => {
        const response = await api.patch("/patch-tasks-clicked", {
            clicked, id_tasks
        });

        return response.data[0];
    }
});

api.defaults.headers.common["accept"] = "*/*";