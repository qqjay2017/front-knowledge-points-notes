function printEmployeeInformation(emp) {
    // 交叉类型会使用共同属性
    console.log("Name: " + emp.name);
    if ("privileges" in emp) { // 类型收窄到Admin
        console.log("privileges: " + emp.privileges);
    }
    if ("startDate" in emp) { // 类型收窄到Employee
        console.log("StartDate: " + emp.startDate);
    }
}
export {};
//# sourceMappingURL=1.in%E5%85%B3%E9%94%AE%E5%AD%97.js.map