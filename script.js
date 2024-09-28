const groupForm = document.getElementById('groupForm');
const studentForm = document.getElementById('studentForm');
const studentFormContainer = document.getElementById('studentFormContainer');
const studentListContainer = document.getElementById('studentListContainer');
const groupTable = document.getElementById('groupTable').querySelector('tbody');
const studentFields = document.getElementById('studentFields');
const studentTable = document.getElementById('studentTable').querySelector('tbody');

let currentGroup = '';
let groups = [];

groupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const groupName = document.getElementById('groupName').value;
    const studentCount = parseInt(document.getElementById('studentCount').value);

    // Agregar grupos
    groups.push({ groupName: groupName, studentCount: studentCount, students: [] });

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${groupName}</td>
        <td>
            <button class="btn btn-info" onclick="showStudentForm('${groupName}', ${studentCount})">Agregar Alumnos</button>
            <button class="btn btn-warning" onclick="showStudentList('${groupName}')">Ver Alumnos</button>
        </td>
    `;
    groupTable.appendChild(newRow);

    groupForm.reset();
});

function showStudentForm(groupName, studentCount) {
    currentGroup = groupName;
    studentFields.innerHTML = '';

    
    const group = groups.find(g => g.groupName === groupName);

    for (let i = 1; i <= studentCount; i++) {
        const field = document.createElement('div');
        field.classList.add('mb-3');
        field.innerHTML = `
            <label for="student${i}" class="form-label">Nombre del Alumno ${i}</label>
            <input type="text" id="student${i}" class="form-control" value="${group.students[i - 1] || ''}" required>
        `;
        studentFields.appendChild(field);
    }


    studentFormContainer.style.display = 'block';
    studentListContainer.style.display = 'none';
}

studentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const group = groups.find(g => g.groupName === currentGroup);
    group.students = []; 

    
    for (let i = 0; i < studentFields.children.length; i++) {
        const studentName = document.getElementById(`student${i + 1}`).value;
        group.students.push(studentName);
    }

    displayStudentList(group.students);
    
    
    studentFormContainer.style.display = 'none';
    studentListContainer.style.display = 'block';
});

function showStudentList(groupName) {
    
    const group = groups.find(g => g.groupName === groupName);
    displayStudentList(group.students);

    
    studentFormContainer.style.display = 'none';
    studentListContainer.style.display = 'block';
}

function displayStudentList(students) {
    studentTable.innerHTML = '';

    
    students.forEach(studentName => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${studentName}</td>`;
        studentTable.appendChild(newRow);
    });
}
