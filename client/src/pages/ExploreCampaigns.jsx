import { useNavigate } from "react-router"
import { campaignsData } from "../data/campaignsData"

export default function ExploreCampaigns() {

    const navigate = useNavigate();

    // route se match karna hai (defined in App.jsx)
    function handleNavigation(campaignId) {
        navigate(`/campaigns/${campaignId}`);
    }

    return (
        <>
            {campaignsData.map((campaign) => 
                (
                    <div 
                        key={campaign.id} 
                        onClick={handleNavigation(campaign.id)} 
                        className="flex flex-col border-2 m-5 bg-blue-50 text-cyan-600"
                    >
                        <div className="flex flex-col border-2 font-normal text-cyan-700">
                            <p>{campaign.campaignName}</p>
                            <p>{campaign.creator}</p>
                        </div>

                        <div className="flex flex-col border-2 font-normal text-cyan-700">
                            <p>{campaign.description}</p>
                            <p>{campaign.category}</p>
                        </div>

                        <div className="flex flex-col border-2 font-normal text-cyan-700">
                            <span>${campaign.raisedAmount} - {campaign.goalAmount}</span>
                            <p>{campaign.daysLeft}</p>
                        </div>

                    </div>
                ))}
        </>
    )
}

// react hooks won't work inside nested brackets they need top level of place 
// eg - useState isn't inside {} - can be used

// Hooks - must be top level && not inside {} like loops, if-else, fnx
// therefore, define them in root level.