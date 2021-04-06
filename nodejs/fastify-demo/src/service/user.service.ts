import prisma from "../utils/database";

class UserService {
    async index(){

    //    const employees =  await prisma.$queryRaw`
    //    SELECT
    //         emp.emp_no,
    //         emp.birth_date,
    //         emp.first_name,
    //         emp.gender,
    //         dep.dept_name
    //         FROM
    //         employees AS emp 
    //         JOIN ( SELECT emp_no,dept_name FROM dept_emp INNER JOIN departments ON dept_emp.dept_no = departments.dept_no ) 
    //         dep ON emp.emp_no = dep.emp_no  LIMIT 10 OFFSET 0;
    //    `
    //    

    const employees = await prisma.employees.findMany({
        where:{
            emp_no:10048
        },
        include:{
            titles:true,
            salaries:true,
            departments:true
        }
    })

    return employees
    }
}
const userService = new UserService()

export default userService