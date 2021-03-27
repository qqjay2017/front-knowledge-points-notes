SELECT
	salaries.emp_no,
	AVG( salaries.salary ) AS avg,
	employees.first_name,
	employees.last_name 
FROM
	salaries
	LEFT JOIN employees AS employees ON employees.emp_no = salaries.emp_no 
GROUP BY
	emp_no 
ORDER BY
	avg DESC 
	LIMIT 10;
SELECT
	* 
FROM
	employees 
WHERE
	emp_no = 109334;
SELECT
	SUM( salaries.salary ) AS salaryCount 
FROM
	salaries;
SELECT
	SUM( salaries.salary ) AS salaryCount 
FROM
	salaries 
WHERE
	salaries.emp_no = 10001;
SELECT
	MAX( salaries.salary ) AS max,
	MIN( salaries.salary ) AS min,
	salaries.emp_no 
FROM
	salaries 
GROUP BY
	salaries.emp_no;
SELECT
	emp_no,
	AVG( salary ) AS avg 
FROM
	salaries 
GROUP BY
	emp_no;
SELECT
	COUNT( * ) AS COUNT,
	AVG( salaries.salary ),
	MAX( salaries.salary ) AS max,
	MIN( salaries.salary ) AS min,
	salaries.emp_no 
FROM
	salaries 
GROUP BY
	salaries.emp_no;# 平均大于 54000 的
SELECT
	COUNT( * ) AS COUNT,
	AVG( salaries.salary ) AS avg,
	MAX( salaries.salary ) AS max,
	MIN( salaries.salary ) AS min,
	salaries.emp_no 
FROM
	salaries 
GROUP BY
	salaries.emp_no 
HAVING
	avg > 100000;