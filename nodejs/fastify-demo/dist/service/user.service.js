"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../utils/database"));
class UserService {
    async index() {
        const employees = await database_1.default.$queryRaw `
       SELECT
            emp.emp_no,
            emp.birth_date,
            emp.first_name,
            emp.gender,
            dep.dept_name
            FROM
            employees AS emp 
            JOIN ( SELECT emp_no,dept_name FROM dept_emp INNER JOIN departments ON dept_emp.dept_no = departments.dept_no ) 
            dep ON emp.emp_no = dep.emp_no  LIMIT 10 OFFSET 0;
       `;
        return employees;
    }
}
const userService = new UserService();
exports.default = userService;
//# sourceMappingURL=user.service.js.map