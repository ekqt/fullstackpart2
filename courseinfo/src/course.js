const Course = ({ courses }) => {
    let i = courses.map(course =>
      <div key={course.id}>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
    return (
      <div>
        {i}
      </div>
    )
  }
  
  const Header = ({ course }) => {
    return (
      <div>
        <h1>{course.name}</h1>
      </div>
    )
  }
  
  const Content = ({ course }) => {
    let i = course.parts.map(value => <p key={value.id}>{value.name} {value.exercises}</p>)
    return (
      <div>
        {i}
      </div>
    )
  }
  
  const Total = ({ course }) => {
    let result = course.parts.reduce((sum, value) => sum + value.exercises, 0)
    return (
      <div>
        <p><strong>Total of {result} exercises</strong></p>
      </div>
    )
  }

  export default Course