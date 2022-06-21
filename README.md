# Assignment-from-V_Coders-
#Author Name - Amit kumar

#Run 
git clone https://github.com/amitec9/Assignment-from-V_Coders-.git
cd Assignment-from-V_Coders-
npm i
npm run dev or node index.js

1. get the list of all the students
Router type GET http://localhost:4000/student

2. get the list of a particular student
Router type GET http://localhost:4000/studentname?name=Amit

3. add a new student to the list
Router type POST http://localhost:4000/student
body send josn data e.g:- {
"name": "Rohan kumar",
"class": "M.E",
"rollNo": 14,
"age": 27
}

4. update the age of a particular student
Router type PUT http://localhost:4000/student/7
body send josn data e.g:-{
      
      "age": 40
     
}

5. delete a particular student based on the age
Router type DELETE http://localhost:4000/student
body send josn data e.g:-{
     "age": 40
     }
     
6. Filter the students based on the age. Let's say you want to filter the students whose age is greater than 20
Router type GET http://localhost:4000/studentFliter?age=20

7. write an api to get the average age of the students
Router type GET http://localhost:4000/studentaverage



Thank You
