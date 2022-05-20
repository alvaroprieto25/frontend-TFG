import { Budget } from "./Budget";

export interface BudgetList{
    budgets: Array<Budget>,
    correcto: boolean,
    error: string
}