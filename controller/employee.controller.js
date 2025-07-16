import { Employee } from "../models/employee.model";

export const createEmployee = async (req, res) => {
    try {
        
    } catch (error) {
        console.error(`Error creating employee: ${error.message}`);
        res.status(500).json({ message: "Internal server error" });
    }
}