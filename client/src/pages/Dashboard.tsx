import DashboardBody from "../components/DashboardBody"
import DashboardHeader from "../components/DashboardHeader"
import PageContainer from "../components/PageContainer"


const Dashboard = () => {
    return (
		<PageContainer>
			<DashboardHeader />
			<DashboardBody />
		</PageContainer>
    )
}

export default Dashboard