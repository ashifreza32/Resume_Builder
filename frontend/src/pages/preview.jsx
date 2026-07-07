import  { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {ArrowLeft} from 'lucide-react'
import API from '../config/API'
import ResumePreview from '../components/ResumePreview'
import Loader from '../components/Loader'

const Preview = () => {
    const { id } = useParams()
    const [resumeData, setResumeData] = useState(null)
    const [loading, setLoading] = useState(true)

    const loadResume = async () => {
        try {
            const { data } = await API.get(`/api/resumes/public/${id}`)
            setResumeData(data.resume)
        } catch (error) {
            console.log("Resume not found")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadResume() }, [id])

    if (loading) return <Loader />
    if (!resumeData) return <div className="text-center mt-20">Resume Not Found <br/> <Link to="/" className="text-blue-500">Go Home</Link></div>

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <ResumePreview data={resumeData} template={resumeData.template} ascentColor={resumeData.asentColor} />
        </div>
    )
}

export default Preview