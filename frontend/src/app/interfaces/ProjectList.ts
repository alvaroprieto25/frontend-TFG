import { Project } from "./Project";

export interface ProjectList{
    projects: Array<Project>,
    correcto: boolean,
    error: string
}