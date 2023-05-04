function extractUniqueSubjects(jsonData) {
    console.log(`HELPER extractUniqueSubjects: jsonData: `, jsonData);

    // Check if jsonData is a string or an object
    const courses = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

    const subjects = new Set();

    courses.forEach(course => {
        const title = course.title;
        const subject = title.match(/[A-Z]+/)[0];
        subjects.add(subject);
    });

    return Array.from(subjects);
}

module.exports = extractUniqueSubjects;
