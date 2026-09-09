const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the basic concepts of program development in a high-level language.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to markup languages such as HTML5 and CSS3.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students become more proficient in writing functions and procedural code.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces the concepts of object-oriented programming.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students will learn to create dynamic websites using JavaScript.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course focuses on user experience, accessibility, and dynamic content generation.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const coursesContainer = document.getElementById('courses-container');
    const totalCreditsEl = document.getElementById('total-credits');
    const allBtn = document.getElementById('all-btn');
    const cseBtn = document.getElementById('cse-btn');
    const wddBtn = document.getElementById('wdd-btn');

    function displayCourses(filteredCourses) {
        coursesContainer.innerHTML = '';
        
        filteredCourses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.className = `course-card ${course.completed ? 'completed' : ''}`;
            courseDiv.innerHTML = `<span>${course.subject} ${course.number}</span>`;
            coursesContainer.appendChild(courseDiv);
        });

        // Calculate credits using reduce
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        totalCreditsEl.textContent = `Total Credits Required: ${totalCredits}`;
    }

    function setActiveButton(activeBtn) {
        [allBtn, cseBtn, wddBtn].forEach(btn => btn.classList.remove('active-filter'));
        activeBtn.classList.add('active-filter');
    }

    allBtn.addEventListener('click', () => {
        displayCourses(courses);
        setActiveButton(allBtn);
    });

    cseBtn.addEventListener('click', () => {
        const cseCourses = courses.filter(course => course.subject === 'CSE');
        displayCourses(cseCourses);
        setActiveButton(cseBtn);
    });

    wddBtn.addEventListener('click', () => {
        const wddCourses = courses.filter(course => course.subject === 'WDD');
        displayCourses(wddCourses);
        setActiveButton(wddBtn);
    });

    // Initial Render
    displayCourses(courses);
});