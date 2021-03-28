#### 结果转对象
```
SELECT
	COUNT( 0 ) 
FROM
	employees;
SELECT
	e.emp_no,
	e.birth_date,
	e.first_name,
	e.last_name,
	e.gender ,
	JSON_OBJECT('title',t.title,'from_data',t.from_date,'to_date',t.to_date) title
FROM
	employees e
	LEFT JOIN `titles` AS t ON t.emp_no = e.emp_no;
```

#### 结果转数组


```sql
SELECT
	s.id student_id,
	s.`name` student_name,
	s.age student_age ,
	JSON_ARRAYAGG(JSON_OBJECT('id',c.id,'name',c.`name`,'price',c.price))
FROM
	`students` AS s
	 JOIN `student_course` AS sc ON s.id = sc.student_id
	 JOIN `courses` AS c ON sc.course_id = c.id 
GROUP BY
	s.id;
```