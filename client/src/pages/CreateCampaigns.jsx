import design from "../assets/create-project-design.svg";

export default function CreateCampaings() {


    return (
        <div className="flex flex-col">

            <div>
                <p>Bring Your Idea to Life</p>
                <p>Turn your project, idea or event into real impact. Share your version with the community and 
                    get the support you need to grow.</p>
            </div>

            <div className="flex">

                <div>
                    <img src={design} alt="Create project page design" />
                </div>

                <div>
                    
                    <form >

                        <p>Project Details</p>

<div></div>
                        <label htmlFor="projectName">Project Name</label>
                        <input type="text" name="project" id="projectName" required/>

                        <label htmlFor="projectCategory">Category</label>
                        <select name="categories" id="projectCategory" required>
                            <option value="">Select a category</option>
                            <option value="Arts">Arts</option>
                            <option value="Technology">Technology</option>
                            <option value="Music">Music</option>
                            <option value="Film">Film</option>
                        </select>

                        <label htmlFor="projectDescription">Short Description</label>
                        <textarea name="description" id="projectDescription" cols="30" rows="10" required />

                        <p>More Information</p>

                        <p>Project Type</p>

                        
                        <input type="radio" name="type" id="projectType" value="Funding for Startup" />
                        <label htmlFor="projectType">Funding for Startup</label>

                        <input type="radio" name="type" id="projectType" value="Social Event" />
                        <label htmlFor="projectType">Social Event</label>


                        <label htmlFor="projectDetailedtDescription">Detailed Description</label>
                        <textarea name="description" id="projectDetailedtDescription" cols="30" rows="10" required />

                        <label htmlFor="links">Supporting links <span>(Optional)</span> </label>
                        <input type="url" name="socialLink" id="links" />

                        <label htmlFor="banner">Project Image / Banner</label>
                        <input type="file" name="banner" id="banner" accept="image/png, image/jpg" required />

                        <button type="submit">Create Project</button>

                    </form>
                </div>
            </div>
        </div>
    )
}