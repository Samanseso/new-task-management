export interface UserType {
    _id: string;
    name: string;
    email: string;
    role: string;
}


export interface ProjectType {
    _id: string;
    title: string,
    description: string,
    createdBy: UserType,
    members: [{ 
        data: UserType,
        assignedAt: string,
        assignedBy: UserType
    }], 
    dueDate: string;
    status: string;
    comments: CommentType[];
    createdAt: string;
}

export interface ProjectInputType {
    _id: string;
    title: string,
    description: string,
    createdBy: string,
    members: { 
        data: string,
        assignedBy: string
    }[], 
    dueDate: string;
    status: string;
}

export interface CommentType {
    createdBy: UserType; 
    text: String;
    createdAt: string;
    _id: string;
    replies: {
        createdBy: UserType; 
        text: String;
        createdAt: string;
        _id: string;
    }[];
}

export interface SubtaskType {
    text: string, 
    checked: boolean, 
    _id: string 
}


export interface SubtasksStatusType {
    total: number;
    completed: number;
    percent: number;
}


export interface TaskType {
    projectId: string;
    comments: CommentType[];
    subtasks: SubtaskType[]
    dueDate: string;
    createdAt: string;
    createdBy: UserType;
    description: string;
    priority: string;
    status: string;
    title: string;
    _id: string;
    assignedTo: UserType[];
}

export interface InputTaskType {
    projectId: string;
    subtasks: { text: string }[];
    dueDate: string;
    createdAt: string;
    createdBy: string;
    description: string;
    priority: string;
    status: string;
    title: string;
    _id: string;
    assignedTo: string[];
}

export interface LogType {
    entity: string;
    documentId: string;
    title: string;
    action: string;
    performedBy: UserType;
    description: string;
    data: {
        oldValue: string,
        newValue: string,
    },
    createdAt: string; 
}


export interface BreadcrumbsType {
    path: string;
    text: string;
}

