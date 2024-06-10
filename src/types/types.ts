export interface Task {
    id: string
    title: string
    url: string
    deadline: Date
}

export interface UserInfo {
    email: string
}

export interface User {
    email: string
    password: string
}
