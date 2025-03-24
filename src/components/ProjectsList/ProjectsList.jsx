import { useContext, useState, useEffect } from 'react';
import './ProjectsList.css';

// ASSETS
import LikedFilled from '../../assets/like-filled.svg';
import LikedOutline from '../../assets/like.svg';

// COMPONENTS
import Button from '../Button/Button';

//CONTEXT
import { AppContext } from '../../contexts/AppContext';

// UTILS
import { getApiData } from '../../services/apiServices';

function ProjectsList() {
    const [projects, setProjects] = useState([]);
    const [favProjects, setFavProject] = useState([]);
    const appContext = useContext(AppContext);

    const handleSavedProjects = (id) => {
        setFavProject((prevFavProjects) => {
            if (prevFavProjects.includes(id)) {
                const filterArray = prevFavProjects.filter((projectId) => projectId !== id);
                sessionStorage.setItem('favProjects', JSON.stringify(filterArray));
                return filterArray;
            } else {
                const newFavProjects = [...prevFavProjects, id];
                sessionStorage.setItem('favProjects', JSON.stringify(newFavProjects));
                return newFavProjects;
            }
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsResponse = await getApiData('projects');
                setProjects(projectsResponse);
            } catch {
                setProjects([]);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const savedFavProjects = JSON.parse(sessionStorage.getItem('favProjects'));
        if (savedFavProjects) {
            setFavProject(savedFavProjects);
        }
    }, []);

    return (
        <div className="projects-section">
            <div className="projects-hero">
                {appContext.languages && appContext.languages[appContext.language] && (
                    <>
                        <h2>{appContext.languages[appContext.language].projects.title}</h2>
                        <p>{appContext.languages[appContext.language].projects.subtitle}</p>
                    </>
                )}
            </div>
            <div className="projects-grid">
                {projects &&
                    projects.map((project) => (
                        <div className="project-card d-flex jc-center al-center fd-column" key={project.id}>
                            <div
                                className="thumb tertiary-background"
                                style={{ backgroundImage: `url(${project.thumb})` }}
                            ></div>
                            <h3>{project.title}</h3>
                            <p>{project.subtitle}</p>
                            <Button buttonStyle="unstyled" onClick={() => handleSavedProjects(project.id)}>
                                <img
                                    src={favProjects.includes(project.id) ? LikedFilled : LikedOutline}
                                    alt=""
                                    height="20px"
                                />
                            </Button>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default ProjectsList;
