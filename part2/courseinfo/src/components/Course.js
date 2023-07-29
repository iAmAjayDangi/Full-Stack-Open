import Header from './Header'
import Content from './Content'

const Course = (props)=>(
    <>
        <Header name={props.course.name} />
        <Content parts={props.course.parts} />
    </>
)

export default Course