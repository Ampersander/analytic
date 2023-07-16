/**
 =========================================================
* Analytics KPI React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from 'react'
import Grid from '@mui/material/Grid'

import MDBox from 'components/MDBox'

import Footer from 'examples/Footer'
// Analytics KPI React example components
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import ReportsBarChart from 'examples/Charts/BarCharts/ReportsBarChart'
import ReportsLineChart from 'examples/Charts/LineCharts/ReportsLineChart'
import ComplexStatisticsCard from 'examples/Cards/StatisticsCards/ComplexStatisticsCard'

// Data
import reportsBarChartData from 'layouts/dashboard/data/reportsBarChartData'
import reportsLineChartData from 'layouts/dashboard/data/reportsLineChartData'

// Service
import TagService from 'services/tag.service'
import ErrorService from 'services/error.service'
import EventService from 'services/event.service'
import TunnelService from 'services/tunnel.service'
import VisitorService from 'services/visitor.service'

class Dashboard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			nbTags: 0,
			nbErrors: 0,
			nbEvents: 0,
			nbTunnels: 0,
			nbVisitors: 0
		}
	}

	componentDidMount() {
		this.getNbTags()
		// this.getNbErrors()
		// this.getNbEvents()
		this.getNbTunnels()
		// this.getNbVisitors()
	}

	getNbTags() {
		TagService.getAll().then(res => {
			this.setState({ nbTags: res.length })
		}).catch(e => console.log(e))
	}

	getNbTunnels() {
		TunnelService.getAll().then(res => {
			this.setState({ nbTunnels: res.length })
		}).catch(e => console.log(e))
	}

	getNbErrors() {
		ErrorService.getErrors().then(res => {
			this.setState({ nbErrors: res.length })
		}).catch(e => console.log(e))
	}

	getNbVisitors() {
		VisitorService.getVisitors().then(res => {
			this.setState({ nbVisitors: res.length })
		}).catch(e => console.log(e))
	}

	getNbEvents() {
		EventService.getEvents().then(res => {
			this.setState({ nbEvents: res.length })
		}).catch(e => console.log(e))
	}

	render() {
		const { sales, tasks } = reportsLineChartData;
		return (
			<DashboardLayout>
				<DashboardNavbar />

				<MDBox py={3}>
					<Grid container spacing={3} alignItems="center">
						<Grid item xs={12} md={4} lg={2}>
							<MDBox mb={1.5}>
								<ComplexStatisticsCard icon="tag" title="Tags" count={this.state.nbTags}
									// percentage={{ color: "success", amount: "+3%", label: "than last month" }}
								/>
							</MDBox>
						</Grid>

						<Grid item xs={12} md={4} lg={2}>
							<MDBox mb={1.5}>
								<ComplexStatisticsCard color="warning" icon="route" title="Tunnels de conversion" count={this.state.nbTunnels} />
							</MDBox>
						</Grid>

						<Grid item xs={12} md={4} lg={2}>
							<MDBox mb={1.5}>
								<ComplexStatisticsCard color="success" icon="event" title="Événements" count={this.state.nbEvents} />
							</MDBox>
						</Grid>

						<Grid item xs={12} md={4} lg={2}>
							<MDBox mb={1.5}>
								<ComplexStatisticsCard color="error" icon="error" title="Erreurs" count={this.state.nbErrors} />
							</MDBox>
						</Grid>

						<Grid item xs={12} md={4} lg={2}>
							<MDBox mb={1.5}>
								<ComplexStatisticsCard color="primary" icon="person_add" title="Visiteurs" count={this.state.nbVisitors} />
							</MDBox>
						</Grid>
					</Grid>

					<MDBox mt={4.5}>
						<Grid container spacing={3}>
							<Grid item xs={12} md={6} lg={4}>
								<MDBox mb={3}>
									<ReportsBarChart
										color="info"
										title="Vues du site"
										date="Données à jour"
										chart={reportsBarChartData}
									/>
								</MDBox>
							</Grid>

							<Grid item xs={12} md={6} lg={4}>
								<MDBox mb={3}>
									<ReportsLineChart
										color="success"
										title="KPI Event Analytics "
										// description={<>(<b>+15%</b>) increase in today sales.</>}
										date="Données à jour"
										chart={sales}
									/>
								</MDBox>
							</Grid>

							<Grid item xs={12} md={6} lg={4}>
								<MDBox mb={3}>
									<ReportsLineChart
										color="dark"
										title="Nouveaux Visiteurs"
										date="Données à jour"
										chart={tasks}
									/>
								</MDBox>
							</Grid>
						</Grid>
					</MDBox>
				</MDBox>

				{/* <Footer /> */}
			</DashboardLayout>
		)
	}
}

export default Dashboard