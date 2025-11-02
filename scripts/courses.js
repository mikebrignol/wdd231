const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation, inheritance, and polymorphism.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites using JavaScript.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students focus on UX, accessibility, and API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const buttons = document.querySelectorAll('.buttons button');
const coursesContainer = document.querySelector('.courses');

function displayCourses(courseList) {
    coursesContainer.innerHTML = ''; 

    courseList.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');

   
        if (course.completed) {
            courseCard.style.backgroundColor = '#1f4a7a'; 
            courseCard.style.opacity = '0.8';
        } else {
            courseCard.style.backgroundColor = ''; 
            courseCard.style.opacity = '1';
        }

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
        `;
        coursesContainer.appendChild(courseCard);
    });

    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);

    const totalCreditsP = document.getElementById('total-credits');
    totalCreditsP.textContent = `The total credits for courses listed above is: ${totalCredits}`;

}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.textContent.trim();
        if (filter === 'All') {
            displayCourses(courses);
        } else {
            const filtered = courses.filter(c => c.subject === filter);
            displayCourses(filtered);
        }
    });
});

displayCourses(courses);
