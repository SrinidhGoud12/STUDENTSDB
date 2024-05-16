const apiUrl = 'http://localhost:3000/students';
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');
let updateId = null;
async function fetchStudents() {
    const response = await fetch(apiUrl);
    const students = await response.json();
    studentTableBody.innerHTML = '';
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>
                <button onclick="editStudent(${student.id})"><i class="fa fa-edit" style="font-size:20px"></button>
                <button onclick="deleteStudent(${student.id})"><i class="fa fa-trash-o" style="font-size:20px"></button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Add student
async function addStudent() {
    const id = document.getElementById('studentId').value
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const course = document.getElementById('course').value;
    await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({ id, name, age, course })
    });
    studentForm.reset();
    fetchStudents();
}

// Update student
async function updateStudent() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const course = document.getElementById('course').value;
    if (updateId) {
        await fetch(`${apiUrl}/${updateId}`, {
            method: 'PUT',
            body: JSON.stringify({ id: updateId, name, age, course })
        });
        studentForm.reset();
        updateId = null;
        fetchStudents();
    }
}

// Edit student
async function editStudent(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const student = await response.json();
    document.getElementById('name').value = student.name;
    document.getElementById('age').value = student.age;
    document.getElementById('course').value = student.course;
    updateId = id;
}

// Delete student
async function deleteStudent(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    fetchStudents();
}