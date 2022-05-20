import { Client } from "./Client";

export interface ClientList{
    clients: Array<Client>,
    correcto: boolean,
    error: string
}