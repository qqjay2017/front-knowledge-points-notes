interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  // 交叉类型会使用共同属性
  console.log("Name: " + emp.name);

  if("privileges" in emp){  // 类型收窄到Admin
    console.log("privileges: "+ emp.privileges)
  }

  if("startDate" in emp){   // 类型收窄到Employee
    console.log("StartDate: "+ emp.startDate)
  }
}

export {}
