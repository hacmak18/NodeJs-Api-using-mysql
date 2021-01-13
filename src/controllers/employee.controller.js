

const EmployeeModel = require('../models/employee.model');

//get all employee
exports.getEmployeeList = (req, res) => {
   // console.log('here all employees list');
   EmployeeModel.getAllEmployees((err,employees)=>{
       console.log('we are here');
       if(err) res.send(err);
       console.log('Employees',employees)
       res.send(employees);
   })
}

//get employee by id
exports.getEmployeeByID = (req,res)=>{
    //console.log('get emp by id');
    EmployeeModel.getEmployeeByID(req.params.id,(err,employee)=>{
        if(err)
        res.send(err);
        console.log('single employee data',employee);
        res.send(employee);
    })
}

//Create employee by ID
exports.createNewEmployee = (req,res)=>{
    console.log('req data',req.body);
    const employeeReqData = new EmployeeModel(req.body);
    //check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success:false,message:'please fill all fields'});
    }else{
        console.log('valid data');
        EmployeeModel.createEmployee(employeeReqData,(err,employee)=>{
            if(err)
            res.send(err);
            res.json({status:true,message:'Employee created successfully',data:employee})
            
        })
    }
}

//update employee
exports.updateEmployee = (req,res)=>{
    console.log('req data',req.body);
    const employeeReqData = new EmployeeModel(req.body);
    //check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success:false,message:'please fill all fields'});
    }else{
        console.log('valid data');
        EmployeeModel.updateEmployee(req.params.id,employeeReqData,(err,employee)=>{
            if(err)
            res.send(err);
            res.json({status:true,message:'Employee updated successfully',data:employee})
            
        })
    }
}

//delete employee
exports.deleteEmployee=(req,res)=>{
    EmployeeModel.deleteEmployee(req.params.id,(err,employee)=>{
        if(err)
        res.send(err);
        res.json({success:true,message:'Employee deleted successfully!'});
    })
}