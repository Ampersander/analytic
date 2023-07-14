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

// @mui material components
import Grid from "@mui/material/Grid";

// Analytics KPI React components
import MDBox from "components/MDBox";

// Analytics KPI React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Service 
import ErrorService from "services/error.service";
import VisitorService from "services/visitor.service";
import EventService from "services/event.service";

import React from "react";

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nbErrors: 0,
      nbVisitors: 0,
      nbEvents: 0,
    };
  }

  componentDidMount() {
    this.getNbErrors();
    this.getNbVisitors();
    this.getNbEvents();
  }

  getNbErrors() {
    ErrorService.getErrors().then(
      response => {

        //count the numbers of errors in data.errors
        var errors = response.data.errors;
        var count = 0;
        for (var i = 0; i < errors.length; i++) {
          count++;
        }

        this.setState({
          nbErrors: count
        });

        console.log(response.data);
      }
    ).catch(
      error => {
        console.log(error);
      }
    )
  }

  getNbVisitors() {
    VisitorService.getVisitors().then(
      response => {

        //count the numbers of visitors in data.visitors
        var visitors = response.data.visitors;
        var count = 0;
        for (var i = 0; i < visitors.length; i++) {
          count++;
        }

        this.setState({
          nbVisitors: count
        });

        console.log(response.data);
      }
    ).catch(
      error => {
        console.log(error);
      }
    )

  }

  getNbEvents() {
    EventService.getEvents().then(
      response => {

        //count the numbers of events in data.events
        var events = response.data.events;
        var count = 0;
        for (var i = 0; i < events.length; i++) {
          count++;
        }

        this.setState({
          nbEvents: count
        });

        console.log(response.data);

      }
    ).catch(
      error => {
        console.log(error);
      }
    )
  }





  render() {
    const { sales, tasks } = reportsLineChartData;
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="event"
                  title="Event"
                  count={this.state.nbEvents}
                  percentage={{
                    color: "success",
                    amount: "+3%",
                    label: "than last month",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="error"
                  icon="error"
                  title="Error"
                  count={this.state.nbErrors}
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "Just updated",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="person_add"
                  title="Visitors"
                  count={this.state.nbVisitors}
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "Just updated",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
          <MDBox mt={4.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsBarChart
                    color="info"
                    title="website views"
                    date="just updated"
                    chart={reportsBarChartData}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="success"
                    title="KPI Event Analytics "
                    description={
                      <>
                        (<strong>+15%</strong>) increase in today sales.
                      </>
                    }
                    date="updated 4 min ago"
                    chart={sales}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="dark"
                    title="new visitors"
                    date="just updated"
                    chart={tasks}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
        <Footer />
      </DashboardLayout>
    )
  }
}

export default Dashboard;
